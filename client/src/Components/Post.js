import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GetPostById } from './Controllers/Post-Controller';
import { UserContext } from '../App';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);
    const [postedByLink, setPostedByLink] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const { userState } = useContext(UserContext);
    console.log("USER LOGGED - ", userState)

    useEffect(() => {
        GetPostById(id, setPost);
    }, []);
    useEffect(() => {
        if (post.postedBy) {
            const link = '/profile/' + post.postedBy._id;
            setPostedByLink(link);

            const date = new Date(post.createdAt);
            setCreatedDate(date.toDateString());
        }
    }, [post]);

    return (
        <div className="post-detail">
            <h2>{post.title ? post.title : null}</h2>
            <h6>Posted By: {post.postedBy ? <Link to={userState._id == post.postedBy._id ? '/profile' : '/profile/'+post.postedBy._id}> {post.postedBy.name} </Link> : null}</h6>
            {post.createdAt ? <p>{createdDate}</p> : null }
            <div>
                {
                    post.photo ? <img src={post.photo} title={post.title} alt={post.title} /> : null
                }
            </div>
            <div>
                {
                    post.body ? post.body : null
                }
            </div>
        </div>
    )
}

export default Post;