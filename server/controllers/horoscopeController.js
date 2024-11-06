const axios = require('axios');

// Get Today's Horoscope
const getHoroscope = async (req, res) => {
  const { zodiacSign } = req.params;  // Zodiac sign passed as a URL parameter

  try {
    const response = await axios.get(`https://aztro.sameerkumar.website?sign=${zodiacSign}&day=today`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getHoroscope };
