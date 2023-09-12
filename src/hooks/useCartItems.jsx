import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCartItems = () => {
    const {user} = useAuth();
    const email = user?.email;

    const {data: cartItems = [], refetch, isLoading:isCartItemsLoading} = useQuery({
        queryKey: ['cartItems'], 
        queryFn: async () => {
            if (!email) {
                return [];
            }
            const res = await axios.get(`https://ecom-server-hmqo5krgf-methubd.vercel.app/added-cart-items/${email}`)
            return res.data;
        }
    })

    return [cartItems, refetch, isCartItemsLoading];
    
};

export default useCartItems;