import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false);
    navigate('/'); // Redirect to homepage or login page
  };

  return (
    <nav className="navbar">
      <button onClick={toggleMenu} className="menu-button">
        ☰
      </button>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/loginregister">Login/Register</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/horoscope">Today's Horoscope</Link></li>
        {isLoggedIn = true && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connect">Connect</Link></li>
            <li><span onClick={handleLogout} className="logout-link">Log out</span></li>
            <li><span className="logged-in-indicator">Logged in</span></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
