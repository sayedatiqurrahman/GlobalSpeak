import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/Hi';
import useAuth from '../Hooks/useAuth';
const NavBar = () => {
    const navigate = useNavigate()
    const { user, logOut } = useAuth()
   
    const handleLogOut = () => {
        logOut()
        navigate('/login')
    }
    // Menu items
    const menuItems = <>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to={'/'}>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to={'/instructors'}>Instructors</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to={'/classes'}>Classes</NavLink></li>
        {
            user && <li><NavLink className={({ isActive }) => isActive ? 'active' : 'default'} to={'/dashboard'}>Dashboard</NavLink></li>
        }
    </>
    return (
        <div>
            <div className="navbar bg-base-100 MyContainer">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box mx-2 w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className='flex ml-3' to={'/'}>
                        <img className='h-10' src={'../../public/GlobalSpeakLogo.png'} alt="" />
                        <div>
                            <p className=" text-[#f55400] font-semibold normal-case text-xl">GlobalSpeak</p>
                            <p className='text-gray-400 -mt-[10px] md:block hidden'>Summer Language School</p>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end ">
                    {user ?
                        <div title={user?.displayName} className=" dropdown dropdown-end" >
                            <label tabIndex={0} className="btn px-2 rounded-full ">
                                <div className="flex bg-gray-300 px-2 text-gray-400 items-center rounded-full">
                                    <div><HiOutlineMenuAlt3 size={16} /></div>

                                    <img className='relative -right-2 border border-amber-500 avatar w-10 h-10 rounded-full bg-gray-300' src={user?.photoURL || 'https://i.ibb.co/KKp20Zc/1623060744486.jpg'} alt='Profile Picture' />
                                </div>
                            </label>
                            <ul tabIndex={0} className="z-10 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <NavLink to={'/dashboard'}
                                        className={({ isActive }) => isActive ? 'active justify-between' : 'justify-between'}>
                                        Dashboard
                                        <span className="badge">New</span>
                                    </NavLink>
                                </li>
                                <li><NavLink className={({ isActive }) => isActive ? 'active' : ''} to={'/login'}>Login</NavLink></li>
                                <li onClick={handleLogOut}><Link >Logout</Link></li>
                            </ul>
                        </div> :
                        <ul className='menu menu-sm '>
                            <li>
                                <NavLink className={({ isActive }) => isActive ? 'active py-2' : 'default py-2'} to={'/login'}>Login</NavLink>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;