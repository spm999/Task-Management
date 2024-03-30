const express = require('express');
const cors = require('cors');

const router = express.Router();
const Task = require('../models/Task');
router.use(cors());

// Routes for CRUD operations
router.post('/tasks', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


module.exports = router;

