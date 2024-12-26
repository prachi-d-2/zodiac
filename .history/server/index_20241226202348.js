require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const postRoutes = require('./routes/forumRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');
const authRoutes = require('./routes/authRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Import your new profile routes

const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3001', // Allow only this domain to make requests
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/horoscope', horoscopeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/profile', profileRoutes); // Add the profile routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
