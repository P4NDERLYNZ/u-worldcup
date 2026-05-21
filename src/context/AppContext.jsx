import React, { createContext, useState, useEffect } from 'react';
import { mockMatches, mockUsers } from '../data/mockData';
import { calculatePredictionScore } from '../utils/scoringRules';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('uworldcup_matches');
    return saved ? JSON.parse(saved) : mockMatches;
  });

  const [predictions, setPredictions] = useState(() => {
    const saved = localStorage.getItem('uworldcup_predictions');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('uworldcup_users');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const currentUser = { id: 1, username: "Player_One" }; // Mock logged in user
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('uworldcup_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('uworldcup_predictions', JSON.stringify(predictions));
  }, [predictions]);

  useEffect(() => {
    localStorage.setItem('uworldcup_users', JSON.stringify(users));
  }, [users]);

  const addPrediction = (matchId, homeScore, awayScore) => {
    const match = matches.find(m => m.id === matchId);
    if (!match || match.status !== 'Open') return false;

    const newPrediction = {
      id: Date.now(),
      userId: currentUser.id,
      matchId,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      scoreEarned: null, // Will be calculated when match finishes
      status: 'Waiting Result'
    };

    setPredictions(prev => {
      // remove old prediction for this match if exists
      const filtered = prev.filter(p => p.matchId !== matchId);
      return [...filtered, newPrediction];
    });
    
    return true;
  };

  const updateMatchAdmin = (matchId, updates) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, ...updates } : m));
  };

  const recalculateScores = () => {
    // 1. Calculate prediction scores based on finished matches
    const updatedPredictions = predictions.map(p => {
      const match = matches.find(m => m.id === p.matchId);
      if (match && match.status === 'Finished') {
        const score = calculatePredictionScore(p, match);
        let status = 'Wrong';
        if (score === 3) status = 'Correct Score';
        if (score === 1) status = 'Correct Winner';
        return { ...p, scoreEarned: score, status };
      }
      return p;
    });
    setPredictions(updatedPredictions);

    // 2. Update users total score
    const updatedUsers = users.map(u => {
      // Mock calculation for Player_One only, others are static for demo
      if (u.id === currentUser.id) {
        const userPreds = updatedPredictions.filter(p => p.userId === u.id);
        const totalScore = userPreds.reduce((sum, p) => sum + (p.scoreEarned || 0), 0);
        return { ...u, totalScore, predictionsCount: userPreds.length };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  return (
    <AppContext.Provider value={{
      matches, setMatches,
      predictions, addPrediction,
      users, currentUser,
      isAdmin, setIsAdmin,
      updateMatchAdmin, recalculateScores
    }}>
      {children}
    </AppContext.Provider>
  );
};
