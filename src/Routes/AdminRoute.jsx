import React from 'react';
import Loading from '../Components/Loading';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useToast from '../Hooks/useToast';

const AdminRoute = ({ children }) => {
    const [userRole, userRLoading, uerRoleRefetch] = useUserRole()
    const { logOut, loading } = useAuth()
    const [Toast] = useToast()
    if (loading || userRLoading) {
        return <Loading />
    }
    uerRoleRefetch()

    if (!userRLoading) {
        const admin = userRole === "Admin"
        if (admin) {
            return children
        } else {
            logOut()
            Toast.fire({
                icon: "error",
                title: "You are not an administrator"
            })
            return <Navigate to={'/login'} />
        }
    }
};

export default AdminRoute;