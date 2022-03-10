import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from '../pages/Home'
import Login from '../pages/Login';
import RegisterMovie from '../pages/RegisterMovie';
import CreateUser from '../pages/CreateUser'
import SessionExpired from '../pages/SessionExpired';


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path="/"/>
                <Route element={<Home/>} path="/home" exact/>               
                <Route element={<CreateUser/>} path="/create-user"/>
                <Route element={<RegisterMovie/>} path="/register-movie"/>
                <Route element={<SessionExpired/>} path="/session-expired"/>
            </Routes>         
        </BrowserRouter>
    );
}

export default AppRoutes;