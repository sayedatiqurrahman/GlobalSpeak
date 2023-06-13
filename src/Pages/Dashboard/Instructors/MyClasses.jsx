import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { VscFeedback } from "react-icons/vsc";
import { FaRegEdit } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useToast from '../../../Hooks/useToast';
import useAuth from '../../../Hooks/useAuth';

const MyClasses = () => {
    const { user } = useAuth()
    const [feedback, setFeedback] = useState()
    const [Toast] = useToast()
    const [axiosSecure] = useAxiosSecure()
    const { data: myClasses = [], refetch } = useQuery({
        queryKey: ['MyClasses'],
        queryFn: async () => {
            const res = await axiosSecure('/MyClasses')
            const data = await res.data
            return data
        }

    })
    const total = myClasses.reduce((sum, item) => item.price + sum, 0);
    console.log(myClasses);

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        axiosSecure.patch(`/updateData/${data._id}`, data)
            .then(response => {
                console.log(response);
                if (response.data.modifiedCount > 0) {
                    Toast.fire({
                        icon: "success",
                        title: "Updated Successfully"
                    })
                }
                // Handle the response data
            })
            .catch(error => {
                console.error(error);
                // Handle the error
            });
    }

    // todo feedback

    return (
        <div className="w-full">

            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="md:text-3xl text-xl">Total Classes: {myClasses.length}</h3>
                <h3 className="md:text-3xl text-xl">Total Price: ${total}</h3>

            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thumbnail</th>
                            <th>Language Name</th>
                            <th>Status</th>
                            <th> Enrolled Students</th>
                            <th>Feedback</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            myClasses.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.languageImage} alt="Language Image" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.foreignLanguageName}
                                </td>
                                <td>
                                    {item.status === "pending" && <button className='btn btn-xs btn-warning'>{item.status}</button> || item.status === "denied" && <button className='btn btn-xs btn-error'>{item.status}</button> || item.status === "approved" && <button className='btn btn-xs btn-success'>{item.status}</button>}
                                </td>
                                <td className="">{item.numberOfStudents}</td>
                                <td> <button className='btn btn-circle border border-[#f55400] text-[#f55400] relative'
                                    onClick={() => {
                                        window.my_modal_1.showModal()
                                        setFeedback(item.feedback && item.feedback)
                                    }}>
                                    {
                                        item.feedback && <div className="badge text-xs bg-[#f55400] text-white absolute -top-2 right-0  gap-2">
                                            01 </div>
                                    }
                                    <VscFeedback size={20} /></button>

                                </td>
                                <td>
                                    <button onClick={() => window.my_modal_2.showModal()} className='btn btn-circle border border-[#f55400] text-[#f55400]'>  <FaRegEdit size={20} /></button>
                                </td>
                                {/* Open the modal using ID.showModal() method */}


                                {/* modal 2 for update data */}
                                <dialog id="my_modal_2" className="modal">
                                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">
                                        <h3 className="font-bold text-lg">Hello! {item.teacherName}</h3>
                                        {/* Start  */}

                                        <div className='bg-base-100 rounded p-4 shadow'>
                                            {/* register your input into the hook by invoking the "register" function */}
                                            <input type="text" className='hidden' value={item._id} {...register("_id")} />


                                            <div className='form-control'>
                                                <div className='w-full'>
                                                    <label className="label">
                                                        <span className="label-text font-semibold ml-2">Update your Thumbnail Link*</span>
                                                    </label>
                                                    <input type="url" defaultValue={item.languageImage} className=" input input-bordered w-full border-[#f55400] rounded-full " accept='image/*' {...register("languageImage")} placeholder='Please Enter Image Link' required />

                                                </div>

                                            </div>


                                            {/* second line */}
                                            <div className="form-control w-full ">
                                                <label className="label">
                                                    <span className="label-text font-semibold ml-2">Language  Name*</span>
                                                </label>
                                                <input {...register("foreignLanguageName")} defaultValue={item.foreignLanguageName} type="text" placeholder="Enter Language Name" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                                            </div>

                                            <div className='form-control w-full'>
                                                <label className="label">
                                                    <span className="label-text font-semibold ml-2">Enrolled Deadline*</span>
                                                </label>
                                                <input type="date" defaultValue={item.courseEnrollDeadline} className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " {...register("courseEnrollDeadline")} required />

                                            </div>
                                            <div className='flex flex-col md:flex-row w-full gap-3'>

                                                <div className="form-control w-full ">
                                                    <label className="label">
                                                        <span className="label-text font-semibold ml-2">Available Seat*</span>
                                                    </label>
                                                    <input defaultValue={item.availableSeat} {...register("availableSeat")} type="number" placeholder="Enter Total Seat" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                                                </div>

                                                <div className="form-control w-full ">
                                                    <label className="label">
                                                        <span className="label-text font-semibold ml-2">Course Price*</span>
                                                    </label>
                                                    <input defaultValue={item.price} {...register("price")} type="number" placeholder="Enter price" className="input rounded-full  border-[#f55400] input-bordered w-full" required />
                                                </div>
                                            </div>

                                            {/* Forth Line */}
                                            <div className='flex gap-3  flex-col lg:flex-row w-full'>
                                                <div className='w-full'>
                                                    <label className="label">
                                                        <span className="label-text font-semibold ml-2">Instructor Email*</span>
                                                    </label>
                                                    <input type="email" value={item.email} {...register("email")} className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " />

                                                </div>
                                                <div className="form-control w-full ">
                                                    <label className="label">
                                                        <span className="label-text font-semibold ml-2">Instructor Name*</span>
                                                    </label>
                                                    <input type="text" value={item.teacherName} className=" pl-4 input input-bordered w-full border-[#f55400] rounded-full " {...register("teacherName")} />
                                                </div>


                                            </div>

                                            <div className="form-control w-full ">
                                                <label className="label">
                                                    <span className="label-text font-semibold ml-2">Details*</span>
                                                </label>
                                                <textarea defaultValue={item.courseDetails} className=" pl-4 textarea textarea-bordered w-full border-[#f55400] rounded-xl " {...register("courseDetails")} placeholder='Enter Course Details' required />
                                            </div>


                                            {/* Submit */}
                                            <input className='btn rounded-full mt-4  text-white hover:text-[#f55400] border bg-[#f55400]   font-semibold w-[70%] md:w-[60%]' type="submit" value='Update Class' />
                                        </div>

                                        {/* end */}

                                    </form>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

            {/* modal 1 for show feedback */}
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box text-center">
                    <h3 className="font-bold text-lg">Hello! {user.
                        displayName}</h3>

                    <div className='bg-base-100 shadow rounded mt-3'>
                        <b>{feedback && "Feedback From Admin"}</b>
                        <p className="py-4 bg-gray-100 ">{!feedback ? "There is no feedback available " : feedback}</p>
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>


        </div>
    );
};

export default MyClasses;