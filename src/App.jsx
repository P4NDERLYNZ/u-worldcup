import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import Matches from './pages/Matches';
import MyPredictions from './pages/MyPredictions';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
          <Header />
          <main className="container mx-auto p-4 max-w-4xl pt-20 md:pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/predictions" element={<MyPredictions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
