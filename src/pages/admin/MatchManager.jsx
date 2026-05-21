import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Settings, Plus } from 'lucide-react';

const MatchManager = () => {
  const { matches, updateMatchAdmin } = useContext(AppContext);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Manage Matches</h1>
        <button className="bg-[var(--color-primary)] text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> New Match
        </button>
      </div>

      <div className="space-y-4">
        {matches.map(match => (
          <div key={match.id} className="bg-[#1A251F] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-3xl">{match.homeFlag}</span>
              <span className="font-bold">{match.homeTeam}</span>
              <span className="text-gray-500 font-bold">VS</span>
              <span className="font-bold">{match.awayTeam}</span>
              <span className="text-3xl">{match.awayFlag}</span>
            </div>

            <div className="flex items-center gap-4">
              <select 
                value={match.status}
                onChange={(e) => updateMatchAdmin(match.id, { status: e.target.value })}
                className="bg-[#111A16] border border-white/10 rounded p-2 text-sm text-white"
              >
                <option value="Open">Open</option>
                <option value="Locked">Locked</option>
                <option value="Finished">Finished</option>
              </select>

              <Link 
                to={`/admin/matches/${match.id}/questions`}
                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <Settings size={16} /> Manage Questions & Results
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchManager;
