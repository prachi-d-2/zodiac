const User = require('../models/User');

// Add connection
const addConnection = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) return res.status(404).send('User not found');
    
    // Add to both users' connections
    user.connections.push(targetUserId);
    targetUser.connections.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: 'Connection added' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Remove connection
const removeConnection = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) return res.status(404).send('User not found');

    // Remove from both users' connections
    user.connections = user.connections.filter(id => id !== targetUserId);
    targetUser.connections = targetUser.connections.filter(id => id !== userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: 'Connection removed' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// View connections
const getConnections = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('connections');
    res.status(200).json(user.connections);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { addConnection, removeConnection, getConnections };
