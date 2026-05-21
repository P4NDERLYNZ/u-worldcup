import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const MatchPrediction = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { matches, questions, userAnswers, submitAnswer, currentUser } = useContext(AppContext);
  const [toast, setToast] = useState(false);

  const match = matches.find(m => m.id === parseInt(matchId));
  const matchQuestions = questions.filter(q => q.matchId === parseInt(matchId));
  
  if (!match) return <div className="text-white p-4">Match not found</div>;

  const handleAnswerSubmit = (questionId, value) => {
    if (match.status !== 'Open') return;
    submitAnswer(match.id, questionId, value);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const getTierBadge = (tier) => {
    switch(tier) {
      case 1: return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">Tier 1 • Basic</span>;
      case 2: return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded text-[10px] font-bold">Tier 2 • Smart</span>;
      case 3: return <span className="bg-pink-500/20 text-pink-400 border border-pink-500/30 px-2 py-0.5 rounded text-[10px] font-bold">Tier 3 • Pro</span>;
      default: return null;
    }
  };

  return (
    <div className="pb-24">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} /> Saved!
        </div>
      )}

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white">{match.homeTeam} vs {match.awayTeam}</h1>
        <p className="text-[var(--color-primary)] font-bold mt-1">{match.matchDate} • {match.matchTime}</p>
        {match.status !== 'Open' && (
          <div className="mt-2 text-red-400 text-sm font-bold bg-red-500/10 inline-block px-3 py-1 rounded">
            Predictions Locked
          </div>
        )}
      </div>

      <div className="space-y-6">
        {matchQuestions.map((q, index) => {
          const currentAnswer = userAnswers.find(a => a.userId === currentUser.id && a.questionId === q.id)?.answer || '';
          const isLocked = match.status !== 'Open';

          return (
            <div key={q.id} className="glass-panel rounded-2xl p-5 border-l-4 border-l-[var(--color-primary)]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    {getTierBadge(q.tier)}
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-bold">{q.point} PTS</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2">Q{index + 1}: {q.questionText}</h3>
                </div>
              </div>

              {q.answerType === 'Choice' && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSubmit(q.id, opt)}
                      disabled={isLocked}
                      className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                        currentAnswer === opt 
                          ? 'bg-[var(--color-primary)] text-black border-[var(--color-primary)]' 
                          : 'bg-[#111A16] text-gray-300 border-white/5 hover:border-[var(--color-primary)]/50'
                      } ${isLocked && currentAnswer !== opt ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {q.answerType === 'Score Input' && (
                <div className="mt-4 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. 2-1" 
                    value={currentAnswer}
                    onChange={(e) => {
                      if(!isLocked) handleAnswerSubmit(q.id, e.target.value);
                    }}
                    disabled={isLocked}
                    className="w-full bg-[#111A16] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>
              )}
            </div>
          );
        })}

        {matchQuestions.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No questions available for this match yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;
