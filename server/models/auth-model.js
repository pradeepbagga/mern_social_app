const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 40
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 40,
        unique:true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        max: 40
    },
    provider: {
        type: String,
        trim: true,
        default: null
    },
    gender: {
        type: String,
        trim: true,
        default:null
    },
    userphoto: {
        type: String,
        trim: true,
        default:null
    },
    following: [
        {
            type: ObjectId,
            ref:"users"
        }
    ],
    followers: [
        {
            type: ObjectId,
            ref:"users"
        }
    ]
}, { timestamps: true });

mongoose.model("user",userSchema);