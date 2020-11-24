//routes for users
const express = require('express');
const routes = express.Router();
const {check} = require('express-validator');

//controller of user
const {createUser} = require('../controller/userControler');

routes.post('/', 
    [
        check('name', 'the name is required').not().isEmpty(),
        check('email', 'add a valid email').isEmail(),
        check('password', 'password must be 5 characters').isLength({min: 5})
    ],
    createUser
)
module.exports = routes;