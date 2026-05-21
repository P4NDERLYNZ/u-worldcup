import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Settings, Plus, ChevronRight } from 'lucide-react';
import { FlagImage } from '../../utils/flagHelper';

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
          return (
            <div 
              key={match.id} 
              className="bg-[var(--color-card)]/80 border border-white/5 rounded-xl shadow-xl hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Main Card Body */}
              <div className="p-4 md:p-5 flex flex-col lg:flex-row justify-between items-center gap-4">
                {/* Match description: Flags and Teams */}
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-1 w-full">
                  <div className="flex items-center gap-3 justify-end w-[42%]">
                    <span className="font-extrabold text-white text-sm sm:text-base truncate">{match.homeTeam}</span>
                    <FlagImage flag={match.homeFlag} countryName={match.homeTeam} className="w-8 h-5.5 sm:w-10 sm:h-7 flex-shrink-0" />
                  </div>
                  
                  <span className="text-[10px] text-[var(--color-text-muted)] font-black bg-[var(--color-surface)] border border-white/5 px-2.5 py-1 rounded-full shadow-inner flex-shrink-0">VS</span>
                  
                  <div className="flex items-center gap-3 justify-start w-[42%]">
                    <FlagImage flag={match.awayFlag} countryName={match.awayTeam} className="w-8 h-5.5 sm:w-10 sm:h-7 flex-shrink-0" />
                    <span className="font-extrabold text-white text-sm sm:text-base truncate">{match.awayTeam}</span>
                  </div>
                </div>

                {/* Match Actions */}
                <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
                  {/* Status Select */}
                  <div className="flex items-center gap-1.5 bg-[var(--color-background)] px-2.5 py-1.5 rounded-lg border border-white/5">
                    <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-wider pl-0.5">สถานะ:</span>
                    <select 
                      value={match.status}
                      onChange={(e) => updateMatchAdmin(match.id, { status: e.target.value })}
                      className="bg-transparent border-0 text-[10px] font-black text-white focus:outline-none focus:ring-0 cursor-pointer pr-4 uppercase tracking-wider p-0"
                    >
                      <option value="Open" className="bg-[var(--color-background)] text-white">เปิดทายผล (Open)</option>
                      <option value="Locked" className="bg-[var(--color-background)] text-white">ปิดรับคำตอบ (Locked)</option>
                      <option value="Finished" className="bg-[var(--color-background)] text-white">จบแมตช์แล้ว (Finished)</option>
                    </select>
                  </div>

                  {/* Manage Questions Button */}
                  <Link 
                    to={`/admin/matches/${match.id}/questions`}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300 uppercase tracking-wider active:scale-95 whitespace-nowrap"
                  >
                    <Settings size={11} className="text-[var(--color-primary)]" />
                    <span>จัดการคำถาม & เฉลยผลคะแนน</span>
                    <ChevronRight size={11} />
                  </Link>
                </div>
              </div>

              {/* Card Footer (Subtle Scheduler bar) */}
              <div className="bg-[var(--color-background)]/40 border-t border-white/5 px-4 md:px-5 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-1.5">
                  <span className="text-xs">⏳</span> ตั้งเวลาเปิดให้ลูกค้าทายผล
                </span>
                
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-[var(--color-text-muted)] uppercase">วันที่:</span>
                    <input 
                      type="date" 
                      value={match.predictionOpenDate || ''}
                      onChange={(e) => updateMatchAdmin(match.id, { predictionOpenDate: e.target.value })}
                      className="bg-[var(--color-background)] border border-white/10 focus:border-[var(--color-primary)] focus:shadow-[0_0_8px_rgba(209,161,83,0.15)] rounded px-2 py-1 text-[9px] text-white focus:outline-none transition-all font-bold cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-[var(--color-text-muted)] uppercase">เวลา:</span>
                    <input 
                      type="time" 
                      value={match.predictionOpenTime || ''}
                      onChange={(e) => updateMatchAdmin(match.id, { predictionOpenTime: e.target.value })}
                      className="bg-[var(--color-background)] border border-white/10 focus:border-[var(--color-primary)] focus:shadow-[0_0_8px_rgba(209,161,83,0.15)] rounded px-2 py-1 text-[9px] text-white focus:outline-none transition-all font-bold cursor-pointer w-18"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchManager;
