import React from 'react';
import Lottie from "lottie-react";
import LoadingAnimation from '../../public/loading.json'
const Loading = () => {
    return (
        <div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className="h-[400px] w-full">
                    <Lottie className='h-full w-full' animationData={LoadingAnimation} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Loading;