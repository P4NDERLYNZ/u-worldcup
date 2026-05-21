import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Matches = () => {
  const { matches, questions } = useContext(AppContext);

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Jadwal Pertandingan</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Select a match to predict and earn points!</p>
      </div>

      <div className="space-y-4">
        {matches.map(match => {
          const matchQuestions = questions.filter(q => q.matchId === match.id);
          const totalPoints = matchQuestions.reduce((sum, q) => sum + q.point, 0);

          return (
            <div key={match.id} className="glass-panel rounded-2xl p-4 card-hover-effect">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded">
                  {match.round}
                </span>
                {match.status === 'Open' ? (
                  <span className="text-xs font-bold text-[var(--color-primary)]">OPEN</span>
                ) : match.status === 'Locked' ? (
                  <span className="text-xs font-bold text-red-400">LOCKED</span>
                ) : (
                  <span className="text-xs font-bold text-gray-500">FINISHED</span>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-4xl mb-2">{match.homeFlag}</div>
                  <span className="font-bold text-sm text-center">{match.homeTeam}</span>
                </div>
                
                <div className="flex flex-col items-center flex-1 px-2">
                  <span className="text-[10px] font-bold text-[var(--color-text-muted)] bg-[#111A16] px-3 py-1 rounded-full mb-2">
                    {match.matchDate}
                  </span>
                  <span className="text-2xl font-black text-[var(--color-primary)]">{match.matchTime}</span>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="text-4xl mb-2">{match.awayFlag}</div>
                  <span className="font-bold text-sm text-center">{match.awayTeam}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-400">
                  <span className="font-bold text-white">{matchQuestions.length}</span> Questions • Max <span className="font-bold text-[var(--color-primary)]">{totalPoints} PTS</span>
                </div>
                <Link 
                  to={`/matches/${match.id}`}
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black text-xs font-bold px-6 py-2 rounded-full transition-colors"
                >
                  {match.status === 'Open' ? 'Beli Tiket (Predict)' : 'View Result'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Matches;
