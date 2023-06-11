import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }
    if (!user) {
        return <Navigate to={'/login'} replace/>
    }
    
    return children
        
};

export default PrivateRoute;