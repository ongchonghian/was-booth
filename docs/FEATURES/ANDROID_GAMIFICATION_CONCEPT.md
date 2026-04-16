# Android Gamification & Mini-Games Concept
> **WARNING: FOR INTERNAL BOOTH PLANNING ONLY**
> This document describes a simulated "gamification" experience designed solely for trade show engagement at World Aquaculture Singapore 2026. It is NOT a product feature specification and these features should NOT be built into the core SGFarmApp for farm workers.


**Date**: 2026-04-16
**Target**: Android Worker App
**Goal**: Increase engagement, data quality, and log completion through "loud" (animated, popup-driven) gamification mechanics without requiring backend schema changes.

---

## 1. Core Architecture (The Gamification Overlay)

To implement loud, animated feedback without polluting existing business-logic ViewModels (like `HomeViewModel` or `ActivityLogViewModel`), we recommend a **Centralized Gamification Service**:

*   **Global Overlay**: A transparent Compose layout wrapping the `NavHost`.
*   **Event Bus**: Feature screens fire lightweight local events (e.g., `LogSubmitted(type="FEED")`, `SyncCompleted`).
*   **GamificationViewModel**: Listens to the event bus, evaluates rules against local SQLite DAOs, and triggers full-screen Lottie animations, confetti, or badge popups.

This ensures animations are never interrupted by rapid screen navigation.

---

## 2. Derived Mini-Games (Supported by Current Data)

These mini-games require **zero backend changes**. They derive their state purely from existing Room DAOs, SharedPreferences, and the `PullToRefreshSyncHelper`.

### A. Daily Log Quest (The Streak Ladder)
*   **Concept**: Convert the current static "You've completed X logs" into a multi-tier daily quest.
*   **Mechanic**: Workers hit milestones at 1, 3, and 5 logs per day.
*   **UI/UX**: 
    *   **Visual Style**: Vibrant, energetic blocks with high color contrast (Teal `#0D9488` progress with Orange `#F97316` CTAs/achievements).
    *   The Home Screen "Achievement Card" becomes a chunky, block-based progress bar.
    *   **Interaction**: Expand hit areas for the CTA using negative insets to ensure a minimum 44x44px touch target (`touch-target-size`).
    *   **Loud Reward**: Hitting a tier fires a `LogSubmitted` event. The Overlay triggers a full-screen "Milestone Reached!" popup with an energetic gold star animation (using spring physics for overshoot-and-settle `physics-spring-for-overshoot`).
    *   **Typography**: Loud, bold headers (e.g., Anton or similar bold sans-serif) for the achievement text. Use tabular numbers (`type-tabular-nums-for-data`) for the streak count so digits don't shift as they increment.
*   **Data**: Uses the exact same `todayLogCount` aggregation currently in `HomeViewModel.kt`.

### B. Ops Bingo
*   **Concept**: Encourage workers to complete all necessary daily tasks (feeding, mortality checks, etc.) rather than just spamming one type of log.
*   **Mechanic**: A 2x3 Bingo card where tiles light up when a specific log type count > 0 for the day.
    *   *Tiles*: Feed Fish, Withdraw/Return, Dead Fish, Harvest, Grade, Sample.
*   **UI/UX**:
    *   **Visual Style**: Grid of chunky, touch-friendly geometric tiles. Group related tiles spatially (`ux-proximity-grouping`).
    *   A new bottom sheet accessible from the Home Screen showing the Bingo card.
    *   **Interaction**: Use an `:active` scale transform (`physics-active-state`) of 0.95 to make tiles feel tactile when pressed.
    *   **Loud Reward**: Lighting up a row triggers a "Bingo Line!" animation with a rapid color shift. Filling the card triggers a massive confetti drop popup. **Crucial**: Check `prefers-reduced-motion` and fallback to a simple fade-in if enabled (`a11y-reduced-motion-check`).
*   **Data**: Uses the existing individual DAO counts (e.g., `feedingLogDao.getTodayLocalLogCount()`).

### C. The "Sync Clean" Badge
*   **Concept**: Gamify offline-first hygiene so workers remember to sync their data when they get network access.
*   **Mechanic**: Reward the state of having "0 Pending Records" immediately following a successful manual pull-to-refresh sync.
*   **UI/UX**:
    *   **Feedback**: Provide a subtle, short click sound (5-15ms duration) when the sync finishes successfully (`param-click-duration`), but ensure it respects volume controls (`a11y-volume-control`).
    *   **Loud Reward**: If a user pulls to refresh, and the resulting state transitions from `pending > 0` to `pending == 0`, the overlay pops an energetic, playful "Sync Clean!" badge animation. Dim the background to ensure the badge is the single focal point (`staging-dim-background`).
*   **Data**: Hooks into `CacheSyncManager` completion callbacks and queries local pending transaction tables.

### D. Sampling Micro-Quiz (Educational)
*   **Concept**: A 5-second educational moment appended to the end of a complex workflow to reinforce biological concepts.
*   **Mechanic**: After hitting "Submit" on a Sampling log, intercept the success screen 20% of the time with a quick quiz.
    *   *Example*: "Your average weight is 500g. Based on your Feed Type, is this expected?" (Yes/No)
*   **UI/UX**:
    *   **Visual Style**: High-contrast, duotone card that slides up before the final green checkmark screen. Use an `ease-out` timing function for the entrance (`easing-entrance-ease-out`).
    *   **Perceived Speed**: Ensure the quiz appears within 400ms of hitting submit so the app still feels instantly responsive (`ux-doherty-under-400ms`).
    *   Correct answers trigger a rapid, playful mini-celebration. 
*   **Data**: Purely local UI state utilizing the existing `averageWeightG` and `growthMetricDisplay` variables already present in `ReviewSubmitStep.kt`.

---

## 3. Mini-Games That Are NOT Supported (Out of Scope)

The following concepts were evaluated but rejected because they require massive structural changes (new backend tables, RBAC rules, real-time sockets, or heavy UI frameworks):

*   **Farm vs. Farm Leaderboards**: Requires cross-tenant data querying and new backend APIs.
*   **Real-time Multiplayer Challenges**: Requires WebSockets/SSE which the app does not currently use.
*   **Fish Growth Simulation Sandbox**: The app is designed for operational data entry, not biological simulation rendering.
*   **3D/AR Mini-Games**: No existing 3D engine (like Unity/Filament) is bundled in the app.

---

## 4. Implementation Next Steps

If approved, the development sequence should be:
1.  Add Lottie dependency to `app/build.gradle.kts`.
2.  Create the `GamificationEventBus` and `GamificationOverlay` wrapper.
3.  Update `strings.xml` to reframe Home Screen copy to be more quest-oriented.
4.  Implement the **Daily Log Quest** animation first as the proof-of-concept.