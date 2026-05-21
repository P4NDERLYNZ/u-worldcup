/* eslint-disable */
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FlagImage } from '../utils/flagHelper';

const PredictionModal = ({ isOpen, onClose, match, onSubmit, initialPrediction }) => {
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [error, setError] = useState('');

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (initialPrediction) {
      setHomeScore(initialPrediction.homeScore.toString());
      setAwayScore(initialPrediction.awayScore.toString());
    } else {
      setHomeScore('');
      setAwayScore('');
    }
    setError('');
  }, [match, initialPrediction, isOpen]);

  if (!isOpen || !match) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (homeScore === '' || awayScore === '') {
      setError('Please enter both scores');
      return;
    }
    if (isNaN(homeScore) || isNaN(awayScore) || homeScore < 0 || awayScore < 0) {
      setError('Scores must be valid numbers');
      return;
    }

    onSubmit(match.id, homeScore, awayScore);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-card bg-[var(--color-card)] rounded-2xl p-6 w-full max-w-md relative border border-[var(--color-primary)]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-center text-[var(--color-primary)]">
          Predict Score
        </h2>

        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-center flex-1">
            <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-12 h-8 mb-2" />
            <span className="font-bold">{match.homeTeam}</span>
          </div>
          
          <div className="text-lg font-bold text-gray-500">VS</div>

          <div className="flex flex-col items-center flex-1">
            <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-12 h-8 mb-2" />
            <span className="font-bold">{match.awayTeam}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 mb-8">
            <input 
              type="number" 
              min="0"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="w-20 text-center text-3xl font-bold bg-[var(--color-surface)] border border-gray-600 rounded-xl p-3 focus:border-[var(--color-primary)] focus:outline-none text-white"
              placeholder="0"
            />
            <span className="text-2xl font-bold self-center text-gray-500">-</span>
            <input 
              type="number" 
              min="0"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="w-20 text-center text-3xl font-bold bg-[var(--color-surface)] border border-gray-600 rounded-xl p-3 focus:border-[var(--color-primary)] focus:outline-none text-white"
              placeholder="0"
            />
          </div>

          {error && <p className="text-red-400 text-center text-sm mb-4">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-bold py-3 px-4 rounded-xl transition-colors text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Submit Prediction
          </button>
        </form>
      </div>
    </div>
  );
};

export default PredictionModal;
