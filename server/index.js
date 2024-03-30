const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const cors = require('cors');
const router=require('./router.js');

const app = express();

app.use(router);
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use(bodyParser.json());

// Import route files
const getTasksRoute = require('./routes/getTask');
const getTasksIdRoute = require('./routes/getTaskId');
const addTasksRoute = require('./routes/addTask');
const updateTaskIdRoute = require('./routes/updateTaskId');
const deleteTaskIdRoute = require('./routes/deleteTaskId');

// Use route files
app.use('/', getTasksRoute);
app.use('/', getTasksIdRoute);
app.use('/', addTasksRoute);
app.use('/', updateTaskIdRoute);
app.use('/', deleteTaskIdRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});