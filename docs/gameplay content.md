1. Rewrite the four game cards so the subject is always the **visitor**, not the worker.
2. Replace “gameplay steps” with **booth play flow**.
3. Remove worker-gamification and backend-implementation language from the cards.
4. Align the four games to the visitor-facing mini-game strategy in the source concept .
5. Update the hero section so the scoreboard is about **booth participation**, not employee logging.

## Summary

Yes — the repo has drifted from **booth visitor engagement** into **in-app worker gamification**.

The strongest issue is in [`index.html`](https://github.com/ongchonghian/was-booth/blob/main/index.html): the “gameplay steps” describe a **farm worker using the app during real operations** rather than a **visitor playing a short booth activity to understand SGFarmApp**. That conflicts with the original booth concept, which is explicitly about short visitor-facing mini-games tied to learning and lead capture .

## Assumptions

* I audited the current repo content in `ongchonghian/was-booth`, primarily `index.html`.
* I used the uploaded booth strategy as the intended direction for what the copy should achieve: **attract visitors, teach one product insight fast, then convert to conversation/lead** .
* I am auditing the copy, not the visual design or code quality.

## Analysis

### Core problem

The repo currently frames the “games” as:

* worker streaks
* worker rewards
* worker sync hygiene
* worker quiz popups
* backend/UI implementation effort for gamification features

That is a **product feature ideation deck**.

But the booth strategy should frame the “games” as:

* short visitor challenges
* simple demo interactions
* facilitator-led learning moments
* booth conversion flows
* reasons to ask for a demo or follow-up

That is a **trade show engagement deck**.

### Where the copy goes wrong

| Area         | Current direction in repo                                                           | Why it is wrong                                                                                                     |
| ------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Audience     | “Worker opens the app”, “Worker selects Feed Fish”, “Worker returns to farm office” | The player at the booth is a visitor, not an employee using the app in production                                   |
| Goal         | “Gamify daily log completion”, “reward workers”, “streak ladder”                    | This is product gamification, not booth engagement                                                                  |
| Gameplay     | Real in-app workflows over time                                                     | Booth games should be playable in 1–3 minutes, often with a coach, scenario card, or demo mode                      |
| Rewards      | Confetti, streak bar, badge, overlay                                                | Those are app UX rewards for workers; booth rewards should be a score, quick insight, giveaway, QR, or demo handoff |
| Conversion   | “QR for app trial + streak challenge”                                               | The conversion should be booth-relevant: get checklist, scan for deck, book demo, choose workflow interest          |
| Hero section | “Real-Time Leaderboard App”, “Top 10 loggers”, “Gamification Service”               | This implies a worker competition system, not a visitor-facing booth activation                                     |
| Labels       | “Trainee Focus”, “Implementation Effort”, DAO/backend notes                         | Too product-internal; the audience needs “what visitors will experience” and “what they will understand”            |

### The most problematic copy

These patterns are the clearest signs of the mismatch:

* “Worker opens the app”
* “Worker selects Feed Fish”
* “Worker completes 2 more logs”
* “Worker has been logging offline all morning”
* “Worker returns to the farm office”
* “Gamify daily log completion”
* “Top 10 loggers”
* “active Bingo boards”
* “without touching the core backend”
* “querying 6 existing local DAOs”

All of those belong in a **product gamification concept note**, not a booth engagement page.

### What the gameplay steps should look like instead

Every gameplay flow should follow this pattern:

1. **Booth hook**
2. **Visitor action**
3. **What they discover about the product**
4. **Coach explanation**
5. **Lead capture or next step**

Not this pattern:

1. Worker opens app
2. Worker logs real work
3. Backend trigger fires
4. Worker gets reward
5. Worker repeats over the day

## Recommendation

### 1. Change the framing of the whole games section

Replace the current mental model from:

**“How we gamify the app for workers”**

to:

**“How visitors experience SGFarmApp through mini-games at the booth”**

### 2. Rename sections

Suggested copy changes:

| Current                   | Replace with                                         |
| ------------------------- | ---------------------------------------------------- |
| Gameplay Steps            | Booth Play Flow                                      |
| Trainee Focus             | Visitor takeaway                                     |
| Strategic Intent          | Why this works at the booth                          |
| Implementation Effort     | Booth setup effort                                   |
| Real-Time Leaderboard App | Live Booth Scoreboard                                |
| Top 10 loggers            | Top booth challengers / latest challenge completions |

### 3. Rewrite each game so the visitor is the subject

Below is the direction I would take.

---

## Revised gameplay copy

### A. Daily Log Quest → **Feed-Wise Sprint**

**Goal**
Help visitors experience how fast and structured feed logging can be across multiple cages.

**Booth Play Flow**

1. **Hook:** Staff invites the visitor to try a 90-second feeding challenge.
2. **Scenario:** Visitor receives a card: “You need to log feed for 3 cages before the timer ends.”
3. **Action:** Visitor uses the demo tablet to select the right location(s), enter feed amounts, and submit.
4. **Reveal:** Staff explains that this mirrors the real SGFarmApp feeding workflow used to reduce manual recording friction.
5. **Convert:** Visitor scans a QR code to get the feeding checklist or request a demo.

**Visitor takeaway**
“Feeding records can be captured quickly and consistently.”

---

### B. Ops Bingo → **Ops Match Board**

**Goal**
Help visitors understand the range of farm workflows SGFarmApp supports.

**Booth Play Flow**

1. **Hook:** Staff asks the visitor to complete an “operations board” in under 2 minutes.
2. **Scenario:** The visitor sees common farm events such as feeding, mortality, grading, sampling, and harvest.
3. **Action:** Visitor matches each event to the right SGFarmApp workflow tile on a magnetic board or tablet screen.
4. **Reveal:** Staff explains that SGFarmApp supports multiple day-to-day workflows in one operational app.
5. **Convert:** Visitor picks the workflow they care about most and leaves contact details for a tailored follow-up.

**Visitor takeaway**
“The app is broader than a single logging feature.”

---

### C. Sync Clean Badge → **Offline Ops Relay**

**Goal**
Show visitors that SGFarmApp can support farm work even when connectivity is patchy.

**Booth Play Flow**

1. **Hook:** Staff says, “Can you complete this task with no internet?”
2. **Scenario:** Visitor uses a demo device in airplane mode to log a simple farm event.
3. **Action:** Visitor completes the record offline, then moves to the sync station.
4. **Reveal:** Staff shows how the record syncs once connectivity returns, proving offline resilience.
5. **Convert:** Visitor scans to receive the offline logging SOP or book a product walkthrough.

**Visitor takeaway**
“The app is usable in real farm conditions, not just in ideal connectivity.”

---

### D. Sampling Micro-Quiz → **Batch Detective**

**Goal**
Help visitors understand that SGFarmApp links operational records into a traceable farm story.

**Booth Play Flow**

1. **Hook:** Staff invites the visitor to solve a “what happened to this batch?” challenge.
2. **Scenario:** Visitor sees a batch with a few events: feeding, mortality, sampling, grading, harvest.
3. **Action:** Visitor places the events in the most logical sequence or answers a short scenario question.
4. **Reveal:** Staff explains how SGFarmApp connects records across time, location, and batch.
5. **Convert:** Visitor chooses whether they want to see feeding, harvest, or traceability in the follow-up demo.

**Visitor takeaway**
“Better records create better traceability and insight.”

---

## Specific copy edits I would make in the repo

### Hero panel

Replace this direction:

* “Real-Time Leaderboard App”
* “Top 10 loggers”
* “active Bingo boards”
* “Gamification Service”

With:

* **“Live Booth Scoreboard”**
* “Today’s challenge completions”
* “Most popular workflows”
* “Top visitor scores”
* “Fastest feeding challenge times”

### Game goals

Replace phrases like:

* “Gamify daily log completion”
* “Encourage workers to explore different log types”
* “Reward workers”
* “offline-first hygiene”

With:

* “Help visitors understand daily logging speed”
* “Show visitors the range of farm workflows”
* “Demonstrate offline reliability”
* “Turn booth curiosity into product understanding”

### Gameplay steps

Every step should start with:

* **Visitor**
* **Staff**
* **Coach**
* **Scenario**
* **Demo device**

Not:

* Worker
* Home Screen
* ViewModel
* DAO
* CacheSyncManager
* ReviewSubmitStep

### Effort copy

Replace technical implementation notes like:

* “Reuses existing todayLogCount from HomeViewModel”
* “querying 6 existing local DAOs”
* “hooks directly into existing CacheSyncManager callbacks”

With booth-relevant setup notes like:

* “Needs 1 tablet + 1 facilitator”
* “Works as tabletop or tablet activity”
* “Good for peak traffic”
* “Best for deeper conversations”
* “Needs QR capture flow”

## Risks

If left as-is, the repo creates several problems:

* **Audience confusion**: stakeholders may think the recommendation is to build new gamification features into the app.
* **Execution drift**: booth staff may prepare the wrong materials.
* **Roadmap pollution**: the team may accidentally treat trade show activations as product backlog items.
* **Message dilution**: visitors will not quickly understand what they are meant to do at the booth.


