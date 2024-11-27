import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Horoscope from './components/Horoscope';
import Connections from './components/Connections';
import ArticlePage from './components/ArticlePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginregister" element={<LoginRegister setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/loginregister" replace />} />
          <Route path="/connect" element={isLoggedIn ? <Connections /> : <Navigate to="/loginregister" replace />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/loginregister">Login/Register</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/horoscope">Today's Horoscope</Link></li>
        {isLoggedIn && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/connect">Connect</Link></li>
            <li><span onClick={handleLogout} className="logout-link">Log out</span></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;