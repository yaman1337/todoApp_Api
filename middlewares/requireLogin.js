const User = require('../models/User');
const {jwt_key} = require('../keys');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({error:"You are not logged in."});
    }
   
    const token = authorization.replace('Bearer ','');
    jwt.verify(token,jwt_key,(err,payload)=>{
        if(err) {
            return res.status(403).json({error:"You are not logged in."});
        }
        const {id} = payload;
        User.findById(id)
        .then(data => {
            req.user = data;
            next();
        })
    }) 
}