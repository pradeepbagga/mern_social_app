import { getTokenLS } from '../../helpers/helpers';

export const CreatePostHandleSubmit = (e, title, body, image, setImageUrl, dispatch)=>{
    e.preventDefault();
    // console.log("BODY - ", body);
    if(!title || !body || !image) {
        dispatch({type:"ERROR", payload: "Please fill all fields."})
        return false;
    }
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/pbcloudinary/image/upload';
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","mern_app");
    data.append("cloud_name","pbcloudinary");
    fetch(cloudinaryUrl, {
        method:"post",
        body: data
    })
    .then(res=>res.json())
    .then(imageUploadResponse=>{
        // console.log("image Upload Response -> ", imageUploadResponse);
        if(imageUploadResponse.url) {
            setImageUrl(imageUploadResponse.url);
        }
    })
    .catch(error=>{
        console.log("image Upload Response ERROR -> ", error);
    })
}

export const PostHandleSubmit = (title,body,imageUrl,getTokenLS,setTitle,setBody,successDispatch)=>{
    const token = getTokenLS();
    fetch("/api/createpost", {
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            title,
            body,
            imgUrl:imageUrl
        })
    })
    .then(res=>res.json())
    .then(postResponse=>{
        setTitle("");
        setBody("");
        document.getElementById("formCreatePost").reset();
        // console.log("Post Response ", postResponse);
        if(postResponse.post) {
            successDispatch({type:"SUCCESS", payload:"Post Submit successfully."})
        }

    })
    .catch(error=>{
        // console.log("Post Response ERROR ", error);
    })
}

export const GetAllPosts = (setPosts)=>{
    const token = getTokenLS();
    fetch("/api/allposts", {
        method:"get",
        headers: {
            "authorization":"Bearer "+token
        }
    })
    .then(res=>res.json())
    .then(res2=>{
        // console.log("FETCH ALL POSTS - ", res2.posts);
        setPosts(res2.posts);
    })
    .catch(error=>{
        console.log("FETCH ALL POSTS ERROR - ", error);
    })
}

export const GetPostById = (id, setPost)=>{
    const token = getTokenLS();
    // console.log("GetPostById - ", id);
    fetch("/api/getPost", {
        method:"post",
        headers: {
            "authorization":"Bearer "+token,
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            id
        })
    })
    .then(res=>res.json())
    .then(postResponse=>{
        // console.log("GET SPECIFICE POST RESPONSE - ", postResponse.post);
        if(postResponse.post) {
            setPost(postResponse.post)
        }
    })
    .catch(error=>{
        console.log("GET SPECIFICE POST RESPONSE ERROR - ", error);
    })
}

export const postLike = (postId, posts, setPosts)=>{
    const token = getTokenLS();
    fetch("/api/like", {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            postId
        })
    })
    .then(res=>res.json())
    .then(postLikeResponse=>{
        // console.log("post Like Response - ", postLikeResponse.data._id);
        if(postLikeResponse.status===200) {
            const newData = posts.map((item)=>{
                if(postLikeResponse.data._id==item._id) {
                    return postLikeResponse.data
                }
                else {
                    return item
                } 
            });
            setPosts(newData);
        }
    })
    .catch(error=>{
        console.log("post Like Response ERROR - ", error);
    })
}

export const postUnLike = (postId, posts, setPosts)=>{
    const token = getTokenLS();
    fetch("/api/unlike", {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            postId
        })
    })
    .then(res=>res.json())
    .then(postUnLikeResponse=>{
        // console.log("post UNLike Response - ", postUnLikeResponse);
        if(postUnLikeResponse.status===200) {
            const newData = posts.map((item)=>{
                if(postUnLikeResponse.data._id==item._id) {
                    return postUnLikeResponse.data
                }
                else {
                    return item
                } 
            });
            setPosts(newData);
        }
    })
    .catch(error=>{
        console.log("post UNLike Response ERROR - ", error);
    })
}

export const PostComment = (e, postId, dispatch, posts, setPosts)=>{
    e.preventDefault();
    const token = getTokenLS();
    console.log('Comment - ', e.target.elements[0].value);
    const comment = e.target.elements[0].value;
    if(!comment) {
        dispatch({type:"ERROR", payload:"Please fill comment box before submit"});
        return false;
    }
    fetch("/api/comment", {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            postId,
            comment
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        // console.log("COMMENT RESPONSE ", res2);
        if(res2.status===200) {
            const postUpdates = posts.map((item)=>{
                if(res2.data._id==item._id) {
                    return res2.data
                }
                else {
                    return item
                }
            });
            setPosts(postUpdates);
        }
    })
    .catch(err=>{
        console.log("COMMENT RESPONSE ERROR ", err);
    })
}

export const deletePost = (postId,posts,setPosts,successDispatch)=>{
    const token = getTokenLS();
    // console.log("DElete - ", postId);
    fetch('/api/delete-post', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            postId
        })
    })
    .then(res=>res.json())
    .then(postDeleteResponse=>{
        // console.log("Post Delete Response ", postDeleteResponse);
        if(postDeleteResponse.status==200) {
            const newData = posts.filter((item)=>{
                if(item._id != postDeleteResponse.data._id) {
                    return item
                }
            });
            setPosts(newData);
            successDispatch({type:"SUCCESS", payload:"Post deleted successfully."})
        }
    })
    .catch(error=>{
        console.log("Post Delete Response ERROR ", error);
    })
}

export const deleteComment = (id, posts, setPosts)=>{
    // console.log("delete Comment - ", id);
    const token = getTokenLS();
    fetch('/api/delete-comment', {
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            commentId: id
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        // console.log("COMMENT DELETE RESPONSE - ", res2);
        if(res2.status==200) {
            // console.log("XYZ ABC - ", posts)
            const newData = posts.map((item)=>{
                // console.log("XYZ ABC - ", item)
                if(res2.data._id == item._id) {
                    return res2.data;
                }
                else {
                    return item;
                }
            });
            setPosts(newData);
        }
    })
    .catch(error=>{
        console.log("COMMENT DELETE RESPONSE ERROR - ", error);
    })
}