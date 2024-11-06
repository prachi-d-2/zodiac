const express = require('express');
const axios = require('axios');

const router = express.Router();

// Endpoint to fetch daily horoscope based on zodiac sign
router.get('/:sign', async (req, res) => {
  const zodiacSign = req.params.sign;

  try {
    const response = await axios.post(`https://aztro.sameerkumar.website?sign=${zodiacSign}&day=today`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    res.status(500).json({ error: "Failed to fetch horoscope data" });
  }
});

module.exports = router;
