import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Admin = () => {
  const { matches, updateMatchAdmin, recalculateScores } = useContext(AppContext);

  const handleStatusChange = (matchId, newStatus) => {
    updateMatchAdmin(matchId, { status: newStatus });
  };

  const handleScoreChange = (matchId, type, value) => {
    updateMatchAdmin(matchId, { 
      [type === 'home' ? 'actualHomeScore' : 'actualAwayScore']: value === '' ? null : parseInt(value)
    });
  };

  const handleRecalculate = () => {
    recalculateScores();
    alert("Scores recalculated successfully!");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage matches, update scores, and recalculate points.</p>
        </div>
        <button 
          onClick={handleRecalculate}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
        >
          Recalculate All Scores
        </button>
      </div>

      <div className="glass-card rounded-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[var(--color-surface)]/80 text-gray-400 text-sm">
              <th className="p-4 font-medium">Match</th>
              <th className="p-4 font-medium">Date/Time</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actual Result</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(match => (
              <tr key={match.id} className="border-b border-gray-800">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{match.homeFlag}</span>
                    <span className="font-bold w-16 text-right truncate">{match.homeTeam}</span>
                    <span className="text-gray-500 text-xs">VS</span>
                    <span className="font-bold w-16 truncate">{match.awayTeam}</span>
                    <span className="text-xl">{match.awayFlag}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {match.matchDate} <br /> {match.matchTime}
                </td>
                <td className="p-4">
                  <select 
                    value={match.status}
                    onChange={(e) => handleStatusChange(match.id, e.target.value)}
                    className="bg-[var(--color-surface)] border border-gray-600 text-white rounded p-1 text-sm focus:border-[var(--color-primary)] outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Locked">Locked</option>
                    <option value="Finished">Finished</option>
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="0"
                      value={match.actualHomeScore === null ? '' : match.actualHomeScore}
                      onChange={(e) => handleScoreChange(match.id, 'home', e.target.value)}
                      className="w-12 bg-[var(--color-surface)] border border-gray-600 text-white rounded p-1 text-center outline-none focus:border-[var(--color-primary)]"
                      placeholder="-"
                      disabled={match.status !== 'Finished'}
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      min="0"
                      value={match.actualAwayScore === null ? '' : match.actualAwayScore}
                      onChange={(e) => handleScoreChange(match.id, 'away', e.target.value)}
                      className="w-12 bg-[var(--color-surface)] border border-gray-600 text-white rounded p-1 text-center outline-none focus:border-[var(--color-primary)]"
                      placeholder="-"
                      disabled={match.status !== 'Finished'}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
