# SGFarm Gamification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a "Local UX + Queue" gamification architecture connecting the Android worker app to a new standalone Gamification Service and Leaderboard Web App.

**Architecture:** 
1. **Android App (Client):** A centralized `GamificationEventBus` captures user actions. A UI overlay plays immediate "loud" animations (Lottie/Compose). Events are queued locally in Room and flushed to the backend via WorkManager when online.
2. **Gamification Service (Backend):** A lightweight Node.js/Express (or similar) API with a PostgreSQL/SQLite database to receive events and aggregate user stats (streaks, bingo state).
3. **Leaderboard App (Web):** A React/Next.js dashboard that polls the Gamification Service to display real-time rankings and bingo progress.

**Tech Stack:** 
- **Android:** Kotlin, Jetpack Compose, Room, WorkManager, Kotlin Coroutines/Flow, Lottie (for animations).
- **Gamification Service:** Node.js, Express, PostgreSQL (or SQLite for simplicity), Prisma/Sequelize ORM.
- **Leaderboard App:** React (Next.js or Vite), Tailwind CSS, shadcn/ui.

---

## Part 1: Android App - Event Queue & Sync (Data Layer)

### Task 1: Create Gamification Room Entity & DAO

**Files:**
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/entities/GamificationEventEntity.kt`
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/dao/GamificationEventDao.kt`
- Modify: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/AppDatabase.kt`

- [ ] **Step 1: Create the Entity**
```kotlin
package ai.dextech.sgfarmapp.data.local.entities

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "gamification_events")
data class GamificationEventEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val eventType: String, // e.g., "FEED_LOG_SUBMITTED", "SYNC_CLEAN"
    val userId: String,
    val farmId: String,
    val timestamp: Long,
    val payload: String?, // JSON string for extra data (e.g., quiz answer)
    val isSynced: Boolean = false
)
```

- [ ] **Step 2: Create the DAO**
```kotlin
package ai.dextech.sgfarmapp.data.local.dao

import ai.dextech.sgfarmapp.data.local.entities.GamificationEventEntity
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface GamificationEventDao {
    @Insert
    suspend fun insertEvent(event: GamificationEventEntity): Long

    @Query("SELECT * FROM gamification_events WHERE isSynced = 0 ORDER BY timestamp ASC")
    suspend fun getUnsyncedEvents(): List<GamificationEventEntity>

    @Query("UPDATE gamification_events SET isSynced = 1 WHERE id IN (:eventIds)")
    suspend fun markEventsAsSynced(eventIds: List<Long>)
    
    @Query("DELETE FROM gamification_events WHERE isSynced = 1 AND timestamp < :olderThan")
    suspend fun cleanupOldSyncedEvents(olderThan: Long)
}
```

- [ ] **Step 3: Add to AppDatabase**
Modify `AppDatabase.kt` to include the new entity and abstract DAO method.

- [ ] **Step 4: Commit**
```bash
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/entities/GamificationEventEntity.kt
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/dao/GamificationEventDao.kt
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/local/AppDatabase.kt
git commit -m "feat(android): add gamification event room entity and dao"
```

### Task 2: Create Gamification Sync Worker

**Files:**
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/remote/api/GamificationApiService.kt`
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/sync/GamificationSyncWorker.kt`

- [ ] **Step 1: Create API Service interface**
```kotlin
package ai.dextech.sgfarmapp.data.remote.api

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

data class GamificationEventPayload(
    val eventType: String,
    val userId: String,
    val farmId: String,
    val timestamp: Long,
    val payload: String?
)

data class SyncEventsRequest(val events: List<GamificationEventPayload>)

interface GamificationApiService {
    @POST("/api/events/batch")
    suspend fun syncEvents(@Body request: SyncEventsRequest): Response<Unit>
}
```

- [ ] **Step 2: Create WorkManager Worker**
```kotlin
package ai.dextech.sgfarmapp.data.sync

import ai.dextech.sgfarmapp.data.local.dao.GamificationEventDao
import ai.dextech.sgfarmapp.data.remote.api.GamificationApiService
import ai.dextech.sgfarmapp.data.remote.api.GamificationEventPayload
import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import timber.log.Timber

