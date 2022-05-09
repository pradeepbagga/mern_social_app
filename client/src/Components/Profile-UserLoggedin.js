import React, { useState, useEffect, useContext } from 'react';
import { getUserLS } from '../helpers/helpers';
import { Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { UserPhotoUpload, loggedUserUpdate, myPosts } from './Controllers/Profile-Controller';
import { deletePost } from './Controllers/Post-Controller';
import { UserContext, SuccessMessageContext } from '../App';
import { Link } from 'react-router-dom';

const ProfileUser = () => {
    const userLS = getUserLS();
    const [user, setUser] = useState(userLS);
    const { userState, userDispatch } = useContext(UserContext);
    const { successDispatch } = useContext(SuccessMessageContext);
    // console.log("USER -  ", user);
    // console.log("USER state -  ", userState);
    const [imageUpload, setImageUpload] = useState("");
    const [mypost, setMyPosts] = useState({});

    useEffect(() => {
        loggedUserUpdate(userDispatch);
        myPosts(setMyPosts);
    }, []);
    useEffect(() => {
        console.log("myposts - ", mypost)
    }, [mypost]);

    return (
        <>
            <Row className="user-profile">
                <Col className="text-center">
                    {user.userphoto === null ? <div className='userphoto'><img src="https://res.cloudinary.com/pbcloudinary/image/upload/v1642757991/mern_app_images/user-image_ldgjxy.jpg" alt="user image" title="user image" /></div>
                        : <div className='userphoto'><img src={user.userphoto} alt="user image" title="user image" /></div>}
                    <div className='image-upload-btns'>
                        <Form>
                            <Form.Control type="file" onChange={(e) => UserPhotoUpload(e, e.target.files, setImageUpload, userDispatch, user._id, setUser)} />
                            <Button>Edit Image</Button>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <p>&nbsp;</p>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p><strong>Followers:</strong> {user.followers.length}
                        <br />
                        <strong>Following:</strong> {user.following.length}
                        <br />
                        <strong>Posts</strong> {mypost.length}
                    </p>
                </Col>
            </Row>
            <hr />
            <ListGroup className="user-profile-posts-list">
                {
                    mypost.length > 0 ? mypost.map((item) => {
                        console.log("dfsjksdks - ", item);
                        const body = item.body;
                        const readMoreLink = '/post/' + item._id;
                        return (
                            <ListGroup.Item key={item._id}>
                                <h5><Link to={readMoreLink}>{item.title}</Link>
                                <i onClick={()=>deletePost(item._id, mypost, setMyPosts, successDispatch)} className="fas fa-trash-alt"></i>
                                </h5>
                                <div>{body.slice(0, 200)}...<Link to={readMoreLink}>Read More</Link></div>
                            </ListGroup.Item>
                        )
                    })
                        : null
                }
            </ListGroup>
        </>
    )
}

export default ProfileUser;