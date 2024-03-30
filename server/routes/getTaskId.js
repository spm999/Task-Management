const express = require('express');
const cors = require('cors');

const router = express.Router();
const Task = require('../models/Task');
router.use(cors());

router.get('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
      // Retrieve the task information from the database using the taskId
      const task = await Task.findOne({ taskId: parseInt(taskId, 10) });

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ 
        task,
          message: `Welcome to the task dashboard for Task ID ${taskId}!`,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
