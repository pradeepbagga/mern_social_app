const mongoose = require('mongoose');
require('../models/post-model');
const Post = mongoose.model('post');

exports.createpost = (req, res) => {
    // console.log("createpost - ", req.body);
    const { title, body, imgUrl } = req.body;
    if (!title || !body) {
        return res.status(422).json({ error: "Title and Body must be have text." })
    }
    // console.log("User : ",req.user)
    const post = new Post({
        title,
        body,
        photo: imgUrl,
        postedBy: req.user
    });
    post.save()
        .then(postSaved => {
            postSaved.postedBy.password = undefined;
            postSaved.postedBy.createdAt = undefined;
            postSaved.postedBy.provider = undefined;
            postSaved.postedBy.updatedAt = undefined;
            return res.json({ post: postSaved })
        })
        .catch(error => {
            console.log("Post saved error - ", error)
        })
}

exports.allPost = (req, res) => {
    // const date = new Date();
    Post.find({})
        .populate("postedBy", "name _id")
        .populate("comments.postedBy", "name _id")
        .sort('-createdAt')
        .then(posts => {
            return res.json({ posts })
        })
        .catch(error => {
            console.log("Post find errors - ", error)
        })
}

exports.myPost = (req, res) => {
    console.log("My Post - ", req.user)
    Post.find({ postedBy: req.user })
        .then(posts => {
            return res.json({ posts })
        })
        .catch(error => {
            console.log("Post find errors - ", error)
        })
}

exports.postLike = (req, res) => {
    console.log("dkflsjk - ", req.body)
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "name _id")
        .exec((err, result) => {
            if (err) {
                console.log("POST LIKE ERROR - ", err);
                return res.status(422).json({ error: err })
            }
            else {
                console.log("POST LIKE RESULT - ", result);
                res.status(200).json({status:200, data:result})
            }
        })
}

exports.postUnlike = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    })
    .populate("postedBy", "name _id")
    .populate("comments.postedBy", "name _id")
        .exec((err, result) => {
            if (err) {
                console.log("POST LIKE ERROR - ", err);
                return res.status(422).json({ error: err })
            }
            else {
                res.status(200).json({status:200, data:result})
            }
        })
}

exports.comment = (req,res)=>{
    console.log('COMMENT - ', req.body);
    const { comment, postId } = req.body;
    const commentData = {
        text: comment,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(postId, {
        $push: { comments: commentData }
    }, {
        new: true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy", "name _id")
    .exec((err, result)=>{
        if(err) {
            console.log("POST COMMENT SUBMIT PUSH ERROR ", err);
            return res.status(422).json({status:422, error:err})
        }
        else {
            console.log("POST COMMENT SUBMIT PUSH ", result);
            return res.status(200).json({status:200, data:result})
        }
    })
}


exports.getPostById = (req, res) => {
    console.log("ID - ", req.body);
    const { id } = req.body;
    Post.findById(id)
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "name _id")
        .then(post => {
            // console.log("Post result - ", post);
            return res.status(200).json({ post })
        })
        .catch(error => {
            console.log("POST FIND ERROR ", err);
            return res.status(422).json({ error: "Post not find." })
        })
}

exports.deletePost = (req,res)=>{
    console.log("DElete post - ", req.body);
    const { postId }= req.body;
    Post.findByIdAndRemove(postId, function(err,result){
            console.log("DELETE POST ERROR - ",err);
            console.log("DELETE POST - ",result);
            if(err) {
                return res.status(422).json({status:422, error:err})
            }
            return res.status(200).json({status:200, data:result})
        })
}

exports.deleteComment = (req,res)=>{
    console.log("DELETE COMMENT - - ", req.body.commentId);
    const { commentId } = req.body;
    // const data = {
    //     _id: commentId
    // }
    Post.findOneAndUpdate({"comments._id":commentId}, {
        $pull: { "comments":{_id:commentId} }},
        {new : true}
    )
    .populate("comments.postedBy", "_id name")
    .exec((err,result)=>{
        console.log("COMMENT DELETED ERROR ", err);
        console.log("COMMENT DELETED ", result);
        if(err) {
            return res.status(422).json({status:422, error:err})
        }
        if(result) {
            return res.status(200).json({status:200, data:result})
        }
    })

}

exports.search = (req,res)=>{
    console.log("SEARCH - ", req.body)
}