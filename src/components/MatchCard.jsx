import { Clock, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

const MatchCard = ({ match, onPredictClick, userPrediction }) => {
  return (
    <div className="glass-card rounded-xl p-4 md:p-6 mb-4 w-full relative overflow-hidden transition-all hover:border-[var(--color-primary)]/30">
      <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="bg-[var(--color-surface)] px-2 py-1 rounded text-gray-300 font-medium">
            {match.round}
          </span>
        </div>
        <StatusBadge status={match.status} />
      </div>

      <div className="flex justify-between items-center my-6">
        <div className="flex flex-col items-center flex-1">
          <span className="text-4xl mb-2">{match.homeFlag}</span>
          <span className="font-bold text-center">{match.homeTeam}</span>
        </div>
        
        <div className="flex flex-col items-center flex-1 px-2">
          {match.status === 'Finished' ? (
            <div className="text-3xl font-bold bg-gray-800 px-4 py-2 rounded-lg text-white">
              {match.actualHomeScore} - {match.actualAwayScore}
            </div>
          ) : (
            <div className="text-lg font-bold text-gray-500">VS</div>
          )}
        </div>

        <div className="flex flex-col items-center flex-1">
          <span className="text-4xl mb-2">{match.awayFlag}</span>
          <span className="font-bold text-center">{match.awayTeam}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 bg-[var(--color-surface)]/50 p-3 rounded-lg">
        <div className="flex flex-col gap-1 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> <span>{match.matchDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> <span>{match.matchTime}</span>
          </div>
        </div>

        <div>
          {match.status === 'Open' ? (
            <button 
              onClick={() => onPredictClick(match)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-bold py-2 px-6 rounded-lg transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              {userPrediction ? 'Edit' : 'Predict'}
            </button>
          ) : (
             userPrediction && (
               <div className="text-right">
                  <div className="text-xs text-gray-500">Your Prediction</div>
                  <div className="font-bold text-[var(--color-primary)] text-lg">
                    {userPrediction.homeScore} - {userPrediction.awayScore}
                  </div>
               </div>
             )
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
