import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useUserRole = () => {
    const { user } = useAuth()
    const email = user.email
    const [userRole, setUserRole] = useState()
    useEffect(() => {
        fetch(`http://localhost:5000/user/${email}`)
            .then(res => res.json()).then(data => {
                setUserRole(data)

            })
    }, [])

    return [userRole]
};

export default useUserRole;