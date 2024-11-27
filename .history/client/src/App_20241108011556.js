// client/src/App.js
import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import Forum from './components/Forum';
import Profile from './components/Profile';
import Horoscope from './components/Horoscope';
import Connections from './components/Connect';

function App() {
  function App() {
    return (
      <Router>
        <LoginRegister />
      </Router>
    );
  }
  
}

export default App;
