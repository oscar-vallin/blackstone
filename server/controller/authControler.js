const User = require("../models/User");
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');


exports.authenticateUser = async (req,res) => {
    //check erros
    const error = validationResult(req);
    
    if(!error.isEmpty()) return res.status(400).json({error: error.array()});

    //extract email and password
    const {email, password} = req.body;
    
    try {
        //check if user exists
        let user = await User.findOne({email});
    
        if(user === null) {
     
            return res.status(400).json({msg: "The user is not exist"});
        }
        //Confirm Password
        const correctPassword = await bcrypt.compare(password, user.password);
       
        if(!correctPassword) return res.status(400).json({msg: "password incorrect"});

        //create jwt
        const payload = {
            user : {
                id: user.id
            }
        };
        jwt.sign(payload, keys.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            //confirm
            res.json({token})
        });

    } catch (error) {
        console.log(error)
    }
}

//get which user is authenticated
exports.userAuthenticated = async(req,res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'there is an error'});
    }
}