// Load environment variables
require('dotenv').config({ path: './server/.env' });
console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);

// Hardcoded MongoDB URI for Debugging (Fallback)
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://chiq:qwerty24@cluster0.w8aqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const postRoutes = require('./routes/forumRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');
const authRoutes = require('./routes/authRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Initialize the app
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3001', // Allow only this domain to make requests
};
app.use(cors(corsOptions));

// Middleware setup
app.use(bodyParser.json()); // Body parser for JSON payloads

app.use(postRoutes);

// Suppress Mongoose deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully 🚀"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process with failure
  });


// API routes
app.use('/api/posts', postRoutes); // Forum post-related routes
app.use('/api/horoscope', horoscopeRoutes); // Horoscope-related routes
app.use('/api/auth', authRoutes); // Authentication-related routes
app.use('/api/connections', connectionRoutes); // Connection-related routes


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
