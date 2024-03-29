import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';



// Users /Students home
const SHome = () => {
    const { user } = useAuth()
    const [userRole, userRLoading] = useUserRole()
    return (
        <div className='lg:absolute top-1/2 left-1/2 lg:-translate-x-1/4 lg:-translate-y-1/2 px-40 py-10 mt-20 lg:mt-0 bg-orange-100 rounded-2xl '>
            <img className='rounded-full h-40 w-40 mx-auto' src={user.photoURL} />
            <h2 className='text-4xl font-bold fontB'>{user.displayName}</h2>
            <p className=''><b>Role:</b> {userRole}</p>
        </div>
    );
};

export default SHome;