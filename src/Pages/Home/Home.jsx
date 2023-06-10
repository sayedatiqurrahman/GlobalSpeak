import React from 'react';
import Banner from './bannerSlider/Banner';
import PopularClasses from './PopularClasses/PopularClasses';
import Lottie from "lottie-react";
import mouse from '../../../public/mouse.json'
import PopularInstructor from './PopularInstructor/PopularInstructor';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const Home = () => {

    AOS.init();
    return (
        <div>
            <Banner />
            <div className='h-28 mt-5'>
                <a href="#popularClass">
                    <Lottie className='h-full' animationData={mouse} loop={true} />
                </a>
            </div>
            <div id='popularClass' className='mt-40'><PopularClasses />
            </div>

            <div data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                className='my-[130px] MyContainer'>
                <PopularInstructor />
            </div>
        </div>
    );
};

export default Home;