import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'
import Swal from 'sweetalert2';
const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['manageUsers'],
        queryFn: async () => {
            const res = await axiosSecure('/users')
            const data = await res.data
            return data
        }
    })
    // console.log(users);
    const handleInstructor = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Make this user : Instructor !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Instructor!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newRole = { role: "Instructor" }
                axiosSecure.patch(`/updateRole/${id}`, newRole).then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire(
                            'Instructor!',
                            'You Make a user Instructor successfully',
                            'success'
                        )
                    }
                })


            }
        })
    }

    const handleAdmin = (id) => {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Make this user : Admin !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newStatus = { role: "Admin" }
                axiosSecure.patch(`/updateRole/${id}`, newStatus).then(res => {
                    // console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire(
                            'Admin!',
                            'You Make a user Admin successfully',
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
                <h3 className="md:text-3xl text-xl ml-3">Total Classes: {users.length}</h3>


            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-left">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>

                            <th> name</th>
                            <th>email</th>
                            <th>role</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((item, index) =><tr
                                    key={item._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {item.name}
                                    </td>

                                    <td>
                                        {item.email}
                                    </td>
                                    <td className='flex items-center gap-2'>
                                        {item.role === "Instructor" && <FaChalkboardTeacher size={17} /> || item.role === "Admin" && <FaUserShield size={17} /> || item.role === "Student" && <FaUserGraduate size={17} />} {item.role}
                                    </td>


                                    <td>

                                    </td>

                                    <td>
                                        <div className="btn-group btn-group-vertical lg:btn-group-horizontal ">
                                            {/* denied button */}
                                            <button disabled={item.role === "Instructor"} onClick={() => handleInstructor(item._id)} className="btn btn-xs text-white hover:text-indigo-700 bg-indigo-600"> <FaChalkboardTeacher size={17} /> Instructor</button>
                                            {/* approved button */}
                                            <button disabled={item.role === "Admin"} onClick={() => handleAdmin(item._id)} className="btn btn-xs text-white hover:text-green-700 bg-green-600"><FaUserShield size={17} /> Admin</button>
                                        </div>
                                    </td>


                                </tr>


                        
                            )
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;