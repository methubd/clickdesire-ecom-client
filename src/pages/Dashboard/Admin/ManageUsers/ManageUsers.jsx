import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";

const ManageUsers = () => {
    const {user:regUser} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {data: users = [], isLoading: isUserLoading, refetch} = useQuery({
    queryKey: ['users'],     
    queryFn: async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    }})

    if (isUserLoading) {
        return <Loading></Loading>        
    }

    // TODO: make a function who will contain the functionality and will change it.
    const handleRevertToUser = (user) => {
        axiosSecure.put(`/users/${user?.userEmail}`, {userRole: 'user'})
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user?.userName} Reverted to user`,
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        })
    }

    const handleMakeVendor = (user) => {
        axiosSecure.put(`/users/${user?.userEmail}`, {userRole: 'vendor'})
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user?.userName} is now a Vendor`,
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        })
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.put(`/users/${user?.userEmail}`, {userRole: 'admin'})
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user?.userName} is now an Admin`,
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        #
                    </label>
                    </th>
                    <th>Name and Photo</th>
                    <th>Account Role</th>
                    <th>Email Address</th>
                </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => <tr key={index}>
                    <th>
                        <label>
                            {index + 1}
                        </label>
                    </th>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                {/* <img src={regUser?.photoURL}/> */}
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{user?.userName}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="text-sm opacity-50">{user?.userRole}</div>
                    </td>
                    <td>
                        <div className="font-semibold">{user?.userEmail}</div>
                    </td>
                    <td>
                        <button onClick={() => handleRevertToUser(user)} className="btn btn-ghost btn-xs">Revert to User</button>
                    </td>
                    <td>
                        <button onClick={() => handleMakeVendor (user)} className="btn btn-ghost btn-xs text-red-600">Make Vendor</button>
                    </td>
                    <td>
                        <button onClick={() => handleMakeAdmin (user)} className="btn btn-ghost btn-xs">Make Admin</button>
                    </td>
                </tr> )}                   
                </tbody>    
            </table>
            </div>
    );
};

export default ManageUsers;