import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import ProtectedRoutes from "./protectedRoutes";
import Dashboard from "../Components/Dashboard";
import Registration from "../Components/Registration";
import Navbar from "../Components/Navbar";
import Task from "../Components/Task";
import CreateTask from "../Components/CreateTask";
import Profile from "../Components/Profile";
import Alert from "../Components/Alert";
import Footer from "../Components/Footer";
import NotFound from "../Components/NotFound";

const RoutesComponent = () =>{
    return(
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path={'/'} element={<Login />} />
                    <Route exact path={'/register'} element={<Registration />} />
                    <Route exact path={'/pageNotFound'} element={<NotFound />} />
                    <Route exact path={'/dashboard'} element={<ProtectedRoutes component={<Dashboard />} />} />
                    <Route exact path={'/task/:id'} element={<ProtectedRoutes component={<Task />} />} />
                    <Route exact path={'/tasks/addTask'} element={<ProtectedRoutes component={<CreateTask />} />} />
                    <Route exact path={'/users/profile'} element={<ProtectedRoutes component={<Profile />} />} />
                    <Route exact path={'*'} element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </>
    )
}


export default RoutesComponent