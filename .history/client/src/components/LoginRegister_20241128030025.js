import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import './LoginRegister.css';

function LoginRegister({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    try {
      const data = isLogin
        ? await login(email, password)
        : await register(username, email, password);

      if (data) {
        setIsLoggedIn(true);
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
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className="toggle-container">
        <p>
          {isLogin ? 'Not a member?' : 'Already a member?'}{' '}
          <span onClick={toggleMode}>{isLogin ? 'Register' : 'Login'}</span>
        </p>
      </div>
    </div>
  );
}

export default LoginRegister;
