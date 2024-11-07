// client/src/services/authService.js

const BASE_URL = 'http://localhost:3000/api/auth'; // Ensure BASE_URL for consistency

// Login function for user authentication
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data; // Return data if login is successful
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

// Register function for user registration
export const register = async (username, email, password, zodiacSign = '') => {
  try {
    if (!username || !email || !password) {
      throw new Error('Please provide username, email, and password');
    }

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, zodiacSign }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data; // Return data if registration is successful
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
};
