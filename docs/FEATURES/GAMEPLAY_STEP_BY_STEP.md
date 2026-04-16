# SGFarm Gamification: Gameplay Step-by-Step
> **WARNING: FOR INTERNAL BOOTH PLANNING ONLY**
> This document outlines the booth play flow for visitors at World Aquaculture Singapore 2026. It is NOT a product specification for the SGFarmApp.

This document outlines the exact step-by-step user journey for each of the 4 gamification mechanics integrated into the Android Worker App.

---

## 1. Daily Log Quest (The Streak Ladder)

**Objective:** Build a daily habit of logging operational data.

**Gameplay Flow:**
1.  **Start State:** Worker opens the app. The Home Screen shows a chunky progress bar: "Today's Streak: 0/3 Logs".
2.  **Action:** Worker selects "Feed Fish" and completes the normal feeding workflow.
3.  **Trigger:** Upon hitting "Submit" on the feed log, the app returns to the Home Screen.
4.  **Reward (Loud):** 
    *   The progress bar fills to "1/3".
    *   A full-screen overlay instantly appears: A large, bouncy gold star scales up (`ease-out`), accompanied by the text "First Log of the Day!".
    *   The overlay fades out after 3 seconds, returning the user to the Home screen.
5.  **Continuation:** If the worker completes 2 more logs of *any* type, the bar hits 3/3, triggering an even larger "Streak Master!" confetti animation.

---

## 2. Ops Bingo

**Objective:** Encourage horizontal adoption of all app features, preventing workers from only logging feed while ignoring mortality or sampling.

**Gameplay Flow:**
1.  **Start State:** Worker opens the "Ops Bingo" bottom sheet from the Home Screen. They see a 2x3 grid of greyed-out tiles (Feed, Grade, Sample, Dead Fish, Harvest, Withdraw).
2.  **Action:** Worker notices "Dead Fish" is unlit. They go to the pen, find a mortality, and log it via the "Dead Fish" button.
3.  **Trigger:** Upon submitting the mortality log, they return to the Home Screen.
4.  **Reward (Tactile):**
    *   The "Dead Fish" tile on the Bingo board illuminates with a bright color (e.g., Teal).
    *   If that tile completes a row of 3, a "Line Completed!" toast pops up.
5.  **Grand Prize:** If the worker lights up all 6 tiles in a single day, the overlay triggers a massive, screen-filling confetti drop (respecting `prefers-reduced-motion` settings).

---

## 3. Sync Clean Badge

**Objective:** Train workers operating in offline/low-connectivity areas to proactively sync their data when they return to Wi-Fi.

**Gameplay Flow:**
1.  **Start State:** Worker has been logging offline all morning. The Home Screen shows "Pending Records: 12" and "Last Sync: 4 hours ago".
2.  **Action:** Worker returns to the farm office (with Wi-Fi) and performs a pull-to-refresh gesture on the Home Screen.
3.  **Trigger:** The `CacheSyncManager` successfully pushes all 12 records to the backend. The pending count drops to 0.
4.  **Reward (Audio/Visual):**
    *   A subtle, satisfying "pop" sound plays (5-15ms duration).
    *   The background dims slightly, and a bright "Sync Clean!" badge animates into the center of the screen.
    *   The Home Screen updates to read "Pending Records: 0" and "Last Sync: Just now".

---

## 4. Sampling Micro-Quiz

**Objective:** Reinforce biological understanding (like FCR/SGR expectations) contextually at the exact moment data is entered.

**Gameplay Flow:**
1.  **Start State:** Worker is performing a Sampling workflow (weighing and measuring fish).
2.  **Action:** Worker enters the data (e.g., Average Weight = 500g, Feed Type = Grower) and taps "Submit" on Step 3 (`ReviewSubmitStep`).
3.  **Trigger:** Instead of immediately showing the green success checkmark, the app intercepts the flow (happens randomly ~20% of the time).
4.  **The Quiz:** A high-contrast card slides up from the bottom:
    *   *"Quiz: Your fish average 500g today. Based on the 'Grower' feed type you selected, is this on track for a 30-day harvest?"*
    *   Buttons: [Yes] / [No, needs more time]
5.  **Reward:** 
    *   If they tap the correct answer, a mini-celebration animation plays right on the card, and then transitions smoothly to the final green success screen.
    *   If incorrect, a gentle "Actually, they need about 45 more days!" hint appears before proceeding.