import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { matches, questions, userAnswers, users } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A251F] p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-bold mb-2">Total Matches</h3>
          <p className="text-4xl font-black text-[var(--color-primary)]">{matches.length}</p>
        </div>
        <div className="bg-[#1A251F] p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-bold mb-2">Total Questions</h3>
          <p className="text-4xl font-black text-white">{questions.length}</p>
        </div>
        <div className="bg-[#1A251F] p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-bold mb-2">User Answers</h3>
          <p className="text-4xl font-black text-white">{userAnswers.length}</p>
        </div>
        <div className="bg-[#1A251F] p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-bold mb-2">Total Players</h3>
          <p className="text-4xl font-black text-white">{users.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
