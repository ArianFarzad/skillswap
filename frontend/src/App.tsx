import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import WelcomePage from './pages/WelcomePage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SessionPage from './pages/SessionPage';
import './style/index.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chat/:sessionId" element={<SessionPage />} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
