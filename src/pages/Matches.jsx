import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import MatchCard from '../components/MatchCard';
import PredictionModal from '../components/PredictionModal';

const Matches = () => {
  const { matches, predictions, currentUser, addPrediction } = useContext(AppContext);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handlePredictClick = (match) => {
    setSelectedMatch(match);
  };

  const handleModalClose = () => {
    setSelectedMatch(null);
  };

  const handleSubmitPrediction = (matchId, homeScore, awayScore) => {
    addPrediction(matchId, homeScore, awayScore);
  };

  const getUserPrediction = (matchId) => {
    return predictions.find(p => p.matchId === matchId && p.userId === currentUser.id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Matches</h1>
        <p className="text-gray-400">View upcoming matches and place your predictions.</p>
      </div>

      <div className="space-y-4">
        {matches.map(match => (
          <MatchCard 
            key={match.id} 
            match={match} 
            onPredictClick={handlePredictClick}
            userPrediction={getUserPrediction(match.id)}
          />
        ))}
      </div>

      <PredictionModal 
        isOpen={!!selectedMatch} 
        onClose={handleModalClose}
        match={selectedMatch}
        onSubmit={handleSubmitPrediction}
        initialPrediction={selectedMatch ? getUserPrediction(selectedMatch.id) : null}
      />
    </div>
  );
};

export default Matches;
