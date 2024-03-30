const express = require('express');
const cors = require('cors');

const router = express.Router();
const Task = require('../models/Task');
router.use(cors());


// router.delete('/tasks/:taskId', async (req, res) => {
//   const taskId = req.params.taskId;

//     try {
//       const task = await Task.findByIdAndDelete(req.params.taskId);
//       if (!task) {
//         return res.status(404).json({ message: 'Task not found' });
//       }
//       res.json({ message: 'Task deleted successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

router.delete('/tasks/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
      // Delete the task based on taskId
      const task = await Task.findOneAndDelete({ taskId: parseInt(taskId, 10) });

      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;
