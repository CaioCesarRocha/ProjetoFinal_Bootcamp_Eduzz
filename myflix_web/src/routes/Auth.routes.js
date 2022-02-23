import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Login from '../pages/Login';

const AuthRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path="/"/>
                <Route element={<Login/>} path="/create-user"/>
                <Route element={<Login/>} path="/register-movie"/>
            </Routes>         
        </BrowserRouter>
    );

}

export default AuthRoutes;

