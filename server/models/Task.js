const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['done', 'pending', 'in progress', 'completed'], default: 'pending' }
});

module.exports = mongoose.model('Task', TaskSchema);
