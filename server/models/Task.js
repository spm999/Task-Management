const mongoose = require('mongoose');

// Define task schema
const TaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000), // generate a random 4-digit number
    required: true,
  },
  title: String,
  description: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  category: String,
});

module.exports = mongoose.model('Task', TaskSchema);