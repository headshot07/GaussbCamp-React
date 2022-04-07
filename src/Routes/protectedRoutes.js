import React from "react";
import { Navigate } from 'react-router-dom';
import AuthLogin from '../Services/authLogin';

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    let isLoggedIn = AuthLogin()
    return isLoggedIn ? Component : <Navigate to="/" />;
}

export default ProtectedRoutes