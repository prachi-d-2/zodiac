import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <button onClick={toggleMenu} className="menu-button">
        ☰
      </button>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li><Link to="/loginregister">Login/Register</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/horoscope">Today's Horoscope</Link></li>
        {isLoggedIn && <li><Link to="/connect">Connect</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;
