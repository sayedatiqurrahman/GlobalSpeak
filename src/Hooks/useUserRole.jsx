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
    const { user } = useAuth()
    if (!user) {
        return
    }
    const email = user.email



    const { data: userRole } = useQuery({
        queryKey: ['userRole', 'email'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${email}`)
            const { role } = await res.data
            return role
        }
    })


    return [userRole];

};

export default useUserRole;