import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trophy, Medal } from 'lucide-react';
import clsx from 'clsx';

const Leaderboard = () => {
  const { users, currentUser } = useContext(AppContext);

  // Sort users by totalScore descending, then by predictionsCount descending
  const sortedUsers = [...users].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return b.predictionsCount - a.predictionsCount;
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Trophy size={32} className="text-[var(--color-primary)]" />
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-1">Leaderboard</h1>
          <p className="text-gray-400">See who is leading the prediction ranks!</p>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--color-surface)]/80 text-gray-400 text-sm">
              <th className="p-4 font-medium">Rank</th>
              <th className="p-4 font-medium">Username</th>
              <th className="p-4 font-medium text-center">Matches Predicted</th>
              <th className="p-4 font-medium text-right text-[var(--color-primary)]">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => {
              const isCurrentUser = user.id === currentUser.id;
              const rank = index + 1;
              
              return (
                <tr 
                  key={user.id} 
                  className={clsx(
                    "border-b border-gray-800 transition-colors hover:bg-[var(--color-surface)]/30",
                    isCurrentUser && "bg-[var(--color-primary)]/10"
                  )}
                >
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-surface)]">
                      {rank === 1 ? <Medal size={18} className="text-yellow-400" /> :
                       rank === 2 ? <Medal size={18} className="text-gray-300" /> :
                       rank === 3 ? <Medal size={18} className="text-orange-400" /> :
                       <span className="font-bold text-gray-500">{rank}</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={clsx("font-bold text-lg", isCurrentUser && "text-[var(--color-primary)]")}>
                      {user.username}
                      {isCurrentUser && <span className="ml-2 text-xs font-normal text-[var(--color-primary)] border border-[var(--color-primary)] rounded px-1 py-0.5">You</span>}
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-400">
                    {user.predictionsCount}
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">
                      {user.totalScore}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
