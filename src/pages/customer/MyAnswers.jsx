import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { FlagImage } from '../../utils/flagHelper';

const MyAnswers = () => {
  const { userAnswers, questions, matches, currentUser } = useContext(AppContext);

  const myAnswers = userAnswers.filter(a => a.userId === currentUser.id);

  return (
    <div className="space-y-6 pb-28">
      <div className="pt-6">
        <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest">Prediction Tickets</span>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase mt-0.5">
          My <span className="text-[var(--color-primary)]">Predictions</span>
        </h1>
        <p className="text-xs text-[var(--color-text-muted)] font-semibold mt-1">Track your submitted predictions and check results.</p>
      </div>

      <div className="space-y-4">
        {myAnswers.length === 0 ? (
          <div className="text-center py-12 px-6 bg-[var(--color-card)]/50 border border-white/5 rounded-[28px] text-[var(--color-text-muted)] font-bold">
            <Clock className="mx-auto mb-3 opacity-60" size={32} />
            <span>You haven't made any predictions yet.</span>
          </div>
        ) : (
          myAnswers.map(ans => {
            const question = questions.find(q => q.id === ans.questionId);
            const match = matches.find(m => m.id === ans.matchId);
            if (!question || !match) return null;

            return (
              <div 
                key={ans.id} 
                className="bg-[var(--color-card)]/80 rounded-[28px] p-5 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                {/* Accent line on cards depending on status */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  ans.status === 'Correct' ? 'bg-green-500' :
                  ans.status === 'Wrong' ? 'bg-red-500' : 'bg-gray-600'
                }`}></div>

                {/* Match Info & Status */}
                <div className="flex justify-between items-center mb-3.5 border-b border-white/5 pb-3">
                  <span className="text-[10px] font-black text-white uppercase tracking-wider pl-2 flex items-center gap-2">
                    <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-5 h-3.5 inline-block object-cover rounded-sm" />
                    <span>{match.homeTeam} vs {match.awayTeam}</span>
                    <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-5 h-3.5 inline-block object-cover rounded-sm" />
                  </span>
                  
                  {ans.status === 'Correct' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[9px] font-black uppercase tracking-wider border border-green-500/20">
                      <CheckCircle2 size={10} /> Correct
                    </span>
                  ) : ans.status === 'Wrong' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-black uppercase tracking-wider border border-red-500/20">
                      <AlertCircle size={10} /> Wrong
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gray-400 text-[9px] font-black uppercase tracking-wider border border-white/10">
                      <Clock size={10} /> Pending
                    </span>
                  )}
                </div>
                
                {/* Question Text */}
                <h3 className="text-sm font-extrabold text-white mb-4 pl-2">
                  {question.questionText}
                </h3>
                
                {/* Answer Summary */}
                <div className="flex justify-between items-end mt-4 pl-2">
                  <div>
                    <span className="text-[9px] text-[var(--color-text-muted)] font-black uppercase tracking-wider block mb-0.5">Your Answer</span>
                    <span className="text-sm font-extrabold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full border border-[var(--color-primary)]/15">
                      {ans.answer}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-[var(--color-text-muted)] font-black uppercase tracking-wider block mb-0.5">Points Earned</span>
                    <span className={`text-sm font-extrabold ${ans.status === 'Correct' ? 'text-green-400' : 'text-white'}`}>
                      +{ans.pointEarned || 0} PTS
                    </span>
                  </div>
                </div>
                
                {/* Correct answer display when resolved */}
                {ans.status !== 'Waiting Result' && question.correctAnswer && (
                  <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-[18px] text-[11px] pl-3 flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)] font-bold">Official Correct Answer:</span>
                    <span className="font-extrabold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
                      {question.correctAnswer}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAnswers;
