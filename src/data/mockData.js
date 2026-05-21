export const mockMatches = [
  {
    id: 1,
    homeTeam: "Argentina",
    awayTeam: "France",
    homeFlag: "🇦🇷",
    awayFlag: "🇫🇷",
    matchDate: "2026-06-16",
    matchTime: "22:00",
    round: "Final",
    status: "Open", // Open, Locked, Finished
    actualHomeScore: null,
    actualAwayScore: null,
    displayOrder: 1
  },
  {
    id: 2,
    homeTeam: "Brazil",
    awayTeam: "Germany",
    homeFlag: "🇧🇷",
    awayFlag: "🇩🇪",
    matchDate: "2026-06-15",
    matchTime: "20:00",
    round: "Semi Final",
    status: "Open",
    actualHomeScore: null,
    actualAwayScore: null,
    displayOrder: 2
  }
];

export const mockQuestions = [
  {
    id: 101,
    matchId: 1,
    questionText: "ฝั่งไหนจะชนะ?",
    tier: 1,
    point: 1,
    answerType: "Choice", // Choice, Score Input, Text
    options: ["Argentina", "France", "Draw"],
    correctAnswer: null,
    status: "Active",
    lockWhenMatchStarts: true
  },
  {
    id: 102,
    matchId: 1,
    questionText: "ทีมไหนยิงประตูก่อน?",
    tier: 2,
    point: 2,
    answerType: "Choice",
    options: ["Argentina", "France", "No Goal"],
    correctAnswer: null,
    status: "Active",
    lockWhenMatchStarts: true
  },
  {
    id: 103,
    matchId: 1,
    questionText: "ผลสกอร์เต็มเวลาคือเท่าไหร่?",
    tier: 3,
    point: 3,
    answerType: "Score Input",
    options: [],
    correctAnswer: null, // "2-1" format
    status: "Active",
    lockWhenMatchStarts: true
  }
];

export const mockUsers = [
  { id: 1, username: "Player_One", displayName: "Player One", totalScore: 0 },
  { id: 2, username: "FootballFan99", displayName: "Fan 99", totalScore: 0 },
  { id: 3, username: "GoldenBoot", displayName: "Golden Boot", totalScore: 0 },
];

export const mockUserAnswers = [];
