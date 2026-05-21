import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { FlagImage } from '../../utils/flagHelper';

const MatchPrediction = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { matches, questions, userAnswers, submitAnswer, currentUser } = useContext(AppContext);
  const [toast, setToast] = useState(false);

  const match = matches.find(m => m.id === parseInt(matchId));
  const matchQuestions = questions.filter(q => q.matchId === parseInt(matchId));
  
  if (!match) return <div className="text-white p-4 text-center font-bold">Match not found</div>;

  // Check if prediction is open based on predictionOpenDate and predictionOpenTime
  const now = new Date();
  let notOpenYet = false;
  if (match.predictionOpenDate) {
    const openTimeStr = match.predictionOpenTime || '00:00';
    const openDateTime = new Date(`${match.predictionOpenDate}T${openTimeStr}`);
    if (now < openDateTime) {
      notOpenYet = true;
    }
  }

  const handleAnswerSubmit = (questionId, value) => {
    if (match.status !== 'Open' || notOpenYet) return;
    submitAnswer(match.id, questionId, value);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const getTierBadge = (tier) => {
    switch(tier) {
      case 1: 
        return (
          <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 1 • Basic
          </span>
        );
      case 2: 
        return (
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 2 • Smart
          </span>
        );
      case 3: 
        return (
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 3 • Pro
          </span>
        );
      case 4: 
        return (
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 4 • Master
          </span>
        );
      case 5: 
        return (
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
            Tier 5 • Legend
          </span>
        );
      default: return null;
    }
  };

  return (
    <div className="pb-28">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bronze-gradient-bg text-black px-5 py-2.5 rounded-full shadow-[0_8px_20px_rgba(209,161,83,0.35)] flex items-center gap-2 font-black text-sm animate-pulse">
          <CheckCircle2 size={16} className="stroke-[3]" /> Saved Prediction
        </div>
      )}

      {/* Back navigation */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-xs font-black text-[var(--color-text-muted)] hover:text-white uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full border border-white/5 mb-8"
      >
        <ArrowLeft size={12} /> Back
      </button>

      {/* Match Banner Card */}
      <div className="bg-[var(--color-card)]/80 rounded-[32px] p-6 border border-white/5 shadow-2xl text-center mb-8 relative overflow-hidden">
        {/* Lights */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-surface)] px-3.5 py-1.5 rounded-full mb-3 border border-white/5">
            {match.round}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-10 h-7 flex-shrink-0" />
            <span>{match.homeTeam}</span>
            <span className="text-[var(--color-text-muted)] text-base font-medium font-serif italic lowercase">vs</span>
            <span>{match.awayTeam}</span>
            <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-10 h-7 flex-shrink-0" />
          </h1>
          
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] font-bold mt-3 bg-[var(--color-primary)]/10 px-3 py-1 rounded-full border border-[var(--color-primary)]/10">
            <Clock size={12} />
            <span>{match.matchDate} • {match.matchTime}</span>
          </div>

          {notOpenYet ? (
            <div className="mt-4 text-xs font-black text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-4 py-1.5 rounded-full uppercase tracking-wider">
              ทายผลได้ตั้งแต่: {match.predictionOpenDate} เวลา {match.predictionOpenTime || '00:00'} น.
            </div>
          ) : match.status !== 'Open' ? (
            <div className="mt-4 text-xs font-black text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full uppercase tracking-wider">
              Predictions Locked
            </div>
          ) : null}
        </div>
      </div>

      {/* Questions Stack Grouped by Tier */}
      <div className="space-y-10">
        {[1, 2, 3, 4, 5].map(tierNum => {
          const tierQuestions = matchQuestions.filter(q => q.tier === tierNum);
          if (tierQuestions.length === 0) return null;

          const getTierTitle = (t) => {
            if (t === 1) return "Tier 1 • Basic Questions";
            if (t === 2) return "Tier 2 • Smart Questions";
            if (t === 3) return "Tier 3 • Pro Questions";
            if (t === 4) return "Tier 4 • Master Questions";
            return "Tier 5 • Legend Questions";
          };

          const getTierColor = (t) => {
            if (t === 1) return "text-[var(--color-primary)]";
            if (t === 2) return "text-orange-400";
            if (t === 3) return "text-rose-400";
            if (t === 4) return "text-sky-400";
            return "text-yellow-400";
          };

          const getTierDot = (t) => {
            if (t === 1) return "bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]";
            if (t === 2) return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]";
            if (t === 3) return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]";
            if (t === 4) return "bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]";
            return "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]";
          };

          return (
            <div key={tierNum} className="space-y-4">
              <h2 className={`text-sm font-black uppercase tracking-wider ${getTierColor(tierNum)} flex items-center gap-2 border-b border-white/5 pb-2`}>
                <span className={`w-2 h-2 rounded-full ${getTierDot(tierNum)}`}></span>
                {getTierTitle(tierNum)}
              </h2>

              <div className="space-y-4">
                {tierQuestions.map((q, index) => {
                  const currentAnswer = userAnswers.find(a => a.userId === currentUser.id && a.questionId === q.id)?.answer || '';
                  const isLocked = match.status !== 'Open' || notOpenYet;

                  return (
                    <div 
                      key={q.id} 
                      className="bg-[var(--color-card)]/80 rounded-[28px] p-6 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl"
                    >
                      <div className="flex flex-col gap-1 pb-4 border-b border-white/5">
                        <div className="flex justify-between items-center">
                          {getTierBadge(q.tier)}
                          <span className="text-[10px] bg-[var(--color-surface)] border border-white/5 px-3 py-1 rounded-full text-white font-extrabold tracking-wider">
                            {q.point} PTS
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-white mt-3 leading-snug">
                          Q{index + 1}: {q.questionText}
                        </h3>
                      </div>

                      {/* Multiple Choice Options (Slot Style) */}
                      {(q.answerType === 'Choice' || q.answerType === 'Both') && (
                        <div className="grid grid-cols-1 gap-2.5 mt-5">
                          {q.options.map(opt => {
                            const isSelected = currentAnswer === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => handleAnswerSubmit(q.id, opt)}
                                disabled={isLocked}
                                className={`w-full text-left py-4 px-5 rounded-[20px] text-sm font-bold tracking-wide transition-all duration-300 border ${
                                  isSelected 
                                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_15px_rgba(209,161,83,0.15)]' 
                                    : 'bg-[var(--color-surface)] text-gray-300 border-white/5 hover:border-white/20'
                                } ${isLocked && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{opt}</span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]"></span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Text Input / Type Answer Fields */}
                      {(q.answerType === 'Score Input' || q.answerType === 'Both') && (
                        <div className="mt-5">
                          {q.answerType === 'Both' && (
                            <label className="block text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                              หรือพิมพ์คำตอบอิสระ/คำตอบเพิ่มเติมด้านล่าง
                            </label>
                          )}
                          <input 
                            type="text" 
                            placeholder={q.answerType === 'Both' ? "พิมพ์ระบุคำตอบอื่นๆ ที่ไม่มีในตัวเลือกด้านบน..." : "พิมพ์คำตอบของคุณที่นี่ (เช่น 2-1, Messi, นาทีที่ 45)..."}
                            value={currentAnswer}
                            onChange={(e) => {
                              if(!isLocked) handleAnswerSubmit(q.id, e.target.value);
                            }}
                            disabled={isLocked}
                            className="w-full bg-[var(--color-surface)] border border-white/10 rounded-[20px] px-5 py-4 text-white focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_15px_rgba(209,161,83,0.15)] transition-all font-bold placeholder:text-gray-400 text-sm"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {matchQuestions.length === 0 && (
          <div className="bg-[var(--color-card)]/50 rounded-[28px] p-10 text-center border border-white/5 text-gray-500 font-bold">
            No questions available for this match yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;
