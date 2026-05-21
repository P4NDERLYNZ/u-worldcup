import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Calendar, HelpCircle, FileText, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { matches, questions, userAnswers, users } = useContext(AppContext);

  const stats = [
    {
      label: 'จำนวนแมตช์ทั้งหมด',
      value: matches.length,
      icon: <Calendar size={24} className="text-[var(--color-primary)]" />,
      highlight: true
    },
    {
      label: 'จำนวนคำถามทายผลทั้งหมด',
      value: questions.length,
      icon: <HelpCircle size={24} className="text-white" />,
      highlight: false
    },
    {
      label: 'จำนวนการทายผลจากผู้ใช้งาน',
      value: userAnswers.length,
      icon: <FileText size={24} className="text-white" />,
      highlight: false
    },
    {
      label: 'จำนวนผู้เล่นทั้งหมด',
      value: users.length,
      icon: <Users size={24} className="text-white" />,
      highlight: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[var(--color-text-muted)] text-[10px] md:text-xs font-black uppercase tracking-widest">ระบบจัดการควบคุมหลังบ้าน</span>
        <h1 className="text-3xl font-black text-white tracking-tight uppercase mt-0.5">แดชบอร์ด <span className="text-[var(--color-primary)]">แอดมิน</span></h1>
        <p className="text-xs text-[var(--color-text-muted)] font-semibold mt-1">ภาพรวมข้อมูลสถิติแบบเรียลไทม์ของระบบทายผล U-WorldCup</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-[28px] border transition-all duration-300 shadow-xl relative overflow-hidden ${
              stat.highlight 
                ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 shadow-[0_4px_15px_rgba(209,161,83,0.15)]' 
                : 'bg-[var(--color-card)]/80 border-white/5 hover:border-white/10'
            }`}
          >
            {/* Stat Accent Glow */}
            {stat.highlight && (
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full blur-2xl"></div>
            )}
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                {stat.icon}
              </div>
            </div>
            
            <p className={`text-4xl font-black relative z-10 ${stat.highlight ? 'text-[var(--color-primary)]' : 'text-white'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
