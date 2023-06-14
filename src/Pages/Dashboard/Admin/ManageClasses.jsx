import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { VscFeedback } from 'react-icons/vsc';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useToast from '../../../Hooks/useToast';
import { BsFillSendCheckFill } from 'react-icons/bs'

const ManageClasses = () => {
    const { register, handleSubmit } = useForm();
    const [Toast] = useToast()
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['manageClasses'],
        queryFn: async () => {
            const res = await axiosSecure('/manageClasses')
            const data = await res.data
            return data
        }
    })

    console.log(classes);



    // handle button disabled or updating status

    const handleDenied = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Deny This Item!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deny it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newStatus = { status: "denied" }
                axiosSecure.patch(`/updateStatus/${id}`, newStatus).then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire(
                            'Denied!',
                            'You are successfully denied.',
                            'success'
                        )
                    }
                })


            }
        })
    }

    const handleApproved = (id) => {
        // console.log(id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Approve This Item!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve it!'
        }).then((result) => {
            if (result.isConfirmed) {

                const newStatus = { status: "approved" }
                axiosSecure.patch(`/updateStatus/${id}`, newStatus).then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire(
                            'Approved!',
                            'successfully Approved.',
                            'success'
                        )
                    }
                })
            }
        })
    }

    const [itemId, setItemId] = useState('')
    const onSubmit = async (data) => {
        // console.log(data);
        // console.log(itemId);

        axiosSecure.put(`/feedback/${itemId}`, data).then(res => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
                Toast.fire({
                    icon: "success",
                    title: "Feedback Successful"
                })
            }
        })

    }


    return (
        <div className="w-full">

            <div className="uppercase font-semibold h-[60px] flex items-center">
                <h3 className="md:text-3xl text-xl">Total Classes: {classes.length}</h3>


            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class name</th>
                            <th> Instructor name</th>
                            <th>  Instructor email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            classes.map((item, index) =><tr
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
                                        {item.teacherName}
                                    </td>

                                    <td>
                                        {item.email}
                                    </td>
                                    <td className="">{item.availableSeat}</td>
                                    <td className="">{item.price}</td>

                                    <td>
                                        {item.status === "pending" && <button className='btn btn-xs btn-warning'>{item.status}</button> || item.status === "denied" && <button className='btn btn-xs btn-error'>{item.status}</button> || item.status === "approved" && <button className='btn btn-xs btn-success'>{item.status}</button>}
                                    </td>

                                    <td>
                                        <div className="btn-group btn-group-vertical lg:btn-group-horizontal ">
                                            {/* denied button */}
                                            <button disabled={item.status === "approved" || item.status === "denied"} onClick={() => handleDenied(item._id)} className="btn btn-xs text-white hover:text-red-700 bg-red-600">Denied</button>
                                            {/* approved button */}
                                            <button disabled={item.status === "approved" || item.status === "denied"} onClick={() => handleApproved(item._id)} className="btn btn-xs text-white hover:text-green-700 bg-green-600">Approved</button>
                                        </div>
                                    </td>

                                    <td> <button className='btn btn-circle border border-[#f55400] text-[#f55400] relative'
                                        onClick={() => {
                                            window.my_modal_2.showModal()
                                            setItemId(item._id)
                                        }}>
                                        {
                                            item.feedback && <div className="badge text-xs bg-[#f55400] text-white absolute -top-2 right-0  gap-2">
                                                <BsFillSendCheckFill /> </div>
                                        }
                                        <VscFeedback size={20} /></button>

                                    </td>


                                </tr>


                          
                            )
                        }


                    </tbody>
                </table>
            </div>
            {/* Open the modal using ID.showModal() method */}
            {/* modal 1 for show feedback */}
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box text-center ">
                    <div className='bg-base-100 rounded p-4 shadow'>
                        <h3 className="font-bold text-lg">Hello! {user.
                            displayName}</h3>
                        <p>Please Leave your message as an admin <br />
                            Why you approved or denied this item ?
                        </p>
                        <textarea
                            {...register('feedback')}
                            className='textarea w-full textarea-bordered mt-4 border-[#f55400]'
                            placeholder='Enter Your Feedback'
                            required
                        ></textarea>

                        <input className='button mt-5' type="submit" value='Feedback' />
                    </div>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageClasses;