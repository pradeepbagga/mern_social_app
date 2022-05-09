
export const LogoutHandle = (navigate,userDispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    userDispatch({type:"USER_REMOVE",payload:null});
    navigate("/signin");
}