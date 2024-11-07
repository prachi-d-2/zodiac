const User = require('../models/User');

// Add connection
const addConnection = async (req, res) => {
  const { connectionId } = req.body; 
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
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('connections');
    res.status(200).json(user.connections);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Handle swipe right
const swipeRight = async (req, res) => {
  const { targetUserId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) return res.status(404).send('User not found');

    if (targetUser.swipedRightBy.includes(userId)) {
      // If target user already swiped right, it's a match
      user.connections.push(targetUserId);
      targetUser.connections.push(userId);
      await user.save();
      await targetUser.save();

      return res.status(200).json({ match: true, matchedUser: targetUser });
    }

    // If not a match, save swipe action
    user.swipedRightBy.push(targetUserId);
    await user.save();
    res.status(200).json({ match: false });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { addConnection, removeConnection, getConnections, swipeRight };
