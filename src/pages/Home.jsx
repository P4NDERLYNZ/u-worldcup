import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { FlagImage } from '../utils/flagHelper';

const Home = () => {
  const { matches, questions } = useContext(AppContext);
  
  const openMatches = matches.filter(m => m.status === 'Open' && questions.some(q => q.matchId === m.id));

  return (
    <div className="space-y-8 pb-28">
      {/* Top Welcome Section */}
      <div className="pt-6 flex justify-between items-center">
        <div>
          <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest">U-WorldCup 2026</span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase mt-0.5">
            Choose your <span className="bronze-gradient-text">Match</span>
          </h1>
        </div>
      </div>

      {/* Massive Typographic Hero Slider (Mockup Style) */}
      <div className="relative rounded-[32px] overflow-hidden aspect-[16/10] md:aspect-[16/7] border border-white/5 shadow-2xl group">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 bg-no-repeat" style={{ backgroundImage: `url('/stadium_pitch_night.png')` }}>
          <div className="w-full h-full bg-gradient-to-t from-[#0D0C0A] via-[#171512]/50 to-transparent"></div>
        </div>
        
        {/* Visual Spotlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bronze-gradient-bg text-black text-[9px] font-black uppercase tracking-wider gold-aura">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
              Matchday Active
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-none uppercase tracking-tighter">
              WORLD CUP<br/>
              <span className="font-serif italic font-light lowercase bronze-gradient-text">predictions</span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-xs md:text-sm font-semibold max-w-xs md:max-w-md">
              Predict final scores and match tiers. Climb the global leaderboard to claim rewards.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Predictions / Active Tiers Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black tracking-wider uppercase text-white">Active Tournaments</h3>
          <Link to="/matches" className="text-xs font-black text-[var(--color-primary)] hover:underline uppercase tracking-wider">
            View All
          </Link>
        </div>

        {/* Match Grid - Mockup Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {openMatches.slice(0, 2).map((match) => {
            const matchQuestions = questions.filter(q => q.matchId === match.id);

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

            return (
              <Link 
                key={match.id}
                to={`/predict/${match.id}`}
                className="group bg-[var(--color-card)]/80 hover:bg-[var(--color-card)] rounded-[28px] p-5 border border-white/5 hover:border-[var(--color-primary)]/40 transition-all duration-300 shadow-xl flex flex-col gap-4 relative overflow-hidden active:scale-[0.99]"
              >
                {/* Card Accent Lights */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full blur-2xl group-hover:bg-[var(--color-primary)]/10 transition-all"></div>
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">{match.round}</span>
                  {notOpenYet ? (
                    <span className="text-[10px] font-black bg-yellow-500/10 text-yellow-400 px-2.5 py-1 rounded-full uppercase tracking-wider border border-yellow-500/20 animate-pulse">
                      Opens {match.predictionOpenDate}
                    </span>
                  ) : (
                    <span className="text-[10px] font-black bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-1 rounded-full uppercase tracking-wider border border-[var(--color-primary)]/10">
                      {matchQuestions.length} Tiers
                    </span>
                  )}
                </div>

                 <div className="flex justify-between items-center py-2 relative z-10">
                  <div className="flex items-center gap-3">
                    <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-8 h-5.5 flex-shrink-0" />
                    <span className="text-base font-extrabold text-white group-hover:text-[var(--color-primary)] transition-colors">{match.homeTeam}</span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] font-black uppercase">VS</span>
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-8 h-5.5 flex-shrink-0" />
                    <span className="text-base font-extrabold text-white group-hover:text-[var(--color-primary)] transition-colors">{match.awayTeam}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5 relative z-10">
                  <div className="text-left">
                    <span className="block text-[9px] text-[var(--color-text-muted)] font-black uppercase tracking-wider">Date & Time</span>
                    <span className="text-xs text-white font-bold">{match.matchDate} - {match.matchTime}</span>
                  </div>
                  {notOpenYet ? (
                    <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-black uppercase tracking-wider">
                      <span>View</span>
                      <ArrowRight size={12} className="stroke-[3]" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] font-black uppercase tracking-wider">
                      <span>Predict</span>
                      <Play size={12} className="fill-[var(--color-primary)]" />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}

          {openMatches.length === 0 && (
            <div className="col-span-2 bg-[var(--color-card)]/50 rounded-[28px] p-8 text-center border border-white/5">
              <CheckCircle className="text-[var(--color-text-muted)] mx-auto mb-3" size={36} />
              <p className="text-sm font-bold text-[var(--color-text-muted)]">No active matches for prediction right now.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main High-Impact CTA Button at bottom */}
      <div className="text-center pt-4">
        <Link 
          to="/matches" 
          className="inline-flex items-center justify-center gap-3 w-full btn-bronze py-4.5 px-8 rounded-full text-base active:scale-95"
        >
          <span>Predict Now</span>
          <ArrowRight size={18} className="stroke-[3]" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
