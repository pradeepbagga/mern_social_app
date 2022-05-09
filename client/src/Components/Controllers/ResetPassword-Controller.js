
export const ResetPasswordHandleSubmit = (e,email, setEmail, dispatch, successDispatch)=>{
    e.preventDefault();
    console.log("ResetPasswordHandleSubmit");
    if (!email) {
        // alert("Please fill all fields.");
        dispatch({type:"ERROR", payload:"Please fill all fields."});
        return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // alert("Please enter valid email.")
        dispatch({type:"ERROR", payload:"Please enter valid E-mail."});
        return;
    }
    // setEmail("");
    fetch('/api/reset-password', {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        console.log("RESET PASSWORD RESPONSE - ", res2);
        if(res2.status==422) {
            dispatch({type:"ERROR", payload: res2.error});
        }
        if(res2.status==200) {
            successDispatch({type:"SUCCESS", payload: res2.message});
        }
    })
    .catch(error=>{
        console.log("RESET PASSWORD RESPONSE ERROR - ", error);
    })
}

export const NewPasswordHandleSubmit = (e, password, password2, dispatch, successDispatch, token, navigate)=>{
    e.preventDefault();
    if(!password || !password2) {
        dispatch({type:"ERROR", payload: "Please enter Password and Confirm Password"})
        return false;
    }
    if(password != password2) {
        dispatch({type:"ERROR", payload: "Password and Confirm Password must be same."})
        return false;
    }
    fetch('/api/new-password', {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            token,
            password
        })
    })
    .then(res=>res.json())
    .then(res2=>{
        console.log("NEW PASSWORD RESPONSE - ", res2);
        if(res2.status==422) {
            dispatch({type:"ERROR", payload: res2.error})
        }
        if(res2.status==200) {
            successDispatch({type:"SUCCESS", payload: res2.message});
            navigate("/signin")
        }

    })
    .catch(error=>{
        console.log("NEW PASSWORD RESPONSE ERROR - ", error);
    })
}

