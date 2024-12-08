import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Horoscope from './components/Horoscope';
import Connections from './components/Connect';
import ArticlePage from './components/ArticlePage'; // Import the ArticlePage component
import Parallax from './components/Parallax'; // Import the Parallax component
import './App.css'; // Ensure overall styling is applied

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage to maintain login state on refresh
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
    }
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Parallax /> {/* Parallax added at the top */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginregister" element={<LoginRegister setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/horoscope" element={<Horoscope />} />
          <Route 
            path="/profile" 
            element={isLoggedIn ? <Profile /> : <Navigate to="/loginregister" replace />} 
          />
          <Route 
            path="/connect" 
            element={isLoggedIn ? <Connections /> : <Navigate to="/loginregister" replace />} 
          />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
