import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RegisterMovie from './pages/RegisterMovie';


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" exact/>
                <Route element={<RegisterMovie/>} path="/register-movie"/>
            </Routes>         
        </BrowserRouter>
    );
}

export default AppRoutes;