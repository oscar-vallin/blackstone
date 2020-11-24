const Task = require('../models/Task');
const {validationResult} = require('express-validator');

//task controller
exports.createTask = async (req,res) => {

    //check erros
    const err = validationResult(req);
    if(!err.isEmpty()) return res.status(400).json({err: err.array()});

    try {
        //create task
        const task = new Task(req.body);

        //save user of the task
        task.creatorUser = req.user.id;
     
        task.save();
  
        res.json(task);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('there is an error');
    }
};

//get all task of current user
exports.getTasks = async(req,res) => {
    try {
        //extract user
        const {user} = req.user.id;
     
        const task = await Task.find({creatorUser: req.user.id});
        res.json({task})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'there is an error'});
    }
};

//update tasks
exports.updateTask = async(req,res) => {

    try {
        //extract task
        const {state} = req.body;
        // is the task exist
        let task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({msg: 'there is no exist task'})
        
        //create an object
        const newTask = {};

        if(state) {
            newTask.state = state;
        }else{
            newTask.state = state;
        }

        //save task 
        task = await Task.findByIdAndUpdate({_id: req.params.id}, newTask, {new: true});

        res.json(task)

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'there is an error'});
    }
};

//delete task
exports.deleteTask = async (req,res) => {

    try {
        // is the task exist
        let task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({msg: 'there is no exist task'})
        
        //delete task
        await Task.findByIdAndRemove({_id: req.params.id});
        res.json({msg: "task deleted"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'there is an error'});
    }
}