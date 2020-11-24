const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = function(req,res,next){
    //read token of the header
    const token = req.header('x-auth-token');

    //check that there is no token
   
    if(!token) return res.status(401).json({msg: "There is no token"});

    //validation
    try {
        const encryption = jwt.verify(token, keys.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Token is not valid'});
    }
}