import React, {  useState } from 'react';
import Lottie from "lottie-react";
import registerAnimation from '../../../public/register.json'
import { useForm } from "react-hook-form";
import useToast from '../../Hooks/useToast';
import placeImage from '../../assets/upload.png'

import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//Main function 
const SignUp = () => {
    const [show, setShow] = useState(false)
    const [img, setImg] = useState()
    const [Toast] = useToast()
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {

        console.log(data)
        if (data.password.length <= 6) {
            Toast.fire({
                icon: 'error',
                title: 'Password length must be more then 6 characters'
            })
            return
        }
        if (!/[A-Z]/.test(data.password)) {
            Toast.fire({
                icon: 'error',
                title: 'Password Must be 1 uppercase'
            })
            return
        }
        if (!/[!@#\$%\^\&*_=+-]/.test(data.password)) {
            Toast.fire({
                icon: 'error',
                title: 'Password Must be 1 Special Character'
            })
            return
        }
        if (data.password !== data.ConfirmPassword) {
            Toast.fire({
                icon: 'error',
                title: 'Password & confirm password not matching'
            })
            return
        }
        console.log('confirm password is correct')
        if (data.image.length > 0) {
            const formData = new FormData()
            formData.append('image', data.image[0])

            const api = import.meta.env.VITE_imgbbApiKey
            if (data.image[0]) {

                await fetch(`https://api.imgbb.com/1/upload?key=${api}`, { method: 'POST', body: formData }).then(res => res.json()).then(data => {
                    console.log(data.data.display_url)
                    Toast.fire({
                        icon: 'success',
                        title: 'Registered successfully'
                    })
                })
            }

        }
    };
 

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        const imgLink = URL.createObjectURL(image)
        setImg(imgLink)

    }
    return (
        <div className='MyContainer min-h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center gap-5'>
            <div>
                <div className="h-[500px] w-full">
                    <Lottie className='h-full w-full' animationData={registerAnimation} loop={true} />
                </div>
            </div><div className="divider mx-auto w-28 md:w-2 md:h-28 md:my-auto md:divider-horizontal"></div>
            <div className='md:w-1/2 w-full text-center'>
                <form className='bg-base-100 rounded p-4 shadow' onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className=" form-control rounded-full w-full " >
                        <div className='tooltip tooltip-open tooltip-left' data-tip="Upload Your Image">
                            <img title='Upload Your Image'  className={img ? ' cursor-pointer mx-auto h-28 w-28 rounded-full border border-[#f55400] mb-2 ' : 'cursor-pointer mx-auto h-28 w-28 mb-2'} src={img || placeImage} alt="" />
                        </div>
                        {/* <label className="label ">
                            <span className="label-text font-semibold ml-2">Your image*</span>
                        </label> */}


                        <input type="file" className=" file-input file-input-bordered w-full border-[#f55400] rounded-full" accept='image/*'   {...register("image")} onChange={handleImageChange} />
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Your Full Name*</span>
                        </label>
                        <input {...register("name")} type="text" placeholder="Enter your Name" className="input rounded-full border-[#f55400] input-bordered w-full" required />
                    </div>

                    <div className="form-control mb-2 w-full">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Your Email*</span>
                        </label>
                        <input {...register("email")} type="text" placeholder="Enter your Name" className="input input-bordered rounded-full  border-[#f55400]  w-full" />
                    </div>

                    {/* Password */}

                    <div className="form-control mb-2 w-full">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Password*</span>
                        </label>
                        <div className='relative'>
                            <input {...register("password")} type={show ? "text" : "password"} placeholder="Enter Your Password" className="input input-bordered rounded-full  border-[#f55400]  w-full" />
                            <p onClick={() => setShow(!show)} className='rounded-full hover:bg-slate-300 p-[15px] absolute right-px top-1/2 -translate-y-1/2'>{
                                show ? <FaEyeSlash /> : <FaEye />
                            }</p>
                        </div>
                    </div>

                    <div className="form-control mb-2 w-full">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Confirm Password*</span>
                        </label>
                        <div className='relative'>
                            <input {...register("ConfirmPassword")} type={show ? "text" : "password"} placeholder="Enter Confirm Password" className="input input-bordered rounded-full  border-[#f55400]  w-full" />
                            <p onClick={() => setShow(!show)} className='rounded-full hover:bg-slate-300 p-[15px] absolute right-px top-1/2 -translate-y-1/2'>{
                                show ? <FaEyeSlash /> : <FaEye />
                            }</p>
                        </div>
                    </div>

                    {/* Submit */}
                    <input className='btn rounded-full text-white hover:text-[#f55400] border bg-[#f55400]   font-semibold w-[70%] md:w-[60%]' type="submit" value='Register' />
                </form>

                <p className='mt-px'>If you have already an account?please <Link to={'/login'} className="text-[#f55400]">Login</Link> or Login With</p>

                <button className='btn rounded-full w-[70%] md:w-[55%] text-white bg-[#f55400]'><FaGoogle/></button>
            </div>
        </div>
    );
};

export default SignUp;