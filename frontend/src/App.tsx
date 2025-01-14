import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import { Welcome } from './components/Welcome';
import Settings from './components/Settings';
import Search from './components/Search';
import ProfilePage from './components/ProfilePage';
import Register from './components/Register';
import Login from './components/Login';
import BookAppointment from './components/BookAppointment';
import Chat from './components/Chat'; // Importieren der Chat-Komponente

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
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
