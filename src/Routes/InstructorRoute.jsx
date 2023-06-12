import React from 'react';
import Loading from '../Components/Loading';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';

const InstructorRoute = () => {
    const [userRole, userRLoading] = useUserRole()
    const { user, loading } = useAuth()

    if (loading || userRLoading) {
        return <Loading />
    }
    if (!user && userRole !== "Instructor") {
        return <Navigate to={'/login'} replace />
    }

    return children
};

export default InstructorRoute;