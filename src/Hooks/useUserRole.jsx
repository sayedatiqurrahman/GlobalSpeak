import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
const useUserRole = () => {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    if (!user) {
        return
    }
    const email = user.email



    const { data: userRole } = useQuery({
        queryKey: ['userRole', 'email'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/user/${email}`)
            const { role } = await res.json()
            return role
        }
    })


    return [userRole];

};

export default useUserRole;