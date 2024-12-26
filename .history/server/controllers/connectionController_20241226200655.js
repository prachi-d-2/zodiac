const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure to load environment variables

// Contact form submission
const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Set up Nodemailer transporter (using Gmail as an example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your email from .env
        pass: process.env.GMAIL_PASS, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email
      to: 'admin@example.com', // Your email to receive the contact form submissions
      subject: `New Contact Form Message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'There was an issue with your submission. Please try again later.' });
  }
};

module.exports = {
  handleContactForm,
};
