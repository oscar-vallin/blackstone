import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {logOutAction, authenticatedUserActions} from '../../redux/authUserDuck';

const Header = ({user, logOut, dataUser}) => {
    
    useEffect(() => {
        dataUser();
    },[]);

    return(
        <header className="app-header">
            {user ? <p className="user-name">Hello <span>{user.name}</span></p>: null}

            <nav className="main-nav">
                <button onClick={() => logOut()} className="btn btn-blank sign-off">Log Out</button>
            </nav>
        </header>
    );
}

const mapState = ({authUser: {user}}) => {
    return{
        user
    }
}
export default connect(mapState, {logOut: logOutAction, dataUser: authenticatedUserActions})(Header);
