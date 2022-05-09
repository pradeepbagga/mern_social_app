const express = require('express');
const router = express.Router();
const requireLogin = require('../requireLogin/requireLogin');
const { profile, userImageUpload, follow, unfollow, loggedUserUpdate, myPosts } = require('../controller/user-controller');

router.get('/profile/:id',requireLogin,profile);
router.post('/user-image-uploaded',requireLogin,userImageUpload);
router.post('/follow',requireLogin,follow);
router.post('/unfollow',requireLogin,unfollow);
router.get('/logged-user-update',requireLogin,loggedUserUpdate);
router.get('/my-posts',requireLogin,myPosts);

module.exports = router;