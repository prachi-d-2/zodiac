// Import dependencies
const express = require('express');
const cors = require('cors');
const horoscopeRoutes = require('./routes/horoscope'); // Import the horoscope routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Define Routes
app.use('/api/horoscope', horoscopeRoutes);  // Integrate the horoscope route

// Define any other routes you might have (e.g., auth routes)
app.use('/api/auth', require('./routes/authController'));  // Example: auth routes (if you have)

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
