import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useVendor = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure();
    
    const {data: isVendor = {}, isLoading:isVendorLoading} = useQuery({
        queryKey: ['isVendor'], 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/vendor/${user?.email}`)
                return res.data;
            }
    })

    return [isVendor, isVendorLoading]
};

export default useVendor;