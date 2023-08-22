const db = require('../config/db');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const role = require('../model/role');

const User = db.User;
const Role = db.Role;

module.exports = {
    insertUser,
    login
}

// Create User
async function insertUser(req, res){
    const {email,password,roleName}=req.body;
    Role.findOne({
        where:{
            name: roleName
        }
    }).then(role =>{
        if(!role){
            return res.status(404).send({message: 'Role not found'});
        }
        const user = User.create({ 
            email: email,
            password: bcrypt.hashSync(password, 8),
            roleId: role.id
         });
        res.json(user);
    }).catch(err =>{
        res.status(500).send({ message: err.message });
    });

}

//login user
async function login(req, res){
    const {email, password} = req.body;
    User.findOne({
        where:{
            email:email
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({message: 'User not found'});
        }

        var validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(401).send({accessToken: null, message: 'Invalid password!'});
        }

        const token = jwt.sign({ id: user.id },
            config.secretKey,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        Role.findByPk(user.roleId).then(roles => {
            res.status(200).send({
                id: user.id,
                email: user.email,
                role: roles.name,
                accessToken: token
            });
        });    
    }).catch(err => {
        res.status(500).send({message: err.message});
    })
}