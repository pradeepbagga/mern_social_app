
export const setTokenLS = (token)=>{
    localStorage.setItem("token",token);

}
export const getTokenLS = ()=>{
    const tokenLS = localStorage.getItem("token");
    let token = null;
    if(!tokenLS) {
        return token = null
    }
    else {
        return token = tokenLS;
    }
}

export const setUserLS = (user)=>{
    localStorage.setItem("user", JSON.stringify(user));
}
export const getUserLS = ()=>{
    const userLS = localStorage.getItem("user");
    // console.log("XYZ - ", JSON.parse(userLS))
    let user = null;
    if(!userLS) {
        return user = null
    }
    else {
        return user = JSON.parse(userLS);
    }
}

export const isNotLoggedIn = (navigate)=>{
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const token = localStorage.getItem("token");
    if(user && token) {
        navigate("/");
    }
}