const mongoose = require('mongoose');
require('../models/auth-model');
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    // console.log("REQUIRE LOGIN -  ", req.headers);
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(422).json({error:"You must be logged in."})
    }
    const token = authorization.replace("Bearer ","");
    // console.log("TOKEN - ", token);
    jwt.verify(token,process.env.JWTSECURITY, function(err,payload){
        if(err) {
            return res.status(422).json({error:"JWT Token verify error."})
        }
        // console.log("JWT VERIFY - ", payload);
        const {_id} = payload;
        // console.log("JWT VERIFY ID - ", _id);
        User.findById(_id)
        .then(user=>{
            // console.log("USER FIND - ", user);
            req.user = user;
            next();
        })
        .catch(error=>{
            console.log("USER JWT FIND ERROR - ", error);
        })
    })
    
}