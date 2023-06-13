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
import PrivateRoute from './PrivateRoute';
import SHome from '../Pages/Dashboard/Students/SHome';
import SelectedClasses from '../Pages/Dashboard/Students/Classes.jsx/SelectedClasses';
import EnrolledClasses from '../Pages/Dashboard/Students/Classes.jsx/EnrolledClasses';
import Payment from '../Pages/Dashboard/Students/Payments/Payment';
import PaymentHistory from '../Pages/Dashboard/Students/Payments/PaymentHistory';
import MyClasses from '../Pages/Dashboard/Instructors/MyClasses';
import AddClass from '../Pages/Dashboard/Instructors/AddClass';
import InstructorRoute from './InstructorRoute';
import StudentRoute from './StudentRoute';
import AdminRoute from './AdminRoute';
import ManageClasses from '../Pages/Dashboard/Admin/ManageClasses';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';

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
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <Errorpage />,
        children: [
            {
                path: 'home',
                element: <SHome />
            },
            {
                path: 'MyEnrolledClasses',
                element: <StudentRoute><EnrolledClasses /></StudentRoute>
            },
            {
                path: 'MySelectedClasses',
                element: <StudentRoute><SelectedClasses /></StudentRoute>
            },
            {
                path: 'payment',
                element: <StudentRoute><Payment /></StudentRoute>
            },
            {
                path: 'paymentHistory',
                element: <StudentRoute><PaymentHistory /></StudentRoute>
            },
            {
                path: 'MyClasses',
                element: <InstructorRoute><MyClasses /></InstructorRoute>
            },
            {
                path: 'addClass',
                element: <InstructorRoute><AddClass /></InstructorRoute>
            },
            {
                path: 'manageClasses',
                element: <AdminRoute><ManageClasses /></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
        ]
    }, {
        path: 'loading',
        element: <Loading />
    }
])

export default router;