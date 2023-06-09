import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import { Outlet } from 'react-router-dom';
const MainLay = () => {
    AOS.init();
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLay;