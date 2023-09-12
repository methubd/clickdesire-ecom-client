import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePendingOrders = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data: pendingOrders = [], refetch, isLoading:isPendingOrdersLoading} = useQuery({
        queryKey: ['pendingOrders'], 
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosSecure.get("https://ecom-server-hmqo5krgf-methubd.vercel.app/pending-orders")
            return res.data;
        }
    })

    return [pendingOrders, refetch, isPendingOrdersLoading];
    
};

export default usePendingOrders;