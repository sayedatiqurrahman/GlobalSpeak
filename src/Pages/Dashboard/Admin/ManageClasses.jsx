import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { VscFeedback } from 'react-icons/vsc';

import Swal from 'sweetalert2';

const ManageClasses = () => {

    const [axiosSecure] = useAxiosSecure()
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['manageClasses'],
        queryFn: async () => {
            const res = await axiosSecure('/manageClasses')
            const data = await res.data
            return data
        }
    })




    // todo feedback
    const feedback = "Here is Your Feedback"

    // handle button disabled or updating status
    const [disabled, setDisabled] = useState(false)
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
                    console.log(res.data)
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
        console.log(id);

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
                    console.log(res.data)
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
                            classes.map((item, index) => <tr
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
                                    onClick={() => window.my_modal_1.showModal()}>
                                    {
                                        feedback && <div className="badge text-xs bg-[#f55400] text-white absolute -top-2 right-0  gap-2">
                                            01 </div>
                                    }
                                    <VscFeedback size={20} /></button>

                                </td>
                                {/* Open the modal using ID.showModal() method */}
                                {/* modal 1 for show feedback */}
                                <dialog id="my_modal_1" className="modal">
                                    <form method="dialog" className="modal-box">
                                        <h3 className="font-bold text-lg">Hello! {item.
                                            teacherName}</h3>
                                        <p className="py-4">Please Leave Your Feedback</p>

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




        </div>
    );
};

export default ManageClasses;