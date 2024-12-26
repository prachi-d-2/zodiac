// client/src/components/LoginRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithFirebase, registerWithFirebase } from '../services/authService'; // New services for Firebase
import './LoginRegister.css';

function LoginRegister({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let token;
      if (isLogin) {
        token = await loginWithFirebase(email, password); // Login with Firebase
      } else {
        token = await registerWithFirebase(username, email, password, zodiacSign); // Register with Firebase
      }

      if (token) {
        localStorage.setItem('token', token); // Store token from Firebase
        console.log('Token stored in localStorage:', localStorage.getItem('token'));
        setIsLoggedIn(true);
        navigate('/profile');  // Redirect to profile on success
      }
    } catch (err) {
      setError(isLogin ? 'Login failed! Please check your credentials.' : 'Registration failed! Please try again.');
    }
  };

  return (
    <div className="login-register-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Zodiac Sign (Optional)"
              value={zodiacSign}
              onChange={(e) => setZodiacSign(e.target.value)}
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="toggle-container">
        {isLogin ? (
          <p>
            Not a member? <span onClick={() => setIsLogin(false)}>Register</span>
          </p>
        ) : (
          <p>
            Already a member? <span onClick={() => setIsLogin(true)}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
