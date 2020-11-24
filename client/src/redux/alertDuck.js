
// //initial state
const initialState = {
    alert: null,
}
//our types
const SHOW_ALERT = "SHOW_ALERT";
const HIDE_ALERT = "HIDE_ALERT";
//reducer
export default function reducer(state = initialState, action){
    switch(action.type){
        case SHOW_ALERT: 
            return {alert: action.payload}
        case HIDE_ALERT:
            return {alert: null}    
        default:
            return state;
    }
}
//actions
export const showAlertAction = (msg, category) => dispatch => {
    dispatch({
        type: SHOW_ALERT, 
        payload: {msg,category}
    });

    setTimeout(() => {
        dispatch({
            type: HIDE_ALERT,
        })
    },4000)
};

