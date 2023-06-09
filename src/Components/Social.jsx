import React from 'react';
import useAuth from '../Hooks/useAuth';

const Social = () => {
    const auth = useAuth()
    return (
        <div>
            <p className='mt-px'>If you have already an account?please <Link to={'/login'} className="text-[#f55400]">Login</Link> or Login With</p>

            <button className='btn rounded-full w-[70%] md:w-[55%] text-white bg-[#f55400]'><FaGoogle /></button>
        </div>
    );
};

export default Social;