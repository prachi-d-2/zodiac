// client/src/services/authService.js

// Login function for user authentication
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); // Returns response as JSON if login is successful
};

// Register function for user registration
const register = async (username, email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/register', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json(); // Returns response as JSON if registration is successful
};

// Named exports for both login and register functions
export { login, register };
