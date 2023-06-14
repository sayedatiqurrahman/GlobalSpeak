import React from 'react';

import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading';
const MainLay = () => {
    const { loading } = useAuth()
    if (loading) {
        return <Loading />
    }

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLay;