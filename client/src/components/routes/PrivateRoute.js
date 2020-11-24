import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {authenticatedUserActions} from '../../redux/authUserDuck';

const PrivateRoute = ({authenticated, authenUser, fetching,  component: Component, ...props}) => {

    useEffect(() => {
        authenUser()
    },[]);

    return(
        <Route {...props} render={props => !authenticated && !fetching ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    ) 
}

const mapState = ({authUser: {authenticated, fetching}}) => {
    return{
        authenticated,
        fetching
    }
}
export default connect(mapState, {authenUser: authenticatedUserActions})(PrivateRoute);