@HiltWorker
class GamificationSyncWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted workerParams: WorkerParameters,
    private val eventDao: GamificationEventDao,
    private val apiService: GamificationApiService // Requires DI setup
) : CoroutineWorker(context, workerParams) {

    override suspend fun doWork(): Result {
        return try {
            val unsynced = eventDao.getUnsyncedEvents()
            if (unsynced.isEmpty()) return Result.success()

            val payloads = unsynced.map {
                GamificationEventPayload(it.eventType, it.userId, it.farmId, it.timestamp, it.payload)
            }
            
            val response = apiService.syncEvents(SyncEventsRequest(payloads))
            if (response.isSuccessful) {
                eventDao.markEventsAsSynced(unsynced.map { it.id })
                Result.success()
            } else {
                Result.retry()
            }
        } catch (e: Exception) {
            Timber.e(e, "Gamification sync failed")
            Result.retry()
        }
    }
}
```

- [ ] **Step 3: Commit**
```bash
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/remote/api/GamificationApiService.kt
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/data/sync/GamificationSyncWorker.kt
git commit -m "feat(android): add gamification sync worker"
```

---

## Part 2: Android App - Event Bus & UI Overlay

### Task 3: Create Gamification Event Bus

**Files:**
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationEventBus.kt`

- [ ] **Step 1: Create the Event Bus**
```kotlin
package ai.dextech.sgfarmapp.features.gamification

import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import javax.inject.Inject
import javax.inject.Singleton

sealed class GamificationAction {
    data class LogSubmitted(val type: String) : GamificationAction()
    object SyncCompleted : GamificationAction()
    data class QuizAnswered(val correct: Boolean) : GamificationAction()
}

@Singleton
class GamificationEventBus @Inject constructor() {
    private val _events = MutableSharedFlow<GamificationAction>(extraBufferCapacity = 10)
    val events = _events.asSharedFlow()

    suspend fun emit(action: GamificationAction) {
        _events.emit(action)
    }
}
```

- [ ] **Step 2: Commit**
```bash
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationEventBus.kt
git commit -m "feat(android): add gamification event bus"
```

### Task 4: Create Gamification ViewModel

**Files:**
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationViewModel.kt`

- [ ] **Step 1: Create the ViewModel**
```kotlin
package ai.dextech.sgfarmapp.features.gamification

import ai.dextech.sgfarmapp.data.local.dao.GamificationEventDao
import ai.dextech.sgfarmapp.data.local.entities.GamificationEventEntity
import ai.dextech.sgfarmapp.data.preferences.FarmPreferencesManager
import ai.dextech.sgfarmapp.data.repositories.AuthRepository
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

sealed class GamificationEffect {
    data class ShowConfetti(val message: String) : GamificationEffect()
    data class ShowBadge(val title: String, val subtitle: String) : GamificationEffect()
}

@HiltViewModel
class GamificationViewModel @Inject constructor(
    private val eventBus: GamificationEventBus,
    private val eventDao: GamificationEventDao,
    private val farmPrefs: FarmPreferencesManager,
    private val authRepo: AuthRepository
) : ViewModel() {

    private val _effects = MutableSharedFlow<GamificationEffect>()
    val effects = _effects.asSharedFlow()

    init {
        viewModelScope.launch {
            eventBus.events.collect { action ->
                handleAction(action)
            }
        }
    }

    private suspend fun handleAction(action: GamificationAction) {
        val farmId = farmPrefs.getSelectedFarmId() ?: return
        val userId = authRepo.getUserId() ?: "unknown"
        
        when (action) {
            is GamificationAction.LogSubmitted -> {
                saveEvent("LOG_SUBMITTED_${action.type.uppercase()}", userId, farmId)
                // Basic logic: emit effect (More complex logic requires querying DAOs for counts)
                _effects.emit(GamificationEffect.ShowConfetti("Log Recorded!"))
            }
            is GamificationAction.SyncCompleted -> {
                saveEvent("SYNC_CLEAN", userId, farmId)
                _effects.emit(GamificationEffect.ShowBadge("Sync Clean!", "All records synced"))
            }
            is GamificationAction.QuizAnswered -> {
                saveEvent("QUIZ_ANSWERED", userId, farmId, "{\"correct\": ${action.correct}}")
                if(action.correct) _effects.emit(GamificationEffect.ShowConfetti("Correct!"))
            }
        }
        // TODO: Enqueue WorkManager sync task here
    }

    private suspend fun saveEvent(type: String, userId: String, farmId: String, payload: String? = null) {
        eventDao.insertEvent(
            GamificationEventEntity(
                eventType = type,
                userId = userId,
                farmId = farmId,
                timestamp = System.currentTimeMillis(),
                payload = payload
            )
        )
    }
}
```

- [ ] **Step 2: Commit**
```bash
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationViewModel.kt
git commit -m "feat(android): add gamification viewmodel"
```

### Task 5: Create Gamification Overlay UI

**Files:**
- Create: `apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationOverlay.kt`

- [ ] **Step 1: Add Lottie Dependency**
Add `implementation("com.airbnb.android:lottie-compose:6.4.0")` to `apps/mobile-android/app/build.gradle.kts`.

- [ ] **Step 2: Create Overlay Composable**
```kotlin
package ai.dextech.sgfarmapp.features.gamification

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Snackbar
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import kotlinx.coroutines.delay

