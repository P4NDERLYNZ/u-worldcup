import React, { createContext, useState, useEffect } from 'react';
import { mockMatches, mockQuestions, mockUsers, mockUserAnswers } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- State Initialization ---
  const [matches, setMatches] = useState(() => {
    const saved = localStorage.getItem('uworldcup_matches_v2');
    return saved ? JSON.parse(saved) : mockMatches;
  });

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('uworldcup_questions_v2');
    return saved ? JSON.parse(saved) : mockQuestions;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem('uworldcup_answers_v2');
    return saved ? JSON.parse(saved) : mockUserAnswers;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('uworldcup_users_v2');
    return saved ? JSON.parse(saved) : mockUsers;
  });

  // --- Mock Authentication & Roles ---
  const [role, setRole] = useState('customer'); // 'customer' or 'admin'
  const currentUser = users.find(u => u.id === 1);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('uworldcup_matches_v2', JSON.stringify(matches));
    localStorage.setItem('uworldcup_questions_v2', JSON.stringify(questions));
    localStorage.setItem('uworldcup_answers_v2', JSON.stringify(userAnswers));
    localStorage.setItem('uworldcup_users_v2', JSON.stringify(users));
  }, [matches, questions, userAnswers, users]);

  // --- Customer Functions ---
  const submitAnswer = (matchId, questionId, answerValue) => {
    const match = matches.find(m => m.id === matchId);
    if (!match || match.status !== 'Open') return false;

    setUserAnswers(prev => {
      // Remove old answer for this specific question by this user
      const filtered = prev.filter(a => !(a.userId === currentUser.id && a.questionId === questionId));
      
      const newAnswer = {
        id: Date.now() + Math.random(),
        userId: currentUser.id,
        matchId,
        questionId,
        answer: answerValue,
        isCorrect: null,
        pointEarned: 0,
        status: 'Waiting Result',
        submittedAt: new Date().toISOString()
      };
      return [...filtered, newAnswer];
    });
    return true;
  };

  // --- Admin Functions ---
  const updateMatchAdmin = (matchId, updates) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, ...updates } : m));
  };

  const createQuestion = (questionData) => {
    setQuestions(prev => [...prev, { id: Date.now(), ...questionData }]);
  };

  const updateQuestion = (questionId, updates) => {
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  // Auto-Calculate function
  const setCorrectAnswerAndCalculate = (questionId, correctAnswer) => {
    // 1. Update the question with the correct answer
    let targetQuestion = null;
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        targetQuestion = { ...q, correctAnswer };
        return targetQuestion;
      }
      return q;
    }));

    if (!targetQuestion) return;

    // 2. Evaluate all user answers for this question
    let updatedAnswersList = [];
    setUserAnswers(prev => {
      const newAnswers = prev.map(ans => {
        if (ans.questionId === questionId) {
          // Check correctness
          const isCorrect = String(ans.answer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim();
          const pointEarned = isCorrect ? targetQuestion.point : 0;
          return { ...ans, isCorrect, pointEarned, status: isCorrect ? 'Correct' : 'Wrong' };
        }
        return ans;
      });
      updatedAnswersList = newAnswers;
      return newAnswers;
    });

    // 3. Recalculate Total Scores for all users
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        // Find all answers for this user
        const userAns = updatedAnswersList.filter(a => a.userId === user.id);
        const totalScore = userAns.reduce((sum, a) => sum + (a.pointEarned || 0), 0);
        return { ...user, totalScore };
      });
    });
  };

  return (
    <AppContext.Provider value={{
      matches, setMatches,
      questions, setQuestions,
      userAnswers, setUserAnswers,
      users, setUsers,
      currentUser,
      role, setRole,
      submitAnswer,
      updateMatchAdmin,
      createQuestion, updateQuestion, deleteQuestion,
      setCorrectAnswerAndCalculate
    }}>
      {children}
    </AppContext.Provider>
  );
};
