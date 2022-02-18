import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RegisterMovie from './pages/RegisterMovie';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser'


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/Home" exact/>
                <Route element={<Login/>} path="/"/>
                <Route element={<CreateUser/>} path="/create-user"/>
                <Route element={<RegisterMovie/>} path="/register-movie"/>
            </Routes>         
        </BrowserRouter>
    );
}

export default AppRoutes;