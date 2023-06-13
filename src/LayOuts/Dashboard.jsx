import React from 'react';
import { FaBars, FaChalkboardTeacher, FaClipboardList, FaHome, FaHospitalUser, FaMoneyCheck, FaRegCalendarCheck, FaRegCalendarPlus } from 'react-icons/fa';
import { GiClassicalKnowledge } from 'react-icons/gi';
import { BiLogOut, BiSelectMultiple } from 'react-icons/bi';


import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const Dashboard = () => {
    const { user, logOut } = useAuth()
    const [userRole] = useUserRole()
    const student = userRole === 'Student'
    const Instructor = userRole === 'Instructor'
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col justify-center text-left">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden btn-circle bg-transparent text-[#f55400]  border-2 border-[#f55400] m-2 "><FaBars /></label>
                <Outlet />

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden btn-circle bg-base-200 text-[#f55400]  border-2 border-[#f55400] m-2 ml-auto z-10">x</label>
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu gap-2 p-4 w-80 h-full bg-base-200 text-base-content">

                    {/* Sidebar content of Students*/}
                    {
                        student && <>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./home'}><FaHospitalUser /> Home</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./MySelectedClasses'}><BiSelectMultiple /> My Selected Classes</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./MyEnrolledClasses'}> <FaRegCalendarCheck /> My Enrolled Classes:</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./payment'}><FaMoneyCheck /> Payment</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./paymentHistory'}><FaClipboardList /> Payment History</NavLink></li>
                        </>
                    }

                    {/* Instructors Sidebar content here */}
                    {
                        Instructor && <>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./home'}><FaHospitalUser /> Home</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./addClass'}><FaRegCalendarPlus /> Add Class</NavLink></li>
                            <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'./MyClasses'}>< BiSelectMultiple /> My Classes</NavLink></li>

                        </>
                    }

                    {/* Divider for home routes */}
                    <div className='divider divide-x-8 divide-neutral-800 mt-20 mb-10 '></div>

                    <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'/'}><FaHome /> Home</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'/instructors'}><FaChalkboardTeacher /> Instructors</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? "active" : 'default'} to={'/classes'}><GiClassicalKnowledge /> Classes</NavLink></li>
                    <li onClick={() => logOut()}><NavLink to={'/login'} className={({ isActive }) => isActive ? "active" : 'default'} ><BiLogOut /> Logout</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;