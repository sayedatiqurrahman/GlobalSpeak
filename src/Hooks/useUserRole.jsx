
import useAuth from './useAuth';
import {
    useQuery,
    useQueryClient,

} from '@tanstack/react-query'

import useAxiosSecure from './useAxiosSecure';
const useUserRole = () => {
    const [axiosSecure] = useAxiosSecure()
    const queryClient = useQueryClient()
    const { user, loading } = useAuth()

    if (!user) {
        return
    }
    const email = user.email



    const { data: userRole, isLoading: userRLoading, refetch: uerRoleRefetch } = useQuery({
        queryKey: ['userRole', 'email'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${email}`)
            const { role } = await res.data
            return role
        }
    })


    return [userRole, userRLoading, uerRoleRefetch];

};

export default useUserRole;