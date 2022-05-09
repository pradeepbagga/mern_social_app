const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new Schema({
    title: {
        type:String,
        trim: true,
        required: true
    },
    body: {
        type:String,
        trim: true,
        required: true
    },
    photo: {
        type:String,
        trim: true
    },
    postedBy: {
        type: ObjectId,
        ref:"user"
    },
    likes: [{type:ObjectId, ref:"user"}],
    comments: [{
        text: { type: String, trim: true},
        postedBy: { type: ObjectId, ref:"user" }
    }]
}, {timestamps:true});

mongoose.model('post',postSchema);