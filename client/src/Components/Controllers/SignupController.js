

export const SignupHandleSubmit = (e, name, email, password, setName, setEmail, setPassword, dispatch, successDispatch) => {
    e.preventDefault();
    if (!name || !email || !password) {
        // alert("Please fill all fields.");
        dispatch({type:"ERROR", payload:"Please fill all fields."});
        return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        // alert("Please enter valid email.")
        dispatch({type:"ERROR", payload:"Please enter valid E-mail."});
        return;
    }
    setName("");
    setEmail("");
    setPassword("");

    fetch('/api/signup', {
        method:"post",
        headers: {
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    })
    .then(res=>res.json())
    .then(response=>{
        // console.log("SIGNUP RESPONSE - ",response);
        if(response.error) {
            dispatch({type:"ERROR", payload: response.error});
        }
        if(response.message) {
            successDispatch({type:"SUCCESS", payload: response.message})
        }
    })
    .catch(error=>{
        console.log("SIGNUP RESPONSE ERROR - ",error);
    })
}