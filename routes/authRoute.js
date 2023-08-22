const express = require('express');

const userRouter = express();
const {insertUser, login} = require('../controllers/authController');
const { userValidationRules, validate } = require('../validator/userValidator')

//Sign up
userRouter.post('/', userValidationRules(), validate, insertUser);

//login
userRouter.post('/login', login);

module.exports = userRouter;