const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Update if necessary

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findById(decoded.id); // Find user by the ID stored in token

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Add user information to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;