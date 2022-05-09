import React, { useEffect, useState, useContext } from 'react';
import { GetAllPosts, postLike, postUnLike, PostComment, deletePost, deleteComment } from './Controllers/Post-Controller';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserLS } from '../helpers/helpers';
import { MessageContext, SuccessMessageContext, UserContext } from '../App';

function Home() {
    const [posts, setPosts] = useState([]);
    const { message, dispatch } = useContext(MessageContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    // const { userState } = useContext(UserContext);
    const user = getUserLS();
    // const user = userState;
    // console.log("USER - ", user)

    useEffect(() => {
        GetAllPosts(setPosts);
    }, []);

    return (
        <div>
            <h2>Home Page</h2>
            <div className='home-posts-list'>
                {
                    posts.map((item) => {
                        // console.log("ITEM - ", item);
                        // console.log("USER ABC - ", user);
                        const body = item.body;
                        const postlink = '/post/' + item._id;
                        const unlikeBtn = () => {
                            return (
                                <>
                                    <span onClick={() => postUnLike(item._id, posts, setPosts)}>
                                        <i className="fas fa-thumbs-down"></i> Unlike</span>
                                </>
                            )
                        }
                        const likeBtn = () => {
                            return (
                                <>
                                    <span onClick={() => postLike(item._id, posts, setPosts)}>
                                        <i className="fas fa-thumbs-up" ></i> Like
                                    </span>
                                </>
                            )
                        }
                        const commentBoxShow = (id) => {
                            document.getElementById(id).style.display = "block"
                        }
                        const commentText = (text,id) => {
                            return (
                                <>
                                    <span className="cursor-pointer" onClick={()=>commentListedShow(id)}>
                                        {item.comments.length} {text}
                                    </span>
                                </>
                            )
                        }
                        const commentListedShow = (id) =>{
                            const commentId = 'postcomment-'+id;
                            document.getElementById(commentId).style.display="block"
                        }

                        return (<Card key={item._id}>
                            <Card.Body>
                                <Card.Title><Link to={postlink}>{item.title}</Link>
                                {
                                    item.postedBy._id !== user._id ? null : <i onClick={()=>deletePost(item._id,posts,setPosts,successDispatch)} className="fas fa-trash-alt"></i>
                                }
                                
                                </Card.Title>
                                <Card.Img variant="top" src={item.photo} />
                                <h6>Posted By: <Link to={user.id != item.postedBy._id ? '/profile/'+item.postedBy._id : '/profile'}>{item.postedBy.name}</Link></h6>
                                <Card.Text>{body.slice(0, 200)}...<Link to={postlink}>Read More</Link></Card.Text>
                                <Row>
                                    <Col className='likes-icons'>
                                        <span>
                                            <i className="fas fa-thumbs-up"></i></span> {item.likes.length}
                                    </Col>

                                    <Col className='text-right'>
                                        {item.comments.length > 0 ? commentText('comments',item._id) : commentText('comment')}
                                    </Col>
                                </Row>
                                <Row className="like-comment-row">
                                    <Col>
                                        {
                                            item.likes.includes(user._id) ? unlikeBtn()
                                                : likeBtn()
                                        }
                                    </Col>
                                    <Col><span onClick={() => commentBoxShow(item._id)}><i className="far fa-comment-alt"></i> Comment</span></Col>
                                </Row>
                                <div className="post-comment-box" id={item._id}>
                                    <Form onSubmit={(e) => { PostComment(e, item._id, dispatch, posts, setPosts) }}>
                                        <Form.Control as="textarea" aria-label="With textarea" />
                                        <Button type="submit">Post</Button>
                                    </Form>
                                </div>
                                <Row className="post-comment-list" id={'postcomment-' + item._id}>
                                    {
                                        item.comments.map((comment) => {
                                            const postedById = '/profile/' + comment.postedBy._id;
                                            // console.log("HOME PAGE COMMENT - ", comment)
                                            // console.log("HOME PAGE COMMENT USER - ", user)
                                            return (
                                                <Row key={comment._id}>
                                                    <Col >
                                                        <Link to={user._id == comment.postedBy._id ? '/profile' : '/profile/'+comment.postedBy._id}>{comment.postedBy.name}</Link> &nbsp;{comment.text} &nbsp; 
                                                         { user._id == comment.postedBy._id ? <i onClick={()=>deleteComment(comment._id, posts, setPosts)} className="fas fa-trash-alt cursor-pointer"></i> : null }
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                </Row>


                            </Card.Body>
                        </Card>)
                    })
                }
            </div>

        </div>
    )
}

export default Home;