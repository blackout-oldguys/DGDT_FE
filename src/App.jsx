import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import RecipientPage from './pages/RecipientPage';
import RecentTradePage from './pages/RecentTradePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipient" element={<RecipientPage />} />
        <Route path="/recent" element={<RecentTradePage />} />
      </Routes>
    </Router>
  );
}

export default App;