import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarDays, ClipboardList, Trophy, ShieldAlert, LogIn } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const location = useLocation();
  const { role, setRole, currentUser } = useContext(AppContext);

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/matches', label: 'Jadwal', icon: <CalendarDays size={20} /> },
    { path: '/my-answers', label: 'Tiket', icon: <ClipboardList size={20} /> },
    { path: '/leaderboard', label: 'Klasemen', icon: <Trophy size={20} /> },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center bg-[#1A251F]/80 backdrop-blur-md p-4 fixed top-0 w-full z-50 border-b border-white/5 shadow-md">
        <div className="flex items-center gap-2">
          <Trophy className="text-[var(--color-primary)]" size={28} />
          <span className="text-xl font-black tracking-widest uppercase">U-WorldCup</span>
        </div>
        
        <nav className="flex gap-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
                location.pathname === item.path 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] font-bold' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#111A16] px-4 py-2 rounded-full border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username}`} alt="Avatar" />
            </div>
            <span className="text-sm font-bold text-white">{currentUser?.username}</span>
            <span className="text-xs bg-[var(--color-primary)] text-black px-2 py-0.5 rounded font-black">{currentUser?.totalScore} P</span>
          </div>

          {/* MOCK LOGIN SWITCHER */}
          {role === 'customer' ? (
            <button 
              onClick={() => setRole('admin')}
              className="flex items-center gap-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500/20 transition-all"
            >
              <ShieldAlert size={14} /> Admin
            </button>
          ) : (
            <Link 
              to="/admin"
              className="flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-all"
            >
              <LogIn size={14} /> Go to Admin
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#1A251F]/90 backdrop-blur-lg border-t border-white/5 z-50 px-6 py-3 flex justify-between items-center pb-safe">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-[var(--color-primary)] scale-110' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full bg-[#1A251F]/90 backdrop-blur-lg border-b border-white/5 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username}`} alt="Avatar" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Poin Anda</span>
            <span className="text-sm font-bold text-[var(--color-primary)]">{currentUser?.totalScore} P</span>
          </div>
        </div>
        
        {role === 'customer' ? (
          <button 
            onClick={() => setRole('admin')}
            className="flex items-center gap-1 text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded"
          >
            Switch to Admin
          </button>
        ) : (
          <Link to="/admin" className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Admin Panel</Link>
        )}
      </div>
    </>
  );
};

export default Header;
