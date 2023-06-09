import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLay from '../LayOuts/MainLay';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Authentication&Authorization/Login';
import SignUp from '../Pages/Authentication&Authorization/SignUp';
import Dashboard from '../LayOuts/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLay />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <SignUp />
            }

        ]
    }, {
        path: '/dashboard',
        element: <Dashboard />
    }
])

export default router;