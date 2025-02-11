import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import WelcomePage from './pages/WelcomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SessionPage from './pages/SessionPage';
import OtherUserProfilePage from './pages/OtherUserProfilePage.tsx';
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
            <Route path="/chat/:sessionId" element={<SessionPage />} />
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/profile/:profileId"
              element={<OtherUserProfilePage />}
            />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
