import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Trophy, Activity, ArrowRight, Dribbble, Target } from 'lucide-react';

const CategoryPill = ({ icon, label, active }) => (
  <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${active ? 'gold-gradient-bg text-black shadow-[0_0_15px_rgba(243,189,104,0.4)]' : 'border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}>
    {icon}
    <span>{label}</span>
  </div>
);

const Home = () => {
  const { matches, predictions, currentUser, users } = useContext(AppContext);
  
  const openMatchesCount = matches.filter(m => m.status === 'Open').length;
  const userStats = users.find(u => u.id === currentUser.id) || { totalScore: 0 };

  return (
    <div className="space-y-8 pb-24">
      {/* Premium Header Area */}
      <div className="pt-4 flex flex-col items-start">
        <h2 className="text-[var(--color-text-muted)] text-sm font-medium tracking-wide mb-1 uppercase">Welcome Back</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
          Choose your <br/>
          <span className="font-serif italic font-light">Favorite</span> <span className="gold-gradient-text">game</span>
        </h1>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <CategoryPill active={true} icon={<Trophy size={16} />} label="Football" />
        <CategoryPill active={false} icon={<Dribbble size={16} />} label="Basketball" />
        <CategoryPill active={false} icon={<Target size={16} />} label="Tennis" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <h3 className="text-2xl font-bold tracking-tight">Top Events</h3>
        <Link to="/matches" className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          View All
        </Link>
      </div>

      {/* Hero Stats Card */}
      <div className="glass-panel rounded-[32px] p-8 card-hover-effect relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-[60px] group-hover:bg-[var(--color-primary)]/20 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold mb-4 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
              Live Prediction
            </div>
            <h2 className="text-3xl font-extrabold mb-1">{openMatchesCount} Matches</h2>
            <p className="text-[var(--color-text-muted)] font-medium">Available for prediction right now.</p>
          </div>
          
          <div className="flex flex-row md:flex-col gap-4 md:gap-2 w-full md:w-auto text-center">
            <div className="flex-1 bg-black/40 rounded-2xl p-4 border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Your Score</p>
              <p className="text-2xl font-black text-white">{userStats.totalScore} <span className="text-xs text-[var(--color-primary)]">PTS</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link 
          to="/matches" 
          className="inline-flex items-center justify-center gap-3 w-full md:w-auto min-w-[280px] gold-gradient-bg text-black font-extrabold py-5 px-10 rounded-full transition-all text-lg shadow-[0_10px_30px_rgba(243,189,104,0.3)] hover:shadow-[0_15px_40px_rgba(243,189,104,0.5)] hover:-translate-y-1"
        >
          Predict Now <ArrowRight size={22} className="stroke-[3]" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
