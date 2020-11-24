import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import taskReducer from './tasksDuck';
import alertReducer from './alertDuck';
import authUserReducer from './authUserDuck';

const rootReducer = combineReducers({
    task: taskReducer,
    alertAuth: alertReducer,
    authUser: authUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}