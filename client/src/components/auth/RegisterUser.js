import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {showAlertAction} from '../../redux/alertDuck';
import {createUserActions} from '../../redux/authUserDuck';

const RegisterUser = ({history, alert, showAlert, createUser, message, authenticated}) => {
    //The user has already registered
    useEffect(() => {
        if(authenticated){
           return history.push('/tasks');
        }

        if(message){
           return showAlert(message.msg, message.category);
        }

    },[message, authenticated, history, showAlert]);

    //our state
    const [datesUser, confirmUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    //extract user
    const {name, email, password, confirmPassword} = datesUser;
    //input information
    const onChange = e => confirmUser({...datesUser, [e.target.name]: e.target.value});
    //create account 
    const submit = e => {
        e.preventDefault();

        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
           return showAlert('All inputs are necessary', 'alert-error');
        }
        //create password
        if(password.length < 5) return showAlert('the password has a minimum of 5 characters', 'alert-error');
        //confirm password
        if(password !== confirmPassword) return showAlert('passwords do not match', 'alert-error');
        
        createUser({name, email,password});

    }
    return(
        <div className="form-user">
            {alert ?(<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="container-form">
            <h1>Create Account</h1>

            <form onSubmit={submit}> 
                <div className="camp-form">
                    <label htmlFor="name">User Name</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder="User Name"
                        value={name}
                        onChange={onChange}
                        />
                </div>
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
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={onChange}
                        />
                </div>
                    <input type="submit" className="btn btn-primario btn-block" value="Sign up"/>
            </form>
            
                <Link to={'/'} className="account-link">
                    Log In
                </Link>
            </div>
        </div>
    );
}
const mapState = ({authUser: {token, authenticated, user, message}, alertAuth: {alert}}) => {
    return{
        token,
        authenticated,
        user,
        message,
        alert
    }
}
export default connect(mapState, {showAlert: showAlertAction, createUser: createUserActions})(RegisterUser);