import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Trophy, Medal } from 'lucide-react';

const Leaderboard = () => {
  const { users, userAnswers } = useContext(AppContext);

  // Calculate actual predictions count
  const sortedUsers = [...users].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="pb-24">
      <div className="mb-6 text-center">
        <Trophy size={48} className="mx-auto text-[var(--color-primary)] mb-4" />
        <h1 className="text-3xl font-black mb-2">Klasemen</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Global Rankings</p>
      </div>

      <div className="glass-panel rounded-[32px] overflow-hidden">
        <div className="grid grid-cols-12 gap-2 bg-black/40 p-4 border-b border-white/5 text-xs font-bold text-gray-400">
          <div className="col-span-2 text-center">Pos</div>
          <div className="col-span-6">Player</div>
          <div className="col-span-4 text-right">Points</div>
        </div>

        <div className="divide-y divide-white/5">
          {sortedUsers.map((user, index) => {
            const isTop3 = index < 3;
            const answersCount = userAnswers.filter(a => a.userId === user.id).length;
            const correctCount = userAnswers.filter(a => a.userId === user.id && a.isCorrect).length;

            return (
              <div key={user.id} className={`grid grid-cols-12 gap-2 p-4 items-center transition-colors hover:bg-white/5 ${user.id === 1 ? 'bg-[var(--color-primary)]/10' : ''}`}>
                <div className="col-span-2 flex justify-center">
                  {index === 0 ? <Medal className="text-yellow-400" size={24} /> :
                   index === 1 ? <Medal className="text-gray-400" size={24} /> :
                   index === 2 ? <Medal className="text-amber-600" size={24} /> :
                   <span className="font-bold text-gray-500">{index + 1}</span>}
                </div>
                
                <div className="col-span-6 flex flex-col">
                  <span className="font-bold text-sm text-white">{user.username}</span>
                  <span className="text-[10px] text-gray-500">{answersCount} Answers ({correctCount} Correct)</span>
                </div>
                
                <div className="col-span-4 text-right">
                  <span className={`font-black text-lg ${isTop3 ? 'text-[var(--color-primary)]' : 'text-white'}`}>
                    {user.totalScore}
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
