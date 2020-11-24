import clientAxios from '../config/axios';

//initial state 
const initialState = {
    tasks: [],
    showError: false,
    showTasks: false,
    hideTasks: true
}
//our types
const ADD_TASK = "ADD_TASK";
const ERROR_TASK = "ERROR_TASK";
const DELETE_TASK = "DELETE_TASK";
const STATE_TASK = "STATE_TASK";
const GET_TASK = "GET_TASK";
const HIDE_TASK = "HIDE_TASK";
//client axios

//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_TASK:
            return {...state, tasks: action.payload}
        case HIDE_TASK:
            return {tasks: []}    
        case ADD_TASK:
            return {...state, tasks:[...state.tasks, action.payload], showError: false}
        case ERROR_TASK:
            return {...state, showError: true}  
        case DELETE_TASK: 
            return {...state, tasks: state.tasks.filter(task => task._id !== action.payload)}
        case STATE_TASK:
            return {...state, tasks: state.tasks.map(task => task._id === action.payload._id
                 ? action.payload : task )}     
        default:
            return state;
    }
}

//actions
export const addTaskAction = task => async dispacth => {

    try {
        
        const result = await clientAxios.post('/api/task', task);
        dispacth({
            type: ADD_TASK,
            payload: result.data
        })
    } catch (error) {
        console.log(error);

    }
}
//get taks from DB
export const getTaskAction = user => async dispacth  => {
   
    try {
        const result = await clientAxios.get('/api/task');
     
        dispacth({
            type: GET_TASK,
            payload: result.data.task
        })
    } catch (error) {
        console.log(error)
    }
}
//show error
export const errorTaskAction = () => dispacth => dispacth({type: ERROR_TASK});
//delete task
export const deleteTaskAction = id => async dispacth => {

    try {
        await clientAxios.delete(`/api/task/${id}`)
        dispacth({
            type: DELETE_TASK,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}
// change the status of each task
export const updateTaskAction = task => async dispacth => {

    try {
        const result = await clientAxios.put(`/api/task/${task._id}`, task);
    
        dispacth({
            type: STATE_TASK,
            payload: result.data
        })
        
    } catch (error) {
        console.log(error)
    }
}

//hige task
export const hideTaskAction = () => dispacth => {
    dispacth({
        type: HIDE_TASK,
    })
}

