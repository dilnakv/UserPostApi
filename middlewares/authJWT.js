const jwt = require('jsonwebtoken');
const config = require('../config/config');
const db = require('../config/db');
const role = require('../model/role');

const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({message: 'No toekn provided!'});
    }

    jwt.verify(token, config.secretKey, (err, decoded) =>{
        if(err){
            return res.status(401).send({message: 'Unauthorized!'});
        }
        req.userId = decoded.id;
        next();
    });
};

  
module.exports = {
  verifyToken,
};