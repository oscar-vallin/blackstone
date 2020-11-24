const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validation
const {validationResult} = require('express-validator');

const keys = require('../config/keys');

//controller user
 exports.createUser = async(req,res) => {
     //check erros
     const err = validationResult(req);
    
     if(!err.isEmpty()) return res.status(400).json({err: err.array()});

     const {email, password} = req.body;

    try {
        //validation
        let user = await User.findOne({email});

        if(user) return res.status(400).json({msg: 'this user already exists'});
        //create user
        user = new User(req.body);
        //hashear password
        const salt = await bcrypt.genSalt(8);
        user.password = await bcrypt.hash(password, salt);
        //save user
        await user.save();
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
        console.log(error);
        res.status(400).json({error: "there is an error"});
    }
 }