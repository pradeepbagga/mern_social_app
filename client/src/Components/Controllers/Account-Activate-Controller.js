
export const ActivateHandle = (token,dispatch,successDispatch) =>{
    // console.log("TOKEN - ", token);
    fetch("/api/activate-account", {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            token
        })
    })
    .then(res=>res.json())
    .then(response=>{
        console.log("ACCOUNT ACTIVATE RESPONSE - ", response);
        if(response.error) {
            dispatch({type:"ERROR", payload:response.error})
        }
        if(response.message) {
            successDispatch({type:"SUCCESS", payload:response.message})
        }
    })
    .catch(error=>{
        console.log("ACCOUNT ACTIVATE RESPONSE ERROR - ", error)
    })
}