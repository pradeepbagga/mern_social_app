import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProfileController, follow, unfollow } from './Controllers/Profile-Controller';
import { MessageContext, UserContext } from '../App';
import { getUserLS } from '../helpers/helpers';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';

const Profile = () => {
    const { id } = useParams();
    const { dispatch } = useContext(MessageContext);
    const { userState, userDispatch } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const loggedUser = getUserLS();
    // console.log("Logged User - ", loggedUser);
    console.log("userState - ", userState);
    console.log("userData - ", userData);

    useEffect(() => {
        ProfileController(id, dispatch, setUserData, setUserPosts);
    }, []);

    return (

        <>
            {
                userData ?
                    <><Row className="user-profile">
                        <Col className="text-center">
                            {userData.userphoto === null ? <div className='userphoto'><img src="https://res.cloudinary.com/pbcloudinary/image/upload/v1642757991/mern_app_images/user-image_ldgjxy.jpg" alt="user image" title="user image" /></div>
                                : <div className='userphoto'><img src={userData.userphoto} alt="user image" title="user image" /></div>}
                        </Col>

                        <Col>
                            <p>&nbsp;</p>
                            <h2>{userData.name}</h2>
                            <p>{userData.email}</p>
                            <p><strong>Followers:</strong> {userData.followers.length}
                                <br />
                                <strong>Following:</strong> {userData.following ? userData.following.length : null}
                                <br />
                                <strong>Posts:</strong> {userPosts.length}
                            </p>
                            <p>
                                {
                                    userData.followers.includes(userState._id) ? <Button onClick={() => unfollow(userData._id, setUserData, userDispatch)}>Unfollow</Button>
                                        : <Button onClick={() => follow(userData._id, setUserData, userDispatch)}>Follow</Button>
                                }
                            </p>


                        </Col>
                    </Row>
                        <ListGroup className="user-profile-posts-list">
                            {
                                userPosts.length > 0 ? userPosts.map((item) => {
                                    // console.log("dfsjksdks - ", item);
                                    const body = item.body;
                                    const readMoreLink = '/post/' + item._id;
                                    return (
                                        <ListGroup.Item key={item._id}>
                                            <h5><Link to={readMoreLink}>{item.title}</Link></h5>
                                            <div>{body.slice(0, 200)}...<Link to={readMoreLink}>Read More</Link></div>
                                        </ListGroup.Item>
                                    )
                                })
                                    : null
                            }
                        </ListGroup>
                    </>
                    : <h2>...loading</h2>
            }
        </>
    )
}

export default Profile;