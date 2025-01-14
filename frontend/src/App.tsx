import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import WelcomePage from './pages/WelcomePage';
import SearchPage from './pages/SearchPage';
import UserInfosPage from './pages/UserInfosPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profiles/:profileId" element={<UserInfosPage />} />
          <Route path="/chat/:sessionId" element={<Chat />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
