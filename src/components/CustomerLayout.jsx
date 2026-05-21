import { Outlet, Link } from 'react-router-dom';
import Header from './Header';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16 bg-[var(--color-background)]">
      <Header />
      <main className="container mx-auto p-4 max-w-lg pt-20 md:pt-6">
        <Outlet />
      </main>
    </div>
  );
}
