import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const MyAnswers = () => {
  const { userAnswers, questions, matches, currentUser } = useContext(AppContext);

  const myAnswers = userAnswers.filter(a => a.userId === currentUser.id);

  return (
    <div className="pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tiket Aktif Anda (My Answers)</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Track your prediction results</p>
      </div>

      <div className="space-y-4">
        {myAnswers.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-[#1A251F] rounded-2xl">
            You haven't made any predictions yet.
          </div>
        ) : (
          myAnswers.map(ans => {
            const question = questions.find(q => q.id === ans.questionId);
            const match = matches.find(m => m.id === ans.matchId);
            if (!question || !match) return null;

            return (
              <div key={ans.id} className="glass-panel rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-gray-400">
                    {match.homeTeam} vs {match.awayTeam}
                  </span>
                  <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                    ans.status === 'Correct' ? 'bg-green-500/20 text-green-400' :
                    ans.status === 'Wrong' ? 'bg-red-500/20 text-red-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {ans.status.toUpperCase()}
                  </span>
                </div>
                
                <h3 className="text-sm font-bold text-white mb-2">{question.questionText}</h3>
                
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Your Answer:</span>
                    <span className="text-sm font-bold text-[var(--color-primary)]">{ans.answer}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block">Points Earned:</span>
                    <span className="text-sm font-bold text-white">+{ans.pointEarned || 0} PTS</span>
                  </div>
                </div>
                
                {ans.status !== 'Waiting Result' && question.correctAnswer && (
                  <div className="mt-3 p-2 bg-black/30 rounded text-xs">
                    <span className="text-gray-400">Correct Answer: </span>
                    <span className="font-bold text-white">{question.correctAnswer}</span>
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
