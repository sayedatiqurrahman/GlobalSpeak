import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure()
    const { user } = useAuth()
    const [remainSeat, setRemainSeat] = useState()
    const [update, setUpdate] = useState()
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 50)
        setRemainSeat(randomNumber)
    }, [update])

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        setUpdate(!update)
        data.numberOfStudents = remainSeat
        console.log(remainSeat);
        if (data.languageImage.length > 0) {
            const formData = new FormData()
            formData.append('image', data.languageImage[0])

            const api = import.meta.env.VITE_imgbbApiKey
            if (data.languageImage[0]) {

                await fetch(`https://api.imgbb.com/1/upload?key=${api}`, { method: 'POST', body: formData }).then(res => res.json()).then(imgData => {


                    if (imgData.data.display_url) {
                        const { languageImage,
                            foreignLanguageName, teacherName, email, price, numberOfStudents, availableSeat, courseEnrollDeadline, courseDetails, } = data

                        const addData = {
                            languageImage: imgData.data.display_url,
                            foreignLanguageName,
                            teacherImage: user.photoURL,
                            teacherName,
                            email,
                            price,
                            numberOfStudents,
                            availableSeat,
                            courseEnrollDeadline,
                            courseDetails,
                            status: "pending"

                        }
                        axiosSecure.post('/CoursePost', addData).then(res => {
                            console.log(res.data)
                        })
                    }

                })
            }

        }
    }
    return (
        <div className='text-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-base-100 rounded p-4 shadow'>
                {/* register your input into the hook by invoking the "register" function */}
                <div className=" form-control rounded-full  w-full " >



                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div className='w-full'>
                            <label className="label">
                                <span className="label-text font-semibold ml-2">Upload Language Thumbnail*</span>
                            </label>
                            <input type="file" className=" file-input file-input-bordered w-full border-[#f55400] rounded-full " accept='image/*' {...register("languageImage")} required />

                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold ml-2">Language  Name*</span>
                            </label>
                            <input {...register("foreignLanguageName")} type="text" placeholder="Enter Language Name" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                        </div>
                    </div>
                </div>
                {/* second line */}

                <div className='flex gap-3 flex-col lg:flex-row w-full'>
                    <div className='w-full'>
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Enrolled Deadline*</span>
                        </label>
                        <input type="date" className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " {...register("courseEnrollDeadline")} required />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Available Seat*</span>
                        </label>
                        <input {...register("availableSeat")} type="number" placeholder="Enter Total Seat" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Course Price*</span>
                        </label>
                        <input {...register("price")} type="number" placeholder="Enter price" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                    </div>
                </div>


                {/* Third Line */}
                <div className='flex gap-3  flex-col lg:flex-row w-full'>
                    <div className='w-full'>
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Instructor Email*</span>
                        </label>
                        <input type="email" value={user.email} {...register("email")} className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " />

                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold ml-2">Instructor Name*</span>
                        </label>
                        <input type="text" value={user.displayName} className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " {...register("teacherName")} />
                    </div>

                    <input type="number" value={remainSeat}
                        className=" pl-4 input input-bordered w-full hidden  border-[#f55400] rounded-full"
                        {...register("numberOfStudents")}
                    />
                </div>

                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold ml-2">Details*</span>
                    </label>
                    <textarea className=" pl-4 textarea textarea-bordered w-full border-[#f55400] rounded-xl " {...register("courseDetails")} placeholder='Enter Course Details' required />
                </div>


                {/* Submit */}
                <input className='btn rounded-full mt-4  text-white hover:text-[#f55400] border bg-[#f55400]   font-semibold w-[70%] md:w-[60%]' type="submit" value='Add Class' />
            </form>
        </div>
    );
};

export default AddClass;