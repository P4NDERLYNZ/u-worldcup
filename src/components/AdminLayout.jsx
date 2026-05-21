import { Outlet, Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trophy, LayoutDashboard, Calendar, ArrowLeft } from 'lucide-react';

export default function AdminLayout() {
  const { role, setRole } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setRole('admin');
      setError('');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง (คำใบ้: admin / admin)');
    }
  };

  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] spotlight-bg text-white p-4">
        <div className="bg-[var(--color-card)] p-8 rounded-[32px] w-full max-w-md border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-[40px]"></div>

          <div className="text-center mb-8 relative z-10">
             <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto mb-4 gold-aura">
               <Trophy className="text-black" size={32} />
             </div>
             <h1 className="text-3xl font-black bronze-gradient-text tracking-widest uppercase mb-1">U-WorldCup</h1>
             <p className="bronze-gradient-text font-black tracking-widest text-xs uppercase">ระบบจัดการหลังบ้าน</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">ชื่อผู้ใช้งาน</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold" 
                placeholder="กรอกชื่อผู้ใช้งาน..." 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">รหัสผ่าน</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-[var(--color-background)] border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-[var(--color-primary)] transition-all font-semibold" 
                placeholder="••••••••" 
                required 
              />
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-3.5 rounded-2xl text-center">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full btn-bronze py-3.5 rounded-2xl mt-2 active:scale-98"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
             <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
               <ArrowLeft size={12} /> กลับไปยังหน้าทายผลลูกค้า
             </Link>
          </div>
        </div>
      </div>
    );
  }

  const isDashboard = location.pathname === '/admin';
  const isMatches = location.pathname === '/admin/matches';

  return (
    <div className="min-h-screen flex bg-[var(--color-background)] spotlight-bg text-white font-sans">
      <aside className="w-64 bg-[var(--color-card)]/80 backdrop-blur-lg border-r border-white/5 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-[var(--color-primary)] p-1 rounded-lg">
            <Trophy className="text-black" size={16} />
          </div>
          <span className="text-base font-black tracking-wider uppercase bronze-gradient-text whitespace-nowrap">แผงควบคุมแอดมิน</span>
        </div>
        
        <nav className="space-y-2 font-bold text-sm">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
              isDashboard 
                ? 'btn-bronze' 
                : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>หน้าแดชบอร์ดหลัก</span>
          </Link>
          
          <Link 
            to="/admin/matches" 
            className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
              isMatches 
                ? 'btn-bronze' 
                : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white'
            }`}
          >
            <Calendar size={18} />
            <span>จัดการแมตช์แข่งขัน</span>
          </Link>
          
          <Link 
            to="/" 
            onClick={() => setRole('customer')}
            className="flex items-center gap-3 p-3.5 text-red-400 hover:bg-red-500/10 rounded-2xl mt-12 border-t border-white/5 pt-6 transition-all"
          >
            <ArrowLeft size={18} />
            <span>ออกจากหน้าแอดมิน</span>
          </Link>
        </nav>
      </aside>
      
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="md:hidden flex justify-between items-center mb-8 pb-4 border-b border-white/5">
             <h1 className="text-xl font-black text-white tracking-widest uppercase">ระบบแอดมิน</h1>
             <Link to="/" onClick={() => setRole('customer')} className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full font-bold">ออก</Link>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

