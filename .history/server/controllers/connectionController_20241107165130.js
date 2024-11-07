const User = require('../models/User');

// Add connection
const addConnection = async (req, res) => {
  const { connectionId } = req.body; // Updated to match request from Connect.js
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(connectionId);

    if (!targetUser) return res.status(404).json({ message: 'User not found' });
    
    // Add to both users' connections
    if (!user.connections.includes(connectionId)) user.connections.push(connectionId);
    if (!targetUser.connections.includes(userId)) targetUser.connections.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: 'Connection added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove connection
const removeConnection = async (req, res) => {
  const { connectionId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(connectionId);

    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    // Remove from both users' connections
    user.connections = user.connections.filter(id => id.toString() !== connectionId);
    targetUser.connections = targetUser.connections.filter(id => id.toString() !== userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: 'Connection removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// View connections
const getConnections = async (req, res) => {
  const userId =
