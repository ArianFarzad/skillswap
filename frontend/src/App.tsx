import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import WelcomePage from "./pages/WelcomePage";
import Search from './components/Search';
import ProfilePage from './components/ProfilePage';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profiles/:profileId" element={<ProfilePage />} />
          <Route path="/chat/:sessionId" element={<Chat />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
