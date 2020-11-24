import React from 'react';
import {connect} from 'react-redux';
import {deleteTaskAction, updateTaskAction, getTaskAction, } from '../../redux/tasksDuck';


const Task = ({task, deleteTask, stateTask}) => {

    //delete task for its id
    const deleteTaskId = id => deleteTask(id);
    //change state task
    const changeState = task => {
        if(task.state){
            task.state = false;
        }else{
            task.state = true;
        }
        stateTask(task);
    }
    let date = new Date(task.dueDate)
    let dateTask = date.toDateString()
    
    return(
        <li className="task shadow ">
            <p>{task.name}</p>
            <div className="state">
                {task.state
                    ?(<button onClick={() => changeState(task)} className="complete">Complete</button>)
                    :(<button onClick={() => changeState(task)} className="incomplete">Incomplete</button>)
                }
            </div>
                <div>
                    <label className="deadline">Deadline: </label>
                    <span>{dateTask}</span>
                   
                </div>
            <div className="action">
                <button onClick={() => deleteTaskId(task._id)} className="btn btn-secundary">Delete</button>
            </div>

        </li>
    );
}
const mapState = () => {
    return{
        
    }
}
export default connect(mapState, {deleteTask:deleteTaskAction, stateTask: updateTaskAction, getTask: getTaskAction})(Task);