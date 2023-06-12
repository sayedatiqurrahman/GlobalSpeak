import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import {
    useQuery,
    useQueryClient,

} from '@tanstack/react-query'
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';
const useUserRole = () => {
    const [axiosSecure] = useAxiosSecure()
    const queryClient = useQueryClient()
    const { user, loading, setLoading } = useAuth()
 
    if (!user) {
        return
    }
    const email = user.email



    const { data: userRole , isLoading:userRLoading} = useQuery({
        queryKey: ['userRole', 'email'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${email}`)
            const { role } = await res.data
            return role
        }
    })


    return [userRole,userRLoading];

};

export default useUserRole;