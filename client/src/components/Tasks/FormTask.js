import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addTaskAction, errorTaskAction} from '../../redux/tasksDuck';

const FormTask = ({ addTask, errorTask, showError}) => {
    //state
    const [task, saveTask] = useState({name:'', dueDate: ''});
    ////extract user
    const {name, dueDate} = task;
    //read form data
    const handleChange = e => saveTask({...task, [e.target.name]: e.target.value});
    const submit = e => {
        e.preventDefault();
        //validation
        if(name.trim() === ''){
            return errorTask();
        }
        //add Task
        addTask(task)
        //clear input
        saveTask({name: '', dueDate: ''});
    }
    return(
        <div className="form">
            <form onSubmit={submit}>
                <div className="container-input">
                    <input 
                        type="text"
                        placeholder="Name Task"
                        className="input-text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        />
                </div>
                <div className="input-date">
                    <label htmlFor="date">Due Date for this Task </label>
                    <input 
                        type="date"
                        id="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={handleChange}
                        />
                </div>
                <div className="container-input">    
                     <input type="submit" value="Add Task" className="btn btn-primario btn-submit btn-block"/>    
                </div>
            </form>
            {showError ? <h3>There is a error</h3>: null}
        </div>
    );
}
const mapState = ({task: {showError, tasks}}) => {
    return{
        showError,
    }
}
export default connect(mapState, {addTask: addTaskAction, errorTask: errorTaskAction})(FormTask);