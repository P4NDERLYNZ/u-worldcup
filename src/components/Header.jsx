import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarDays, ClipboardList, Trophy, ShieldAlert, LogIn } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const location = useLocation();
  const { role, setRole, currentUser } = useContext(AppContext);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/matches', label: 'Matches', icon: <CalendarDays size={18} /> },
    { path: '/my-answers', label: 'My Predictions', icon: <ClipboardList size={18} /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center bg-[var(--color-card)]/80 backdrop-blur-lg px-8 py-4 fixed top-0 w-full z-50 border-b border-[var(--color-primary)]/10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-primary)] p-1.5 rounded-xl gold-aura">
            <Trophy className="text-black" size={20} />
          </div>
          <span className="text-lg font-black tracking-widest uppercase bronze-gradient-text">U-WorldCup</span>
        </div>
        
        <nav className="flex gap-1.5 bg-[var(--color-background)] p-1 rounded-full border border-white/5">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'btn-bronze font-extrabold shadow-lg' 
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[var(--color-surface)] px-4 py-1.5 rounded-full border border-white/5">
            <div className="w-7 h-7 rounded-full bg-slate-800 overflow-hidden border border-white/10">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username}`} alt="Avatar" />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">{currentUser?.username}</span>
            <span className="text-xs bg-[var(--color-primary)] text-black px-2.5 py-1 rounded-full font-black shadow-[0_2px_8px_rgba(209,161,83,0.2)]">
              {currentUser?.totalScore} P
            </span>
          </div>

          {/* MOCK LOGIN SWITCHER */}
          {role === 'customer' ? (
            <button 
              onClick={() => setRole('admin')}
              className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <ShieldAlert size={14} className="text-[var(--color-primary)]" />
              <span className="font-bold">Admin Mode</span>
            </button>
          ) : (
            <Link 
              to="/admin"
              className="flex items-center gap-1.5 text-xs btn-bronze px-4 py-2 rounded-full font-extrabold transition-all active:scale-95"
            >
              <LogIn size={14} />
              <span>Admin Panel</span>
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[var(--color-card)]/95 backdrop-blur-xl border-t border-white/5 z-50 px-4 py-2 flex justify-around items-center pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center gap-1.5 py-1.5 px-3.5 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-black btn-bronze font-extrabold scale-105 shadow-md' 
                  : 'text-[var(--color-text-muted)] hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-[9px] font-extrabold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full bg-[var(--color-card)]/90 backdrop-blur-xl border-b border-white/5 z-50 px-4 py-3 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden border border-white/10">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username}`} alt="Avatar" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--color-text-muted)] font-bold tracking-wider uppercase">My Points</span>
            <span className="text-sm font-extrabold text-[var(--color-primary)]">{currentUser?.totalScore} P</span>
          </div>
        </div>
        
        {role === 'customer' ? (
          <button 
            onClick={() => setRole('admin')}
            className="flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 text-white font-extrabold px-3 py-1.5 rounded-full"
          >
            <ShieldAlert size={12} className="text-[var(--color-primary)]" />
            <span>Admin</span>
          </button>
        ) : (
          <Link 
            to="/admin" 
            className="text-[10px] btn-bronze px-3 py-1.5 rounded-full"
          >
            Admin Panel
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;

