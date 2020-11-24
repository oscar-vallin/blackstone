//routes task
const express = require('express');
const routes = express.Router();
const {check} = require('express-validator');
const {createTask, getTasks, updateTask, deleteTask} = require('../controller/taskController');
const auth = require('../middleware/auth');

//create task
routes.post('/',
    auth,
    [
        check('name', 'task name is required').not().isEmpty()
    ],
    createTask
);
//get task
routes.get('/',
    auth,
    getTasks
);
//update task
routes.put('/:id',
    auth,
    updateTask
);
//delete task
routes.delete('/:id',
    auth,
    deleteTask
)
module.exports = routes;