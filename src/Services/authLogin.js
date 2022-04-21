import React from "react";

export default function AuthLogin(){
    const jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken === null || jwtToken === 'null') return false
    return true
}

