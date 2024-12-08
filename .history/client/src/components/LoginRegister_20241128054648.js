// client/src/components/LoginRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
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
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await register(username, email, password, zodiacSign);
      }

      if (data && data.token) {
        localStorage.setItem('token', token);
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
