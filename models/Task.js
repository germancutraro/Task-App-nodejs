const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  description: {type: String, trim: true, required: true},
  status: {type: Boolean, default: false}
});

module.exports = mongoose.model('task', taskSchema);
