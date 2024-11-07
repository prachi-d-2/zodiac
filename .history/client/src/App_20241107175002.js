// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Horoscope from './components/Horoscope';
import Connections from './components/Connect';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage to maintain login state on refresh
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
          {isLoggedIn && <Route path="/connect" element={<Connections />} />}
      </div>
    </Router>
  );
}

export default App;
