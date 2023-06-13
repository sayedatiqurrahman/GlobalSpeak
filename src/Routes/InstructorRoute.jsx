import React from 'react';
import Loading from '../Components/Loading';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import useToast from '../Hooks/useToast';
import { Navigate } from 'react-router-dom';

const InstructorRoute = ({ children }) => {
    const [Toast] = useToast()
    const [userRole, userRLoading] = useUserRole()
    const { user, loading, logOut } = useAuth()

    if (loading || userRLoading) {
        return <Loading />
    }
    const Instructor = userRole !== "Instructor"


    if (!Instructor) {
        return children
    } else {
        logOut()
        Toast.fire({
            icon: "error",
            title: "Please Login As a Instructor"
        })
        return <Navigate to={'/login'} replace />
    }
};

export default InstructorRoute;