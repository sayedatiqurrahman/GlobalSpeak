import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    AOS.init();
    return (
        <div>

            <NavBar />

            <Outlet />
            <div data-aos='fade-left'>
                <Footer />
            </div>
        </div>
    );
};

export default MainLay;