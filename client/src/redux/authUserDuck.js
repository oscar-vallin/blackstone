import clientAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';
//initial state
const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null,
    fetching: true
};
//our types
const USER_SUCCESS = "USER_SUCCESS"; 
const USER_ERROR = "USER_ERROR"; 
const GET_USER = "GET_USER";

const LOGIN_SUCCES = "LOGIN_SUCCES";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT";


//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCES:
        case USER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {...state, authenticated: true, message: null, fetching: false}
        case GET_USER:
            return {...state, user: action.payload, authenticated: true, fetching: false}    
        case LOGIN_ERROR:    
        case USER_ERROR:    
        case LOG_OUT:
            localStorage.removeItem('token');
            return {...state, token: null, message: action.payload, user: null, authenticated: null, fetching: false}
        default:
            return state;
    }
};
//actions
export const createUserActions =  data => async dispatch => {

    try {
    
        const response = await clientAxios.post('/api/users/', data);
        dispatch({
            type: USER_SUCCESS,
            payload: response.data
        })
        //get user
        authenticatedUserActions()(dispatch);
    } catch (error) {
     
        const alert = {
            msg: error.response.data.msg,
            category: 'alert-error'
        }
        dispatch({
            type: USER_ERROR, 
            payload: alert
        })
    }
};

//returns the authenticated user
export const authenticatedUserActions = () => async dispatch => {
   
    const token = localStorage.getItem('token');

    if(token){
        //send toker for HEADERS
        tokenAuth(token);
    }

    try {
        
        const response = await clientAxios.get('/api/auth');
        //get user
        dispatch({
            type: GET_USER,
            payload: response.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

//user login
export const userLoginAction =  dataUser => async dispatch => {
  
    try {
        
        const response = await clientAxios.post('/api/auth', dataUser);
       
        dispatch({
            type: LOGIN_SUCCES,
            payload: response.data
        })

        //get user
         authenticatedUserActions()(dispatch);
    } catch (error) {
        const alert = {
            msg: error.response.data.msg,
            category: 'alert-error'
        }
        dispatch({
            type: LOGIN_ERROR, 
            payload: alert
        })
    }
}

//Log out user
export const logOutAction = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    })
}