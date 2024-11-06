import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

function HamburgerMenu({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu} className="menu-button">
        ☰
      </button>
      {menuOpen && (
        <div className="menu-items">
          <Link to="/login">Register/Login</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/horoscope">Today's Horoscope</Link>
          {isLoggedIn && <Link to="/connect">Connect</Link>}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
