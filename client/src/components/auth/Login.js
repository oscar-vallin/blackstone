import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {showAlertAction} from '../../redux/alertDuck';
import {userLoginAction} from '../../redux/authUserDuck';

const Login = ({history,loginUser, showAlert, authenticated, message,alert}) => {

    useEffect(() => {
        if(authenticated){
            history.push('/tasks');
        }

        if(message){
            showAlert(message.msg, message.category);
        }

    },[message, authenticated, history, showAlert]);

    //our state
    const [user, saveUser] = useState({email: "", password:""});
    //extract user
    const {email, password} = user;
    //input information
    const onChange = e => saveUser({...user,[e.target.name]: e.target.value});
    //log in
    const submit = e => {
        e.preventDefault();

        if(email.trim() === "" || password.trim() === "") {
            return showAlert('All fields are required', 'alert-error');
        }

        loginUser({email, password});
    }

    return(
        <div className="form-user">
            {alert ?(<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="container-form">
            <h1>Log In</h1>
                <form onSubmit={submit}>
                    <div className="camp-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={onChange}
                            />
                    </div>
                    <div className="camp-form">
                        <label htmlFor="password">password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={onChange}
                            />
                    </div>   
                    <div className="camp-form"> 
                        <input type="submit" className="btn btn-primario btn-block" value="Log In"/>
                    </div>
                </form>
            
            <Link to={'/create'} className="account-link">
                Create Account
            </Link>
            </div>
        </div>
    );
}

const mapState = ({authUser: {token, authenticated, user, message}, alertAuth: {alert}}) => {
    return{
        authenticated,
        message,
        alert
    }
}
export default connect(mapState, {showAlert: showAlertAction, loginUser: userLoginAction})(Login);