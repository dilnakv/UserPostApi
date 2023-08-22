const express = require('express');
const { verifyToken } = require('../middlewares/authJWT');
const { createPost, getAllPosts, getAllPostsUser, deletePostById, deleteMyPosts, getPostById } = require('../controllers/postController');
const postRouter = express.Router();

postRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// Create posts
postRouter.post('/', verifyToken, createPost);

//Get my posts
postRouter.get('/my-posts', verifyToken, getAllPosts);

// Get All posts
postRouter.get('/all-posts', verifyToken, getAllPostsUser);

//Get single post
postRouter.delete('/:postId', verifyToken, getPostById);

//Delete all posts
postRouter.delete('/my-posts', verifyToken, deleteMyPosts);

//Delete single post
postRouter.delete('/:postId', verifyToken, deletePostById);



module.exports = postRouter;
