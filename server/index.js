const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint to fetch horoscope based on zodiac sign and time period (today, week, month, or year)
router.get('/:timePeriod/:sign', async (req, res) => {
  const zodiacSign = req.params.sign.toLowerCase();  // Make the sign lowercase for consistency
  const timePeriod = req.params.timePeriod.toLowerCase(); // 'today', 'week', 'month', or 'year'

  // Valid time periods as per the API documentation
  const validTimePeriods = ['today', 'week', 'month', 'year'];
  
  if (!validTimePeriods.includes(timePeriod)) {
    return res.status(400).json({ error: 'Invalid time period. Please use today, week, month, or year.' });
  }

  try {
    const response = await axios.get(
        `https://horoscope-api.herokuapp.com/horoscope/today/${zodiacSign}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
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
