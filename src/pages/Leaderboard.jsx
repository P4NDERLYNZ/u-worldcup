import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trophy, Medal, Target } from 'lucide-react';

const Leaderboard = () => {
  const { users, userAnswers, currentUser } = useContext(AppContext);

  // Sort users by score
  const sortedUsers = [...users].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="space-y-6 pb-28">
      {/* Top Banner */}
      <div className="pt-6 text-center">
        <div className="inline-flex p-4 bronze-gradient-bg text-black rounded-3xl gold-aura mb-4">
          <Trophy size={36} className="stroke-[2.5]" />
        </div>
        <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest block">U-WorldCup Standings</span>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase mt-0.5">
          Global <span className="bronze-gradient-text">Leaderboard</span>
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] font-semibold mt-1">Top players with the most accurate predictions.</p>
      </div>

      {/* Leaderboard Table Panel */}
      <div className="bg-[var(--color-card)]/80 border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 gap-2 bg-black/40 p-4 border-b border-white/5 text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6 pl-2">Player</div>
          <div className="col-span-4 text-right pr-2">Points</div>
        </div>

        <div className="divide-y divide-white/5">
          {sortedUsers.map((user, index) => {
            const isTop3 = index < 3;
            const answersCount = userAnswers.filter(a => a.userId === user.id).length;
            const correctCount = userAnswers.filter(a => a.userId === user.id && a.isCorrect).length;
            const isSelf = user.id === currentUser?.id;

            return (
              <div 
                key={user.id} 
                className={`grid grid-cols-12 gap-2 p-4 items-center transition-all ${
                  isSelf 
                    ? 'bg-[var(--color-primary)]/10 border-l-[3px] border-l-[var(--color-primary)] pl-3.2' 
                    : 'hover:bg-white/5 pl-4'
                }`}
              >
                {/* Rank Badges */}
                <div className="col-span-2 flex justify-center">
                  {index === 0 ? <Medal className="text-yellow-400 filter drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)]" size={24} /> :
                   index === 1 ? <Medal className="text-gray-300 filter drop-shadow-[0_2px_8px_rgba(209,213,219,0.3)]" size={24} /> :
                   index === 2 ? <Medal className="text-amber-600 filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)]" size={24} /> :
                   <span className="font-black text-sm text-[var(--color-text-muted)]">{index + 1}</span>}
                </div>
                
                {/* Player details */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden border border-white/10 shrink-0">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="Avatar" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-extrabold text-sm ${isSelf ? 'text-[var(--color-primary)]' : 'text-white'}`}>
                      {user.username} {isSelf && <span className="text-[9px] text-[var(--color-text-muted)] font-black uppercase ml-1">(You)</span>}
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-semibold flex items-center gap-1">
                      <Target size={9} />
                      {answersCount} predictions • {correctCount} correct
                    </span>
                  </div>
                </div>
                
                {/* Score */}
                <div className="col-span-4 text-right pr-2">
                  <span className={`font-black text-base ${isSelf ? 'text-[var(--color-primary)]' : isTop3 ? 'text-white' : 'text-gray-300'}`}>
                    {user.totalScore} <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase">Pts</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
