import React from 'react';

const Button = ({children}) => {
    return (
        <button className='btn border border-[#f55400] text-[#f55400] hover:text-white hover:bg-[#f55400]'>{children}</button>
    );
};

export default Button;