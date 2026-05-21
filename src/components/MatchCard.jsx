import { Trophy } from 'lucide-react';
import { FlagImage } from '../utils/flagHelper';

const MatchCard = ({ match, onPredictClick, userPrediction }) => {
  return (
    <div className="glass-panel rounded-[32px] p-6 mb-6 w-full relative overflow-hidden card-hover-effect">
      
      {/* Header section mimicking reference design */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
            <Trophy size={18} className="text-gray-300" />
          </div>
          <span className="font-bold text-sm tracking-wide text-white">
            {match.round}
          </span>
        </div>
        
        {match.status === 'Open' ? (
          <span className="gold-gradient-bg text-black text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-[0_0_10px_rgba(243,189,104,0.3)]">
            Open
          </span>
        ) : match.status === 'Locked' ? (
          <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
            Locked
          </span>
        ) : (
          <span className="bg-white/10 text-gray-300 border border-white/10 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase">
            Finished
          </span>
        )}
      </div>

      {/* Main Score Area */}
      <div className="flex justify-between items-center my-6 relative">
        <div className="flex flex-col items-center flex-1 z-10">
          <div className="w-20 h-20 rounded-full bg-[#1A1E1C] flex items-center justify-center text-5xl mb-4 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
            <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-14 h-9 sm:w-16 sm:h-11" />
          </div>
          <span className="font-extrabold text-base tracking-widest uppercase text-white">{match.homeTeam}</span>
        </div>
        
        <div className="flex flex-col items-center flex-1 px-2 z-10">
          {match.status === 'Finished' ? (
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl font-black text-white">{match.actualHomeScore}</span>
              <span className="text-gray-600 text-xl font-bold">:</span>
              <span className="text-5xl font-black text-white">{match.actualAwayScore}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] mb-2">{match.matchDate}</span>
              <div className="text-2xl font-black text-white/40">VS</div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center flex-1 z-10">
          <div className="w-20 h-20 rounded-full bg-[#1A1E1C] flex items-center justify-center text-5xl mb-4 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border border-white/5 overflow-hidden">
            <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-14 h-9 sm:w-16 sm:h-11" />
          </div>
          <span className="font-extrabold text-base tracking-widest uppercase text-white">{match.awayTeam}</span>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-white/5 gap-4">
        
        <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full border border-white/5">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gray-600 border border-black"></div>
            <div className="w-6 h-6 rounded-full bg-gray-500 border border-black"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 border border-black"></div>
          </div>
          <span className="text-xs font-bold text-gray-400 ml-2">Team is predicting</span>
        </div>

        <div className="w-full md:w-auto">
          {match.status === 'Open' ? (
            <button 
              onClick={() => onPredictClick(match)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-8 rounded-full transition-all active:scale-95"
            >
              {userPrediction ? 'Update Pick' : 'Place Prediction'}
            </button>
          ) : (
             userPrediction && (
               <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-4 bg-black/40 px-5 py-3 rounded-full border border-[var(--color-primary)]/30">
                  <div className="text-[10px] text-[var(--color-primary)] font-bold uppercase tracking-widest">Your Pick</div>
                  <div className="font-black text-white text-lg">
                    {userPrediction.homeScore} : {userPrediction.awayScore}
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
