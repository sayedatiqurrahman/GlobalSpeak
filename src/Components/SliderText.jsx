import React from 'react';

const SliderText = ({ title, subTitle }) => {
    return (
        <div className='text-center md:text-left'>
            <h1 className='text-5xl font-bold fontB'>{title}</h1>
            <hr className='border border-[#f55400] w-28 md:-mt-2 mx-auto  md:mx-0'></hr>
            <p className='my-2 w-[90%] max-w-md'>{subTitle}</p>
        </div>
    );
};

export default SliderText;