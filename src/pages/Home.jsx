import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Trophy, Activity, CheckCircle, ArrowRight } from 'lucide-react';

const SummaryCard = ({ title, value, icon, className }) => (
  <div className={`glass-card p-6 rounded-xl flex items-center justify-between ${className || ''}`}>
    <div>
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
    <div className="p-3 bg-[var(--color-surface)] rounded-full text-[var(--color-primary)]">
      {icon}
    </div>
  </div>
);

const Home = () => {
  const { matches, predictions, currentUser, users } = useContext(AppContext);
  
  const openMatchesCount = matches.filter(m => m.status === 'Open').length;
  const userPredictionsCount = predictions.filter(p => p.userId === currentUser.id).length;
  const userStats = users.find(u => u.id === currentUser.id) || { totalScore: 0 };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Trophy size={64} className="mx-auto text-[var(--color-primary)] mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-[var(--color-primary)]">U-WorldCup</span>
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Predict the scores of the biggest football tournament and compete with your team!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <SummaryCard 
          title="Total Matches" 
          value={matches.length} 
          icon={<Activity size={24} />} 
        />
        <SummaryCard 
          title="Open for Prediction" 
          value={openMatchesCount} 
          icon={<Activity size={24} />} 
          className="border border-[var(--color-primary)]/20"
        />
        <SummaryCard 
          title="Your Predictions" 
          value={userPredictionsCount} 
          icon={<CheckCircle size={24} />} 
        />
        <SummaryCard 
          title="Your Total Score" 
          value={userStats.totalScore} 
          icon={<Trophy size={24} />} 
        />
      </div>

      <div className="text-center pb-10">
        <Link 
          to="/matches" 
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-black font-bold py-4 px-8 rounded-full transition-colors text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
        >
          Start Predicting <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
