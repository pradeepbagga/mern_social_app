
export const userIstate = null;

export const userReducer = (state,action) => {
    // console.log("USER REDUCER ACTION - ", action);
    if(action.type==="USER") {
        return action.payload;
    }
    if(action.type==="USER_REMOVE") {
        return action.payload;
    }
    return state;
}