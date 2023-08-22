const express = require('express');

const userRouter = express();
const {insertUser, login} = require('../controllers/authController');
const { userValidationRules, validate } = require('../validator/userValidator')


userRouter.post('/', userValidationRules(), validate, insertUser);

userRouter.post('/login', login);

module.exports = userRouter;