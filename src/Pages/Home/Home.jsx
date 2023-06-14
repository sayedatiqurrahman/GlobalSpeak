import React from 'react';
import Banner from './bannerSlider/Banner';
import PopularClasses from './PopularClasses/PopularClasses';
import Lottie from "lottie-react";
import mouse from '../../../public/mouse.json'
import PopularInstructor from './PopularInstructor/PopularInstructor';
// You can also use <link> for styles
import Testimonial from './Testimonial/Testimonial';

const Home = () => {

    return (
        <div className='w-full'>
            <Banner />
            <div className='h-28 mt-5'>
                <a href="#popularClass">
                    <Lottie className='h-full' animationData={mouse} loop={true} />
                </a>
            </div>


            <div
                id='popularClass' className='mt-40 MyContainer'><PopularClasses />
            </div>


            <div
                className='my-[130px] MyContainer'>
                <PopularInstructor />
            </div>

            <div
                className='my-[130px] MyContainer'
            >
                <Testimonial />
            </div>

        </div>
    );
};

export default Home;