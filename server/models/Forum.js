const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  title: String,
  content: String,
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Forum', forumSchema);
