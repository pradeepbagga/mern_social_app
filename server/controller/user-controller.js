const mongoose = require('mongoose');
// require('../models/auth-model');
// require('../models/auth-model');
const User = mongoose.model('user');
const Post = mongoose.model('post');

exports.profile = (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            user.password = undefined;
            user.provider = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            console.log("USER FIND - ", user);
            Post.find({postedBy:id})
            .then((userPosts)=>{
                if (userPosts) {
                    console.log("userPosts RESPONSE ", userPosts);
                    return res.status(200).json({ status: 200, data : {user:user, posts:userPosts} })
                }
            })
            // if (user) {
            //     console.log("USER RESPONSE ", user);
            //     return res.status(200).json({ status: 200, data: user })
            // }
        })
        .catch(err => {
            console.log("USER RESPONSE ERROR ", err);
            return res.status(404).json({ status: 404, error: "User not found." })
        })
}

exports.userImageUpload = (req, res) => {
    console.log("IMAGE UPLOADED - ", req.body);
    const { userid, userphoto } = req.body;
    User.findByIdAndUpdate(userid, { userphoto: userphoto }, { new: true })
        .exec((err, userPhotoUpdate) => {
            if (err) {
                console.log("USER PHOTO UPDATE ERROR - ", err);
                return res.status(422).json({ status: 422, error: err })
            }
            console.log("user Photo Update success - ", userPhotoUpdate);
            userPhotoUpdate.password = undefined;
            userPhotoUpdate.provider = undefined;
            userPhotoUpdate.createdAt = undefined;
            userPhotoUpdate.updatedAt = undefined;
            return res.status(200).json({ status: 200, user: userPhotoUpdate })
        })
}

exports.follow = (req, res) => {
    console.log("FOLLOW USER ID ", req.body);
    console.log("CURRENT USER ID ", req.user);
    const { followUserId } = req.body;
    User.findByIdAndUpdate(followUserId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    })
        .exec((err, result) => {
            console.log("FOLLOW ERROR - ", err);
            console.log("FOLLOW RESULT - ", result);
            if (result) {
                User.findByIdAndUpdate(req.user._id, {
                    $push: { following: followUserId }
                }, {
                    new: true
                })
                    .exec((err2, result2) => {
                        console.log("FOLLOW ERROR 2 - ", err2);
                        if(err2) {
                            return res.status(422).json({error:err2})
                        }
                        console.log("FOLLOW RESULT 2 - ", result2);
                        if(result2) {
                            console.log("ABC - ", result);
                            console.log("XYZ - ", result2);

                            result.password = undefined;
                            result.updatedAt = undefined;
                            result.createdAt = undefined;
                            result.provider = undefined;

                            result2.password = undefined;
                            result2.updatedAt = undefined;
                            result2.createdAt = undefined;
                            result2.provider = undefined;
                            return res.status(200).json({status:200, users: {
                                userFollowed: result,
                                userFollower: result2
                            }})
                        }
                    })
            }
        })
}

exports.unfollow = (req, res) => {
    console.log("UNFOLLOW USER ID ", req.body);
    console.log("CURRENT USER ID ", req.user);
    const { unfollowUserId } = req.body;
    User.findByIdAndUpdate(unfollowUserId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    })
        .exec((err, result) => {
            console.log("UNFOLLOW ERROR - ", err);
            console.log("UNFOLLOW RESULT - ", result);
            if (result) {
                User.findByIdAndUpdate(req.user._id, {
                    $pull: { following: unfollowUserId }
                }, {
                    new: true
                })
                    .exec((err2, result2) => {
                        console.log("UNFOLLOW ERROR 2 - ", err2);
                        console.log("UNFOLLOW RESULT 2 - ", result2);
                        if(err2) {
                            return res.status(422).json({error:err2})
                        }
                        if(result2) {
                            console.log("ABC - ", result);
                            console.log("XYZ - ", result2);
                            result.password = undefined;
                            result.updatedAt = undefined;
                            result.createdAt = undefined;
                            result.provider = undefined;

                            result2.password = undefined;
                            result2.updatedAt = undefined;
                            result2.createdAt = undefined;
                            result2.provider = undefined;
                            return res.status(200).json({status:200, users: {
                                userFollowed: result,
                                userFollower: result2
                            }})
                        }
                    })
            }
        })
}

exports.loggedUserUpdate = (req,res)=>{
    console.log("logged User Update - ", req.user);
    const user = req.user;
    if(user) {
        user.password = undefined;
        user.provider = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        return res.status(200).json({status:200, user:user})
    }
}

exports.myPosts = (req,res)=>{
    Post.find({postedBy:req.user._id})
    .sort('-createdAt')
    .then(result=>{
        console.log("MY POSTS - ", result)
        if(result) {
            res.status(200).json({status:200, posts:result})
        }
    })
}