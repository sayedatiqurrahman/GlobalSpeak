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
            // console.log(res);
            const user = {
                name: res.user.displayName,
                email: res.user.email,
                role: 'Student'
            }
            fetch('https://summercampgs.vercel.app/user', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
        }).catch(err => console.log(err))
    }
    return (
        <div>


            <button onClick={handleGoogleLogin} className='btn rounded-full w-[70%] md:w-[55%] text-white bg-[#f55400]'><FaGoogle /></button>
        </div>
    );
};

export default Social;