@Composable
fun GamificationOverlay(
    viewModel: GamificationViewModel,
    content: @Composable () -> Unit
) {
    var currentEffect by remember { mutableStateOf<GamificationEffect?>(null) }

    LaunchedEffect(Unit) {
        viewModel.effects.collect { effect ->
            currentEffect = effect
            delay(3000) // Show for 3 seconds
            currentEffect = null
        }
    }

    Box(modifier = Modifier.fillMaxSize()) {
        content() // The main app content (NavHost)

        // Overlay UI
        currentEffect?.let { effect ->
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.TopCenter
            ) {
                when (effect) {
                    is GamificationEffect.ShowConfetti -> {
                        // TODO: Implement Lottie Confetti
                        Snackbar { Text(effect.message) }
                    }
                    is GamificationEffect.ShowBadge -> {
                         // TODO: Implement Lottie Badge
                         Snackbar { Text("${effect.title}: ${effect.subtitle}") }
                    }
                }
            }
        }
    }
}
```

- [ ] **Step 3: Commit**
```bash
git add apps/mobile-android/app/src/main/java/ai/dextech/sgfarmapp/features/gamification/GamificationOverlay.kt
git commit -m "feat(android): add gamification ui overlay"
```

---

## Part 3: Gamification Backend Service (Node.js/Express)

*Note: Create a new directory `apps/gamification-service`*

### Task 6: Setup Express API & DB

**Files:**
- Create: `apps/gamification-service/package.json`
- Create: `apps/gamification-service/index.js`

- [ ] **Step 1: Init Project**
```bash
mkdir -p apps/gamification-service
cd apps/gamification-service
pnpm init
pnpm add express cors body-parser pg
```

- [ ] **Step 2: Create Server**
```javascript
// apps/gamification-service/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for MVP (replace with Postgres later)
const events = [];

app.post('/api/events/batch', (req, res) => {
    const { events: newEvents } = req.body;
    if (!newEvents || !Array.isArray(newEvents)) {
        return res.status(400).json({ error: 'Invalid payload' });
    }
    
    events.push(...newEvents);
    console.log(`Received ${newEvents.length} events. Total: ${events.length}`);
    
    res.status(200).json({ success: true });
});

app.get('/api/leaderboard/:farmId', (req, res) => {
    const { farmId } = req.params;
    // MVP Aggregation logic: count logs per user for today
    const today = new Date().setHours(0,0,0,0);
    
    const stats = events
        .filter(e => e.farmId === farmId && e.timestamp >= today && e.eventType.startsWith('LOG_SUBMITTED'))
        .reduce((acc, e) => {
            acc[e.userId] = (acc[e.userId] || 0) + 1;
            return acc;
        }, {});
        
    const leaderboard = Object.entries(stats)
        .map(([userId, count]) => ({ userId, todayLogCount: count }))
        .sort((a, b) => b.todayLogCount - a.todayLogCount);
        
    res.json({ leaderboard });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Gamification Service running on port ${PORT}`);
});
```

- [ ] **Step 3: Commit**
```bash
git add apps/gamification-service/
git commit -m "feat(backend): initial gamification express service"
```

---

## Part 4: Leaderboard Web App (React)

*Note: Create a new directory `apps/leaderboard-app`*

### Task 7: Setup React Dashboard

**Files:**
- Create: `apps/leaderboard-app/src/App.jsx`

- [ ] **Step 1: Init Project**
(Assume Vite React setup)

- [ ] **Step 2: Create Dashboard UI**
```jsx
// apps/leaderboard-app/src/App.jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const farmId = "default-farm-id"; // Hardcoded for MVP

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/leaderboard/${farmId}`);
        const data = await res.json();
        setLeaderboard(data.leaderboard);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-black text-cyan-400 mb-8">Farm Leaderboard</h1>
      
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Today's Top Loggers</h2>
        {leaderboard.length === 0 ? (
          <p className="text-slate-400">No activity yet today.</p>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div key={user.userId} className="flex items-center justify-between bg-slate-700 p-4 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">User: {user.userId.substring(0,8)}...</span>
                </div>
                <div className="text-xl font-black text-emerald-400">
                  {user.todayLogCount} Logs
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add apps/leaderboard-app/
git commit -m "feat(web): initial leaderboard react app"
```