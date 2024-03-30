const express = require('express');
const cors = require('cors');

const router = express.Router();
const Task = require('../models/Task');
router.use(cors());

router.put('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
      // Update the task based on taskId
      const task = await Task.findOneAndUpdate({ taskId: parseInt(taskId, 10) }, req.body, { new: true });

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});


module.exports = router;
