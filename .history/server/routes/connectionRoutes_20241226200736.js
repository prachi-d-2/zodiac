const express = require('express');
const router = express.Router();
const { handleContactForm } = require('../controllers/connectionController'); // Import the controller function

// POST route for contact form submission
router.post('/contact', handleContactForm);

module.exports = router;
