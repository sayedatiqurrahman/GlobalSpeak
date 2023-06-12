import React from 'react';
import Loading from '../Components/Loading';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRoute = () => {
    const [userRole, userRLoading] = useUserRole()
    const { user, loading } = useAuth()

    if (loading || userRLoading) {
        return <Loading />
    }
    if (!user && userRole !== "Admin") {
        return <Navigate to={'/login'} replace />
    }

    return children
};

export default AdminRoute;