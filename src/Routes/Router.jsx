import React from 'react';

import { createBrowserRouter } from "react-router-dom";
import MainLay from '../LayOuts/MainLay';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Authentication&Authorization/Login';
import SignUp from '../Pages/Authentication&Authorization/SignUp';
import Dashboard from '../LayOuts/Dashboard';
import Loading from '../Components/Loading';
import AllClasses from '../Pages/AllClasses/AllClasses';
import AllInstructors from '../Pages/AllInstructors/AllInstructors';
import Classes from '../Pages/Classes/Classes';
import Errorpage from '../Pages/ErrorPage/Errorpage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLay />,
        errorElement: <Errorpage />,
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
                path: '/instructors',
                element: <AllInstructors />
            },
            {
                path: '/classes',
                element: <Classes />
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
        element: <Dashboard />,
        errorElement: <Errorpage />
    }, {
        path: 'loading',
        element: <Loading />
    }
])

export default router;