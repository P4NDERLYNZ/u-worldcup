import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { CalendarDays, Play, Eye, Lock } from 'lucide-react';

const Matches = () => {
  const { matches, questions } = useContext(AppContext);

  return (
    <div className="space-y-6 pb-28">
      <div className="pt-6">
        <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest">U-WorldCup Schedule</span>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase mt-0.5">
          Match <span className="bronze-gradient-text">Fixtures</span>
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] font-semibold mt-1">Select any open match to cast your predictions.</p>
      </div>

      <div className="space-y-4">
        {matches.filter(m => questions.some(q => q.matchId === m.id)).map(match => {
          const matchQuestions = questions.filter(q => q.matchId === match.id);
          const totalPoints = matchQuestions.reduce((sum, q) => sum + q.point, 0);

          // Check if prediction is open based on predictionOpenDate and predictionOpenTime
          const now = new Date();
          let notOpenYet = false;
          if (match.predictionOpenDate) {
            const openTimeStr = match.predictionOpenTime || '00:00';
            const openDateTime = new Date(`${match.predictionOpenDate}T${openTimeStr}`);
            if (now < openDateTime) {
              notOpenYet = true;
            }
          }

          const isOpen = match.status === 'Open' && !notOpenYet;
          const isLocked = match.status === 'Locked';

          return (
            <div 
              key={match.id} 
              className="bg-[var(--color-card)]/80 rounded-[28px] p-5 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[10px] font-black text-[var(--color-text-muted)] bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
                  {match.round}
                </span>
                
                {notOpenYet ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[9px] font-black uppercase tracking-wider border border-yellow-500/20 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    Opens {match.predictionOpenDate}
                  </span>
                ) : isOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[9px] font-black uppercase tracking-wider border border-[var(--color-primary)]/20 shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                    Open
                  </span>
                ) : isLocked ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-wider border border-red-500/20 shadow-sm">
                    <Lock size={8} />
                    Locked
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-gray-500 text-[9px] font-black uppercase tracking-wider border border-white/10 shadow-sm">
                    Finished
                  </span>
                )}
              </div>

              {/* Main Teams Match info */}
              <div className="flex justify-between items-center py-2">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-3xl mb-1.5 filter drop-shadow">{match.homeFlag}</div>
                  <span className="font-extrabold text-sm text-center text-white">{match.homeTeam}</span>
                </div>
                
                <div className="flex flex-col items-center flex-1 px-2 text-center">
                  <span className="text-[9px] font-black text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full mb-1 tracking-wider uppercase">
                    {match.matchDate}
                  </span>
                  <span className="text-xl font-black text-white">{match.matchTime}</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="text-3xl mb-1.5 filter drop-shadow">{match.awayFlag}</div>
                  <span className="font-extrabold text-sm text-center text-white">{match.awayTeam}</span>
                </div>
              </div>

              {/* Match Card Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <div className="text-[10px] text-[var(--color-text-muted)] font-semibold">
                  <span className="font-extrabold text-white">{matchQuestions.length}</span> questions • Max <span className="font-extrabold text-[var(--color-primary)]">{totalPoints} PTS</span>
                </div>
                
                {isOpen ? (
                  <Link 
                    to={`/predict/${match.id}`}
                    className="inline-flex items-center gap-1.5 btn-bronze text-xs px-5 py-2 rounded-full active:scale-95"
                  >
                    <span>Predict</span>
                    <Play size={10} className="fill-black stroke-[3]" />
                  </Link>
                ) : (
                  <Link 
                    to={`/predict/${match.id}`}
                    className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-black px-5 py-2 rounded-full transition-all duration-300 active:scale-95"
                  >
                    <span>View</span>
                    <Eye size={12} />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        {matches.filter(m => questions.some(q => q.matchId === m.id)).length === 0 && (
          <div className="bg-[var(--color-card)]/50 rounded-[28px] p-8 text-center border border-white/5">
            <p className="text-sm font-bold text-[var(--color-text-muted)]">ไม่มีแมตช์ที่เปิดให้ทายผลในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
