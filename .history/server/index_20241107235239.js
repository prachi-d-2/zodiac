require('dotenv').config({ path: './server/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const postRoutes = require('./routes/forumRoutes');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.use('/api', postRoutes);


// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Import and use routes
const horoscopeRoutes = require('./routes/horoscopeRoutes');
app.use('/api/horoscope', horoscopeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const connectionRoutes = require('./routes/connectionRoutes');
app.use('/api/connections', connectionRoutes); // Use the connection routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
