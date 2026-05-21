import { NavLink } from 'react-router-dom';
import { Trophy, Home, Calendar, ClipboardList, Settings, User } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import clsx from 'clsx';

const Header = () => {
  const { isAdmin, setIsAdmin, currentUser } = useContext(AppContext);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Matches', path: '/matches', icon: <Calendar size={20} /> },
    { name: 'My Predictions', path: '/predictions', icon: <ClipboardList size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin', path: '/admin', icon: <Settings size={20} /> });
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 w-full z-50 glass-card text-white">
        <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-xl">
            <Trophy className="text-[var(--color-primary)]" />
            <span>U-WorldCup</span>
          </div>
          
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors",
                    isActive ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]" : "text-gray-400"
                  )
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User size={18} />
              <span className="text-sm font-medium">{currentUser.username}</span>
            </div>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-xs px-2 py-1 bg-[var(--color-surface)] border border-gray-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              {isAdmin ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 glass-card border-t border-gray-800">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                  isActive ? "text-[var(--color-primary)]" : "text-gray-500 hover:text-gray-300"
                )
              }
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 glass-card text-white h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-lg">
          <Trophy size={18} className="text-[var(--color-primary)]" />
          <span>U-WorldCup</span>
        </div>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className="text-xs px-2 py-1 bg-[var(--color-surface)] border border-gray-700 rounded text-gray-400"
        >
          {isAdmin ? 'Exit Admin' : 'Admin'}
        </button>
      </header>
    </>
  );
};

export default Header;
