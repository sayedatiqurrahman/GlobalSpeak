import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Social from '../../Components/Social';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import registerAnimation from '../../../public/register.json'
import useAuth from '../../Hooks/useAuth';
import useToast from '../../Hooks/useToast';
const Login = () => {
    const { loginWithEmail } = useAuth()
    const [Toast] = useToast()
    const [show, setShow] = useState(false)
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        // console.log(data);
        if (data.email) {
            loginWithEmail(data.email, data.password).then(data => {
                // console.log(data)
                Toast.fire({
                    icon: 'success',
                    title: ' Login Successfully'
                })

            }).catch(err => {
                Toast.fire({
                    icon: 'error',
                    title: err.message
                })

            })
        }
    }

    return (

        <div className='MyContainer min-h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center gap-5'>
            <div data-aos="fade-left">
                <div className="h-[500px] w-full">
                    <Lottie className='h-full w-full' animationData={registerAnimation} loop={true} />
                </div>
            </div><div className="divider mx-auto w-28 md:w-2 md:h-28 md:my-auto md:divider-horizontal"></div>
            <div data-aos="fade-right" className='md:w-1/2 w-full text-center '>
                <form className='bg-base-100 rounded p-4 shadow' onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}




                    <div className="form-control mb-2 w-full">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Your Email*</span>
                        </label>
                        <input {...register("email")} type="text" placeholder="Enter your Email" className="input input-bordered rounded-full  border-[#f55400]  w-full" required />
                    </div>

                    {/* Password */}

                    <div className="form-control mb-2 w-full">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Password*</span>
                        </label>
                        <div className='relative'>
                            <input {...register("password")} type={show ? "text" : "password"} placeholder="Enter Your Password" className="input input-bordered rounded-full  border-[#f55400]  w-full" required />
                            <p onClick={() => setShow(!show)} className='rounded-full hover:bg-slate-300 p-[15px] absolute right-px top-1/2 -translate-y-1/2'>{
                                show ? <FaEyeSlash /> : <FaEye />
                            }</p>
                        </div>
                    </div>



                    {/* Submit */}
                    <input className='btn rounded-full text-white hover:text-[#f55400] border bg-[#f55400]   font-semibold w-[70%] md:w-[60%]' type="submit" value='Login' />
                </form>

                <p className='my-4'>If you are new here?please <Link to={'/registration'} className="text-[#f55400]">Register</Link> or Login With</p>

                <Social />
            </div>
        </div>

    );
};

export default Login;