import React from 'react';
import Loading from '../Components/Loading';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import useToast from '../Hooks/useToast';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {

    const [Toast] = useToast()
    const [userRole, userRLoading] = useUserRole()
    const { user, loading, logOut } = useAuth()

    if (loading || userRLoading) {
        return <Loading />
    }
    const Student = userRole !== "Student"


    if (!Student) {
        return children
    } else {
        logOut()
        Toast.fire({
            icon: "error",
            title: "Please Login As a student"
        })
        return <Navigate to={'/login'} />
    }
};

export default StudentRoute;