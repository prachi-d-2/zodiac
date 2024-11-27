require('dotenv').config({ path: './server/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const postRoutes = require('./routes/forumRoutes');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3001',  // Allow only this domain to make requests
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  // Remove express.json() since bodyParser is already being used

app.use(postRoutes);  // Correct API route registration


// Suppress the deprecation warning for Mongoose
mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));


// Route to fetch horoscope
app.get('/api/horoscope/:sign', async (req, res) => {
  const sign = req.params.sign;
  
  try {
    // Making a POST request to the Aztro API to fetch the horoscope
    const response = await axios.post('https://aztro.sameerkumar.website?sign=' + sign + '&day=today');
    const horoscopeData = response.data;

    // Sending the horoscope data as the response
    res.json({
      sunsign: sign,
      description: horoscopeData.description
    });
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    res.status(500).json({ error: 'Unable to fetch horoscope at the moment' });
  }
});

// Import and use other routes
const horoscopeRoutes = require('./routes/horoscopeRoutes');
app.use('/api/horoscope', horoscopeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const connectionRoutes = require('./routes/connectionRoutes');
app.use('/api/connections', connectionRoutes); // Use the connection routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
