import React from "react";

function AuthLogin(){
    const jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken === 'null') return false
    return true
}

export default AuthLogin

