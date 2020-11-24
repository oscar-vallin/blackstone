import React from 'react';
import {connect} from 'react-redux';
import Task from './Task';
import {getTaskAction, hideTaskAction} from '../../redux/tasksDuck';

export const ListTask = ({tasks, user, getTask, showTasks, hideTask}) => {

    const getAllTasks = id => {
        getTask(id);
    }
    return(
        <div>
            <h2>Tasks</h2>
            <button onClick={()  => getAllTasks(user._id)} className="btn btn-secundary">Get all our Tasks</button>
            <button onClick={() => hideTask()} className="btn btn-secundary">Hide Tasks</button>
            <ul>
                {tasks.length === 0 && !showTasks
                    ? null
                    : tasks.map(task => (
                        <Task 
                            key={task._id}
                            task={task}
                            user={user}
                        />    
                    ))
                }

            </ul>
        </div>
    )
}
const mapState = state => {
    return{
        tasks: state.task.tasks,
        showTasks: state.task.showTasks,
        user: state.authUser.user
    }
}
export default connect(mapState,  {getTask: getTaskAction, hideTask: hideTaskAction})(ListTask);