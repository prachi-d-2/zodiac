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
      let data;

      if (isLogin) {
        // Handle login
        data = await login(email, password);
      } else {
        // Handle registration
        data = await register(username, email, password);
      }

      if (data) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);

        // Set user as logged in
        setIsLoggedIn(true);
        
        // Redirect to profile page after successful login/registration
        navigate('/profile');
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
