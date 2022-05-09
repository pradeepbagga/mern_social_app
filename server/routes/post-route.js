const express = require('express');
const router = express.Router();
const requireLogin = require('../requireLogin/requireLogin');
const { createpost, allPost, myPost, postLike, postUnlike, getPostById, comment, deletePost, deleteComment, search } = require('../controller/post-controller');

router.post('/createpost',requireLogin,createpost);
router.get('/allposts',requireLogin,allPost);
router.post('/myposts',requireLogin,myPost);
router.post('/like',requireLogin,postLike);
router.post('/unlike',requireLogin,postUnlike);
router.post('/getPost',requireLogin,getPostById);
router.post('/comment',requireLogin,comment);
router.post('/delete-post',requireLogin,deletePost);
router.put('/delete-comment',requireLogin,deleteComment);
router.post('/search',search);

module.exports = router;