import { getTokenLS, setUserLS, getUserLS } from '../../helpers/helpers';

export const ProfileController = (id,dispatch,setUserData,setUserPosts)=>{
    // console.log('USER ID - ', id);
    const token = getTokenLS();
    fetch("/api/profile/"+id, {
        method:"get",
        headers: {
            "authorization":"Bearer "+token
        }
    })
    .then(res=>res.json())
    .then(profileResponse=>{
        console.log("Profile Response ", profileResponse);
        if(profileResponse.status==404) {
            dispatch({type:"ERROR", payload:profileResponse.error})
        }
        if(profileResponse.status==200) {
            setUserData(profileResponse.data.user);
            setUserPosts(profileResponse.data.posts)
        }
    })
    .catch(error=>{
        console.log("Profile Response ERROR ", error);
    })
    
}

export const UserPhotoUpload = (e, image, setImageUpload, userDispatch, userid, setUser)=>{
    e.preventDefault();
    // console.log("IMAGE UPLOAD - ", image);
    const token = getTokenLS();
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/pbcloudinary/image/upload';
    const data = new FormData();
    data.append("file",image[0]);
    data.append("upload_preset","mern_app");
    data.append("cloud_name","pbcloudinary");
    fetch(cloudinaryUrl, {
        method:"post",
        body: data
    })
    .then(res=>res.json())
    .then(imageUploadResponse=>{
        console.log("image Upload Response -> ", imageUploadResponse);
        if(imageUploadResponse.url) {
            const imgUrl = imageUploadResponse.url;
            console.log("dksfdl - ", imgUrl);
            fetch("/api/user-image-uploaded", {
                method:"post",
                headers: {
                    "Content-Type":"application/json",
                    "authorization":"Bearer "+token
                },
                body: JSON.stringify({
                    userid: userid,
                    userphoto:imgUrl
                })
            })
            .then(imgRes => imgRes.json())
            .then(imageResponse=>{
                console.log("image Response - ", imageResponse);
                if(imageResponse.status==200) {
                    userDispatch({type:"USER", payload: imageResponse.user })
                    setUserLS(imageResponse.user);
                    setUser(imageResponse.user);
                }
            })
            .catch(err=>{
                console.log("image Response ERROR - ", err);
            })
        }
    })
    .catch(error=>{
        console.log("image Upload Response ERROR -> ", error);
    })
}

export const follow = (id, setUserData, userDispatch)=>{
    console.log("FOLLOW - ", id);
    const token = getTokenLS();
    fetch('/api/follow', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            followUserId:id
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        console.log("FOLLOW RESPONSE -  ", res2);
        if(res2.status===200) {
            setUserData(res2.users.userFollowed);
            userDispatch({type:"USER", payload:res2.users.userFollower});
            setUserLS(res2.users.userFollower);
        }
    })
    .catch(error=>{
        console.log("FOLLOW RESPONSE ERROR -  ", error);
    })
}

export const unfollow = (id, setUserData, userDispatch)=>{
    console.log("UNFOLLOW - ", id);
    const token = getTokenLS();
    fetch('/api/unfollow', {
        method:"post",
        headers: {
            "Content-Type":"application/json",
            "authorization":"Bearer "+token
        },
        body: JSON.stringify({
            unfollowUserId:id
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        console.log("UNFOLLOW RESPONSE -  ", res2);
        if(res2.status===200) {
            setUserData(res2.users.userFollowed);
            userDispatch({type:"USER", payload:res2.users.userFollower});
            setUserLS(res2.users.userFollower);
        }
    })
    .catch(error=>{
        console.log("UNFOLLOW RESPONSE ERROR -  ", error);
    })
}

export const loggedUserUpdate = (userDispatch)=>{
    const user = localStorage.getItem('user');
    const data = JSON.parse(user);
    // console.log("LOGGED IN USER - ", data);
    const token = getTokenLS();
    fetch('/api/logged-user-update', {
        method:"get",
        headers: {
            "authorization":"Bearer "+token
        }
    })
    .then(res=>res.json())
    .then(userResponse=>{
        // console.log("user Response - ", userResponse);
        if(userResponse.status==200) {
            userDispatch({type:"USER", payload:userResponse.user});
            setUserLS(userResponse.user);
        }
    })
    .catch(error=>{
        console.log("user Response ERROR - ", error);
    })
}

export const myPosts = (setMyPosts)=>{
    const user = getUserLS();
    const token = getTokenLS();
    // console.log("DKKD - ", user._id);
    fetch('/api/my-posts', {
        method:"get",
        headers: {
            "authorization":"Bearer "+token
        }
    })
    .then(res=>res.json())
    .then(myposts=>{
        // console.log("MY POSTS - ", myposts.posts);
        if(myposts.status==200) {
            setMyPosts(myposts.posts);
        }
        
    })
    .catch(error=>{
        console.log("MY POSTS ERROR - ", error);
    })
}