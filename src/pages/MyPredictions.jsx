import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';

const MyPredictions = () => {
  const { predictions, matches, currentUser } = useContext(AppContext);
  
  const myPredictions = predictions.filter(p => p.userId === currentUser.id);

  if (myPredictions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">No Predictions Yet</h2>
        <p className="text-gray-400">Head over to the Matches page to start predicting!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">My Predictions</h1>
        <p className="text-gray-400">Track the results and scores of your predictions.</p>
      </div>

      <div className="space-y-4">
        {myPredictions.map(pred => {
          const match = matches.find(m => m.id === pred.matchId);
          if (!match) return null;

          return (
            <div key={pred.id} className="glass-card rounded-xl p-4 md:p-6 w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-400">{match.matchDate}</span>
                  <span className={clsx(
                    "text-xs px-2 py-0.5 rounded border font-medium",
                    pred.status === 'Correct Score' ? "bg-green-900/30 text-green-400 border-green-800/50" :
                    pred.status === 'Correct Winner' ? "bg-yellow-900/30 text-yellow-400 border-yellow-800/50" :
                    pred.status === 'Wrong' ? "bg-red-900/30 text-red-400 border-red-800/50" :
                    "bg-gray-800 text-gray-400 border-gray-600"
                  )}>
                    {pred.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="font-bold">{match.homeTeam}</span>
                    <span className="text-2xl">{match.homeFlag}</span>
                  </div>
                  <div className="text-xl font-bold text-[var(--color-primary)]">
                    {pred.homeScore} - {pred.awayScore}
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-start">
                    <span className="text-2xl">{match.awayFlag}</span>
                    <span className="font-bold">{match.awayTeam}</span>
                  </div>
                </div>
                
                {match.status === 'Finished' && (
                  <div className="text-center mt-2 text-sm text-gray-500">
                    Actual Result: {match.actualHomeScore} - {match.actualAwayScore}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-[var(--color-surface)] rounded-lg min-w-[100px]">
                <span className="text-gray-400 text-sm mb-1">Points</span>
                <span className="text-3xl font-bold text-[var(--color-primary)]">
                  {pred.scoreEarned !== null ? pred.scoreEarned : '-'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPredictions;
