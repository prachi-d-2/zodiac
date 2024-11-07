require('dotenv').config({ path: './server/.env' });

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDatabaseName';  // Use Atlas URI from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


// Import and apply horoscope routes
const horoscopeRoutes = require('./routes/horoscopeRoutes');
app.use('/api/horoscope', horoscopeRoutes);

// Import and apply auth routes
const authRoutes = require('./routes/authRoutes');  // Import your auth routes
app.use('/api/auth', authRoutes);  // Use the auth routes

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
