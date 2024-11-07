const express = require('express');
const router = express.Router();
const horoscopeController = require('../controllers/horoscopeController');

// Endpoint to fetch horoscope based on time period (today, week, month, or year)
router.get('/:timePeriod/:sign', horoscopeController.getHoroscopeByTimePeriod);

// Endpoint to fetch daily horoscope based on day (today, yesterday, tomorrow)
router.get('/:sign/:day', horoscopeController.getDailyHoroscope);

module.exports = router;
