
export const SigninHandleSubmit = (e, email, password, setEmail, setPassword, dispatch, successDispatch, setTokenLS, setUserLS, userDispatch, navigate)=>{
    e.preventDefault();
    
    if (!email || !password) {
        // alert("Please fill all fields.");
        dispatch({type:"ERROR", payload:"Please fill all fields."});
        return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // alert("Please enter valid email.")
        dispatch({type:"ERROR", payload:"Please enter valid E-mail."});
        return;
    }
    setEmail("");
    setPassword("");

    fetch('/api/signin', {
        method:"post",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    .then(res=>res.json())
    .then(response=>{
        // console.log("SIGNIN RESPONSE - ",response);

        if(response.error) {
            dispatch({type:"ERROR", payload: response.error})
        }
        if(response.token) {
            setTokenLS(response.token)
        }
        if(response.user) {
            setUserLS(response.user);
            userDispatch({type:"USER", payload:response.user});
            navigate("/");
        }
        // if(response.message) {
        //     successDispatch({type:"SUCCESS", payload: response.message})
        // }
    })
    .catch(error=>{
        console.log("SIGNIN RESPONSE ERROR - ",error);
    })
}

// GOOGLE SIGN IN 
export const responseGoogleHandle = (response,dispatch, navigate, setTokenLS, setUserLS, userDispatch, successDispatch) => {
    // console.log("Google response - ", response);
    if(response.error) {
        dispatch({type:"ERROR",payload:"Please signin again."});
    }
    if(response.accessToken) {
        // console.log("response.accessToken - ", response.profileObj);
        const {email, familyName, givenName } = response.profileObj;
        fetch("/api/google-signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name: givenName + " " + familyName,
                email
            })
        })
        .then(res=>res.json())
        .then(googleSigninResponse=>{
            // console.log("google Signin Response ", googleSigninResponse);
            // console.log("google Signin Response Token ", googleSigninResponse.token);
            // console.log("google Signin Response User ", googleSigninResponse.user);
            if(googleSigninResponse.error) {
                dispatch({type:"ERROR", payload:googleSigninResponse.error})
            }
            if(googleSigninResponse.token) {
                setTokenLS(googleSigninResponse.token);
                successDispatch(({type:"SUCCESS", payload: "Signin successfully."}));
            }
            if(googleSigninResponse.user) {
                setUserLS(googleSigninResponse.user);
                userDispatch({type:"USER", payload:googleSigninResponse.user});
                navigate("/");
            }
        })
        .catch(error=>{
            console.log("google Signin Response ERROR ", error);
        })
    }
}

export const responseFacebookHandle = (response,dispatch, navigate, setTokenLS, setUserLS, userDispatch, successDispatch) => {
    // console.log("FACEBOOK RESPONSE - ", response)
    if(response.accessToken) {
        const {name, email} = response;
        // console.log("name - ", name)
        // console.log("email - ", email);
        fetch("/api/facebook-signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email
            })
        })
        .then(res=>res.json())
        .then(res2=>{
            // console.log("FACEBOOK SIGNIN RESPONSE - ", res2)
            if(res2.error) {
                dispatch({type:"ERROR", payload:res2.error});
            }
            if(res2.token) {
                setTokenLS(res2.token);
                successDispatch(({type:"SUCCESS", payload: "Signin successfully."}));
            }
            if(res2.user) {
                setUserLS(res2.user);
                userDispatch({type:"USER", payload:res2.user});
                navigate("/");
            }
        })
    }
}