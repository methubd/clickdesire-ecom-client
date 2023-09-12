import { XMarkIcon } from "@heroicons/react/24/solid";
import SiteLogo from "../../../components/SiteLogo/SiteLogo";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const navLinkss = <>
    
    </>

const MenuBar = () => {
    const {user, logOut} = useAuth();

    const handleLogout = () => {
        logOut()
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logout Successfull',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/login')
        })
    }
    return (
        <div className="bg-white absolute left-0 top-11 border-r-2 p-2 w-2/3 md:w-60 z-40">
            <div className="flex justify-center pb-2">
                <SiteLogo/>
            </div>
            <ul className="flex flex-col">
            <Link to="/" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Home</Link>
            <Link to="/" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Menz Zone</Link>
            <Link to="/" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Women Zone</Link>
            <Link to="/" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Children</Link>
            <Link to="/" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">New Arrival</Link>
            { user ?
                <>
                <Link to="/dashboard" className="border-t-2 py-2 bg-green-100 font-bold hover:bg-gray-100 transition-colors px-5 text-xs">Dashboard</Link>
                <Link onClick={handleLogout} className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Logout</Link>
                </>
                :
                <Link to="/login" className="border-t-2 py-2 hover:bg-gray-100 transition-colors px-5 text-xs">Login</Link>
            }
            </ul>            
        </div>
    );
};

export default MenuBar;