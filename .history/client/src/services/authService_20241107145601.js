// client/src/services/authService.js

// Login function for user authentication
export const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {  // Ensure the correct port (3000)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Send email and password to backend
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token in localStorage
    return data; // Returns response as JSON if login is successful
  } catch (error) {
    console.error('Login error:', error.message);
    throw error; // Rethrow error to be handled in the UI
  }
};

// Register function for user registration
export const register = async (name, email, password, zodiacSign = '') => {  // Make zodiacSign optional
  try {
    // Check if all fields except zodiacSign are provided before making the API request
    if (!name || !email || !password) {
      throw new Error('Please provide name, email, and password');
    }

    const response = await fetch('http://localhost:3000/api/auth/register', {  // Correct port (3000)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, zodiacSign }), // Send zodiacSign as an optional field
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Store token in localStorage
    return data; // Return response as JSON if registration is successful
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error; // Rethrow error to be handled in the UI
  }
};

// Clear token from localStorage on logout
export const logout = () => {
  localStorage.removeItem('token');
};
