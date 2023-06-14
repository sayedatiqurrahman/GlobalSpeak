
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
const useSelectedData = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: cart = [], refetch } = useQuery({
        queryKey: ["selectedClass"],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/selectedClasses/${user.email}`);
            return response.data;
        }
    })
    // console.log(cart);
    return [cart, refetch]
};

export default useSelectedData;