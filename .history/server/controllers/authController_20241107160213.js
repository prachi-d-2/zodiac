const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Ensure User model exists

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Log the incoming request body for debugging
  console.log('Request Body:', req.body); 

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log(`User already exists with email: ${email}`);
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token for the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token and user data
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in registerUser:', error);  // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Login an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Generate JWT token for the logged-in user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with the token and user data
    res.json({ token, user });
  } catch (error) {
    console.error('Error in loginUser:', error);  // Log the error for debugging
    res.status(500).send('Server error');
  }
};

// Optional logout function
const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Export functions to match the route handler names
module.exports = { registerUser, loginUser, logout };
