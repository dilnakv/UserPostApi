const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const { getUserDetails } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Get user details
userRouter.get('/profile', verifyToken, getUserDetails);

module.exports = userRouter;
