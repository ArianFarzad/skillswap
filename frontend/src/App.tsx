import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import { Welcome } from './components/Welcome';
import NavBar from './components/NavBar';
import Settings from './components/Settings';
import Search from './components/Search';
import ProfilePage from './components/ProfilePage';
import Register from './components/Register';
import Login from './components/Login';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profiles/:userId" element={<ProfilePage />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;