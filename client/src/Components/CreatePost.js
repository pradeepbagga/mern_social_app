import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CreatePostHandleSubmit, PostHandleSubmit } from './Controllers/Post-Controller';
import { MessageContext, SuccessMessageContext } from '../App';
import { getTokenLS } from '../helpers/helpers';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {message, dispatch} = useContext(MessageContext);
    const {successMessage, successDispatch} = useContext(SuccessMessageContext);

    useEffect(()=>{
        if(imageUrl) {
            PostHandleSubmit(title,body,imageUrl,getTokenLS,setTitle,setBody,successDispatch);
        }
    },[imageUrl]);
    return (
        <>
            <h2>Create Post</h2>
            <Form id="formCreatePost" onSubmit={(e)=>CreatePostHandleSubmit(e, title, body, image, setImageUrl, dispatch)}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Title"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" placeholder="Body"
                      value={body}
                      onChange={(e)=>setBody(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file"
                    onChange={(e)=>setImage(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default CreatePost;