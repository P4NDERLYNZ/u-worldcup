# U-WorldCup

## Concept: World Cup Prediction & Question Tier Game
A premium tier-based prediction system for football tournaments. Instead of simple score predictions, users answer a series of questions per match. Each question is categorized into Tiers (1, 2, 3) representing difficulty and points rewarded.

## 🌟 Front Office Features
- **Matches (Jadwal):** View available matches, their status (Open/Locked/Finished), and max points.
- **Tier-based Prediction:** Answer questions for a match. Supports Multiple Choice and Text/Score Inputs.
- **My Answers (Tiket):** Track your prediction history and real-time point rewards.
- **Leaderboard (Klasemen):** Global ranking of players based on their total score.

## ⚙️ Back Office Features (Admin Panel)
- **Admin Dashboard:** Overview of total matches, questions, user answers, and total players.
- **Match Management:** Create, update, and manage the status of matches.
- **Question Management:** Create custom questions for each match with specific Tiers.
- **Auto-Calculation:** Set the correct answer for a question and the system instantly evaluates all user answers and updates the leaderboard.

## 🎯 Tier Scoring Rule
- **Tier 1 (Basic):** Simple questions (e.g., Match Winner). Reward: **1 Point**.
- **Tier 2 (Smart Pick):** Moderate difficulty (e.g., Team to score first). Reward: **2 Points**.
- **Tier 3 (Pro Guess):** High difficulty (e.g., Exact Full-Time Score). Reward: **3 Points**.

## 📂 Project Structure
- `/src/components`: UI components including `AdminLayout` and `CustomerLayout`
- `/src/context`: `AppContext.jsx` handling state, mock data, and auto-calculation logic
- `/src/pages/customer`: Front Office pages (`MatchPrediction`, `MyAnswers`, etc.)
- `/src/pages/admin`: Back Office pages (`AdminDashboard`, `MatchManager`, `QuestionManager`)
- `/src/data`: Mock data simulation (`mockData.js`)

## 🚀 How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## 🔮 Future Backend Integration Plan
- Replace `localStorage` with API calls to U-WorldCup Backend.
- Integrate with `www.api-football.com` for real-time fixtures, live scores, lineups, and automated match result processing.
- Authentication: External API token validation for user login.
