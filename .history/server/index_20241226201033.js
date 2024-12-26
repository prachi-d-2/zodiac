require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // If you're serving files

// Import Routes
const postRoutes = require('./routes/forumRoutes');
const horoscopeRoutes = require('./routes/horoscopeRoutes');
const authRoutes = require('./routes/authRoutes');
const connectionRoutes = require('./routes/connectionRoutes'); // Add the contact route here

const app = express();

// CORS options (allow frontend to communicate with backend)
const corsOptions = {
  origin: 'http://localhost:3001',  // Your frontend URL
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());  // Use bodyParser for parsing JSON

// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Use Routes
app.use('/api/posts', postRoutes); // Forum post routes
app.use('/api/horoscope', horoscopeRoutes); // Horoscope routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/connections', connectionRoutes); // Connection routes (including contact form)

// Serve static files (if any)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
