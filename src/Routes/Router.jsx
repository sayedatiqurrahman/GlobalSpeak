import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLay from '../LayOuts/MainLay';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Authentication&Authorization/Login';
import SignUp from '../Pages/Authentication&Authorization/SignUp';
import Dashboard from '../LayOuts/Dashboard';
import Loading from '../Components/Loading';
import AllClasses from '../Pages/AllClasses/AllClasses';

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
                path: '/allClasses',
                element: <AllClasses />
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
    }, {
        path: 'loading',
        element: <Loading />
    }
])

export default router;