//routes for users
const express = require('express');
const routes = express.Router();
const {check} = require('express-validator');
const {authenticateUser, userAuthenticated} = require('../controller/authControler');
const auth = require('../middleware/auth');

//log in
routes.post('/', 
    authenticateUser
)
//get authenticated user
routes.get('/',
    auth,
    userAuthenticated
)
module.exports = routes;