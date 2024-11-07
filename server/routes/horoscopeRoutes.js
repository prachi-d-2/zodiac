const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to fetch daily horoscope based on zodiac sign
router.get('/:sign/:day', async (req, res) => {
  const zodiacSign = req.params.sign;
  const day = req.params.day; // 'today', 'yesterday', or 'tomorrow'

  try {
    const response = await axios.get(
      `https://horoscope-api.herokuapp.com/horoscope/${zodiacSign}/${day}`
    );

    // Check and log the response data
    if (!response || !response.data) {
      throw new Error('Empty response data');
    }

    // Send the horoscope data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data', details: error.message });
  }
});

module.exports = router;
