// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Horoscope from './components/Horoscope';
import Connections from './components/Connect';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* Navbar displayed at the top of every page */}
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/horoscope" element={<Horoscope />} />
          {/* Render Connections only if the user is logged in */}
          {isLoggedIn && <Route path="/connect" element={<Connections />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
