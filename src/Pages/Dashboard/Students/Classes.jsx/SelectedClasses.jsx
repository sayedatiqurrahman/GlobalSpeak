import React, { useEffect } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth';
import SelClassTable from './SelClassTable';

const SelectedClasses = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: cart = [], refetch } = useQuery({
        queryKey: ["selectedClass"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/selectedClasses/${user.email}`);
            return response.data;
        }
    })

    return (
        <div className='MyContainer w-full'>
            <SelClassTable cart={cart} refetch={refetch} />
        </div>
    );
};

export default SelectedClasses;