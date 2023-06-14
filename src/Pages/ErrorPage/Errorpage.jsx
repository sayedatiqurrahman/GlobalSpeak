import React from 'react';
import Lottie from 'lottie-react'
import errorAnimation from '../../../public/learning.json'
import { Link, useRouteError } from 'react-router-dom';
const Errorpage = () => {
    const error = useRouteError()
    // console.log(error);
    return (
        <div className='text-center'>
            <div className='h-[500px] mx-auto'>
                <Lottie className='h-full' animationData={errorAnimation} loop={true} />
            </div>
            <h1 className='text-5xl font-bold fontB text-[#f55400]'>{error?.status || '404'}</h1>
            <p className='font-bold fontB text-[#f55400]'>{error?.data || 'Unknown Error'} </p>
            <Link to={'/'} className='button' >Back to Home</Link>
        </div>
    );
};

export default Errorpage;