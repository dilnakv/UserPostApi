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

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'Admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({message:'Require Admin Role!'});
            return;
        });
    });
};

const isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles =>{
            for(let i=0; i<roles.length; i++){
                if(roles[i].name === 'Moderator'){
                    next();
                    return;
                }
            }
            res.status(403).send({message: 'Require Moderator Role!'});
            return;
        });
    });
};

const isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "Moderator") {
            next();
            return;
          }
  
          if (roles[i].name === "Admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      });
    });
  };
  
  
  module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
  };