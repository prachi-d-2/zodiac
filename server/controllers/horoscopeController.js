const axios = require('axios');

// Function to fetch horoscope based on time period
exports.getHoroscopeByTimePeriod = async (req, res) => {
  const { timePeriod, sign } = req.params;
  const validTimePeriods = ['today', 'week', 'month', 'year'];

  if (!validTimePeriods.includes(timePeriod)) {
    return res.status(400).json({ error: 'Invalid time period. Please use today, week, month, or year.' });
  }

  try {
    const response = await axios.get(`https://horoscope-api.herokuapp.com/horoscope/${timePeriod}/${sign.toLowerCase()}`);
    
    if (!response || !response.data) throw new Error('Empty response data');
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data', details: error.message });
  }
};

// Function to fetch daily horoscope based on specific day (e.g., today, yesterday, tomorrow)
exports.getDailyHoroscope = async (req, res) => {
  const { sign, day } = req.params;
  const validDays = ['today', 'yesterday', 'tomorrow'];

  if (!validDays.includes(day)) {
    return res.status(400).json({ error: 'Invalid day. Please use today, yesterday, or tomorrow.' });
  }

  try {
    const response = await axios.get(`https://aztro.sameerkumar.website?sign=${sign.toLowerCase()}&day=${day}`, {
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    });
    
    if (!response || !response.data) throw new Error('Empty response data');
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch horoscope data', details: error.message });
  }
};
