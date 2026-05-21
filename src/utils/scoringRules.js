// Scoring Rule:
// 3 points = Correct exact score
// 1 point = Correct match outcome (win/lose/draw) but wrong exact score
// 0 point = Wrong outcome

export const calculatePredictionScore = (prediction, match) => {
  if (match.status !== 'Finished' || match.actualHomeScore === null || match.actualAwayScore === null) {
    return null; // No score yet
  }

  const pHome = parseInt(prediction.homeScore, 10);
  const pAway = parseInt(prediction.awayScore, 10);
  const aHome = match.actualHomeScore;
  const aAway = match.actualAwayScore;

  // Exact match
  if (pHome === aHome && pAway === aAway) {
    return 3;
  }

  // Outcome match
  const pDiff = pHome - pAway;
  const aDiff = aHome - aAway;

  const pOutcome = pDiff > 0 ? 'HOME_WIN' : pDiff < 0 ? 'AWAY_WIN' : 'DRAW';
  const aOutcome = aDiff > 0 ? 'HOME_WIN' : aDiff < 0 ? 'AWAY_WIN' : 'DRAW';

  if (pOutcome === aOutcome) {
    return 1;
  }

  return 0;
};
