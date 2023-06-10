import React from 'react';
import useAuth from '../Hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';
import useToast from '../Hooks/useToast';
import { useNavigate } from 'react-router-dom';
const Social = () => {
    const [Toast] = useToast()
    const navigate = useNavigate()
    const { googleLogin } = useAuth()
    const handleGoogleLogin = () => {
        googleLogin().then(res => {
            Toast.fire({
                icon: 'success',
                title: 'Login Successfully'
            })
            navigate('/')
        }).catch(err => console.log(err))
    }
    return (
        <div>


            <button onClick={handleGoogleLogin} className='btn rounded-full w-[70%] md:w-[55%] text-white bg-[#f55400]'><FaGoogle /></button>
        </div>
    );
};

export default Social;