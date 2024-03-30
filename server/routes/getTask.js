const express = require('express');
const cors = require('cors');

const router = express.Router();
const Task = require('../models/Task');
router.use(cors());

router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
