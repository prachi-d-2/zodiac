import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import './LoginRegister.css';

function LoginRegister({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const data = await login(email, password);
        if (data) {
          setIsLoggedIn(true);
          navigate('/profile');
        }
      } else {
        const data = await register(username, email, password);
        if (data) {
          setIsLoggedIn(true);
          navigate('/profile');
        }
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
