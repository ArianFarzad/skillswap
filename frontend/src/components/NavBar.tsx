import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/NavBar.css';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='nav-area'>
      <ul className='list-area'>
        <li className='list-item'>
          <Link to="/profile">Profile</Link>
        </li>
        <li className='list-item'>
          <Link to="/search">Search</Link>
        </li>
        <li className='list-item'>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <p onClick={handleLogout}>Logout</p>
    </nav>
  );
};

export default NavBar;
