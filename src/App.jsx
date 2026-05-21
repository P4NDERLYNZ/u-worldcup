import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';

// Customer Pages
import Home from './pages/Home';
import Matches from './pages/Matches';
import MyAnswers from './pages/customer/MyAnswers';
import Leaderboard from './pages/Leaderboard';
import MatchPrediction from './pages/customer/MatchPrediction';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import MatchManager from './pages/admin/MatchManager';
import QuestionManager from './pages/admin/QuestionManager';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes (Front Office) */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="matches" element={<Matches />} />
            <Route path="matches/:matchId" element={<MatchPrediction />} />
            <Route path="predict/:matchId" element={<MatchPrediction />} />
            <Route path="my-answers" element={<MyAnswers />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>

          {/* Admin Routes (Back Office) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="matches" element={<MatchManager />} />
            <Route path="matches/:matchId/questions" element={<QuestionManager />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
