require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // For parsing JSON bodies
const postRoutes = require('./routes/forumRoutes'); // Import forumRoutes

const app = express();

// Enable CORS for frontend on http://localhost:3001
const corsOptions = {
  origin: 'http://localhost:3001',
};
app.use(cors(corsOptions));

// Use bodyParser to handle JSON payloads
app.use(bodyParser.json());  // Express does not automatically parse JSON, so we use bodyParser

// Suppress deprecation warnings for Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB using the MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up routes for posts, horoscope, authentication, and connections
app.use('/api/posts', postRoutes);

const horoscopeRoutes = require('./routes/horoscopeRoutes');
app.use('/api/horoscope', horoscopeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const connectionRoutes = require('./routes/connectionRoutes');
app.use('/api/connections', connectionRoutes);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
