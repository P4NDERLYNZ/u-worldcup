import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, Check, Trash } from 'lucide-react';

const QuestionManager = () => {
  const { matchId } = useParams();
  const { matches, questions, setCorrectAnswerAndCalculate } = useContext(AppContext);
  const [correctAnswers, setCorrectAnswers] = useState({});

  const match = matches.find(m => m.id === parseInt(matchId));
  const matchQuestions = questions.filter(q => q.matchId === parseInt(matchId));

  if (!match) return <div>Match not found</div>;

  const handleSetCorrectAnswer = (qId) => {
    const val = correctAnswers[qId];
    if (val !== undefined && val !== '') {
      setCorrectAnswerAndCalculate(qId, val);
      alert('Answer saved and scores calculated automatically!');
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <Link to="/admin/matches" className="flex items-center gap-2 text-gray-400 hover:text-white mb-4">
          <ArrowLeft size={16} /> Back to Matches
        </Link>
        <h1 className="text-3xl font-black">{match.homeTeam} vs {match.awayTeam}</h1>
        <p className="text-[var(--color-primary)] font-bold mt-1">Manage Questions & Results</p>
      </div>

      <div className="space-y-6">
        {matchQuestions.map(q => (
          <div key={q.id} className="bg-[#1A251F] border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-1 rounded text-xs font-bold mr-2">
                  Tier {q.tier} ({q.point} PTS)
                </span>
                <span className="text-gray-400 text-xs bg-black/50 px-2 py-1 rounded">{q.answerType}</span>
                <h3 className="text-lg font-bold text-white mt-2">{q.questionText}</h3>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5">
              <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Set Correct Answer</label>
              <div className="flex gap-2">
                {q.answerType === 'Choice' ? (
                  <select 
                    value={correctAnswers[q.id] || q.correctAnswer || ''}
                    onChange={(e) => setCorrectAnswers({...correctAnswers, [q.id]: e.target.value})}
                    className="flex-1 bg-[#111A16] border border-white/10 rounded px-3 py-2 text-white"
                  >
                    <option value="">-- Select Answer --</option>
                    {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  <input 
                    type="text"
                    value={correctAnswers[q.id] !== undefined ? correctAnswers[q.id] : (q.correctAnswer || '')}
                    onChange={(e) => setCorrectAnswers({...correctAnswers, [q.id]: e.target.value})}
                    placeholder="Enter correct answer..."
                    className="flex-1 bg-[#111A16] border border-white/10 rounded px-3 py-2 text-white"
                  />
                )}
                
                <button 
                  onClick={() => handleSetCorrectAnswer(q.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                  <Check size={16} /> Save & Calculate
                </button>
              </div>
              {q.correctAnswer && (
                <p className="text-xs text-green-400 mt-2 font-bold flex items-center gap-1">
                  <Check size={12} /> Currently set: {q.correctAnswer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionManager;
