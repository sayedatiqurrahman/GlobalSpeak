import React from 'react';

const SectionTItle = ({ title, subTitle }) => {
    return (
        <div className='text-center MyContainer'>
            <p>{subTitle}</p>
            <hr className='max-w-md rounded-full mx-auto border-2 border-[#f55400] mb-2' />
            <h1 className='fontB text-4xl'>----{title}----</h1>
            <hr className='max-w-md rounded-full mx-auto border-2 border-[#f55400]' />
        </div>
    );
};

export default SectionTItle;