import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AdminLayout() {
  const { role, setRole } = useContext(AppContext);

  if (role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col gap-4">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p>You must be an admin to view this page.</p>
        <button onClick={() => setRole('admin')} className="px-4 py-2 bg-gray-800 rounded">Mock Login as Admin</button>
        <Link to="/" className="text-[var(--color-primary)]">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0A0F0D] text-white font-sans">
      <aside className="w-64 bg-[#111A16] border-r border-[#1A251F] p-6">
        <h1 className="text-2xl font-black mb-8 text-[var(--color-primary)] tracking-widest">U-ADMIN</h1>
        <nav className="space-y-3 font-medium">
          <Link to="/admin" className="block p-3 bg-[#1A251F] hover:bg-[#223028] rounded-xl transition-colors">Dashboard</Link>
          <Link to="/admin/matches" className="block p-3 hover:bg-[#1A251F] rounded-xl transition-colors">Manage Matches</Link>
          <Link to="/" className="block p-3 text-gray-500 hover:text-white mt-8 border-t border-[#1A251F] pt-6">Exit to Customer Site</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
