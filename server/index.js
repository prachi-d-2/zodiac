// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const horoscopeRoutes = require('./routes/horoscopeRoutes'); // Import the horoscope routes

const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    // Replace <db-uri> with your MongoDB URI
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/zodiac-connect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Stop the server if MongoDB connection fails
  }
};

// Call the MongoDB connection function
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// Define Routes
app.use('/api/horoscope', horoscopeRoutes);  // Integrate the horoscope route
const authController = require('./controllers/authController');
app.use('/api/auth', authController); // Or another appropriate path


// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
