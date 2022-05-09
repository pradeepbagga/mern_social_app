export const messageIstate = null;
export const successMessageIstate = null;

export const messageReducer = (state,action)=>{
    // console.log("MESSAGE REDUCER - ", action);
    if(action.type==="ERROR") {
        return action.payload
    }
    return state;
}

export const successMessageReducer = (state,action)=>{
    // console.log("SUCCESS MESSAGE REDUCER - ", action);
    if(action.type==="SUCCESS") {
        return action.payload
    }
    return state;
}