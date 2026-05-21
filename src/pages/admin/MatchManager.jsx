import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Settings, Plus, Trophy, ChevronRight } from 'lucide-react';

const MatchManager = () => {
  const { matches, updateMatchAdmin } = useContext(AppContext);

  return (
    <div className="space-y-6 pb-28">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest">แผงควบคุมหลังบ้านแอดมิน</span>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase mt-0.5">จัดการ <span className="bronze-gradient-text">การแข่งขัน</span></h1>
          <p className="text-xs text-[var(--color-text-muted)] font-semibold mt-1">ตั้งค่าสถานะ, เปิด/ปิดรับผลทาย หรือแก้ไขจัดการคำถาม</p>
        </div>
        
        {/* Placeholder for expansion, styled premium */}
        <button className="btn-bronze px-5 py-2.5 rounded-full flex items-center gap-2 text-xs uppercase tracking-wider transition-all active:scale-95">
          <Plus size={14} className="stroke-[3]" /> เพิ่มการแข่งขัน
        </button>
      </div>

      <div className="space-y-4">
        {matches.map(match => {
          const isOpen = match.status === 'Open';
          const isLocked = match.status === 'Locked';

          return (
            <div 
              key={match.id} 
              className="bg-[var(--color-card)]/80 border border-white/5 rounded-[28px] p-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xl hover:border-white/10 transition-all duration-300"
            >
              {/* Match description */}
              <div className="flex items-center gap-5 flex-1 w-full justify-center lg:justify-start">
                <span className="text-3xl filter drop-shadow">{match.homeFlag}</span>
                <span className="font-extrabold text-white text-base text-right min-w-[80px] truncate">{match.homeTeam}</span>
                <span className="text-xs text-[var(--color-text-muted)] font-black uppercase bg-[var(--color-surface)] border border-white/5 px-2.5 py-1 rounded-full">VS</span>
                <span className="font-extrabold text-white text-base min-w-[80px] truncate">{match.awayTeam}</span>
                <span className="text-3xl filter drop-shadow">{match.awayFlag}</span>
              </div>

              {/* Match Controls */}
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center lg:justify-end">
                <div className="flex items-center gap-2 bg-[var(--color-background)] px-3 py-1.5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider pl-1">สถานะ:</span>
                  <select 
                    value={match.status}
                    onChange={(e) => updateMatchAdmin(match.id, { status: e.target.value })}
                    className="bg-transparent border-0 text-xs font-black text-white focus:outline-none focus:ring-0 cursor-pointer pr-4 uppercase tracking-wider"
                  >
                    <option value="Open" className="bg-[var(--color-background)] text-white">เปิดทายผล (Open)</option>
                    <option value="Locked" className="bg-[var(--color-background)] text-white">ปิดรับคำตอบ (Locked)</option>
                    <option value="Finished" className="bg-[var(--color-background)] text-white">จบแมตช์แล้ว (Finished)</option>
                  </select>
                </div>

                {/* Prediction Open Date & Time Fields */}
                <div className="flex flex-col gap-1.5 bg-[var(--color-card)]/50 px-3.5 py-3 rounded-2xl border border-white/5 min-w-[270px]">
                  <span className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest pl-1 flex items-center gap-1.5">
                    <span>⏳</span> ตั้งเวลาเปิดให้ลูกค้าทายผล
                  </span>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      value={match.predictionOpenDate || ''}
                      onChange={(e) => updateMatchAdmin(match.id, { predictionOpenDate: e.target.value })}
                      className="bg-[var(--color-background)] border border-white/10 focus:border-[var(--color-primary)] focus:shadow-[0_0_10px_rgba(209,161,83,0.15)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all font-bold flex-1 cursor-pointer"
                    />
                    <input 
                      type="time" 
                      value={match.predictionOpenTime || ''}
                      onChange={(e) => updateMatchAdmin(match.id, { predictionOpenTime: e.target.value })}
                      className="bg-[var(--color-background)] border border-white/10 focus:border-[var(--color-primary)] focus:shadow-[0_0_10px_rgba(209,161,83,0.15)] rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all font-bold w-24 cursor-pointer"
                    />
                  </div>
                </div>

                <Link 
                  to={`/admin/matches/${match.id}/questions`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 uppercase tracking-wider active:scale-95"
                >
                  <Settings size={12} className="text-[var(--color-primary)]" />
                  <span>จัดการคำถาม & เฉลยผลคะแนน</span>
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchManager;
