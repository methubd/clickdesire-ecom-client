import { Bars3Icon, ShoppingCartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from "react-router-dom";
import SiteLogo from "../../../components/SiteLogo/SiteLogo";
import { useEffect, useRef, useState } from 'react';
import MenuBar from './MenuBar';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import CartCouner from '../../../components/CartCounter/CartCouner';

const Navbar = () => {
    const {user, logOut} = useAuth();
    const [activeMenu, setActiveMenu] = useState(false);
    const navigate = useNavigate();
    
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

        // Handling Body Click When Menu opened! 
        const menuRef = useRef(null);
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (
                    menuRef.current &&
                    !menuRef.current.contains(event.target) &&
                    !event.target.classList.contains('menu-icon')
                ) {
                    setActiveMenu(false);
                }
            };
                document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

    return (
        <nav className="flex justify-between bg-gray-700 px-5 fixed w-full z-40">
            { activeMenu ?
                <XMarkIcon className='cursor-pointer menu-icon' onClick={() => setActiveMenu(!activeMenu)} width={30} color='white'/>
                :
                <Bars3Icon className='cursor-pointer menu-icon' onClick={() => setActiveMenu(!activeMenu)} width={30} color='white'/>
            }
            <SiteLogo></SiteLogo>
            <div className='flex gap-5 items-center' ref={menuRef}>
                { user&&
                    <>
                    <p className='text-white text-xs'>Welcome {user?.displayName}</p>
                    <button onClick={handleLogout} className='bg-red-500 text-white text-xs px-2 py-1 rounded-md font-bold'>Logout</button>
                    </>
                }
                <MagnifyingGlassIcon className='cursor-pointer' width={20} color='white'/>
                {/* TODO: have to fix this live update when user will add product on cart */}
                <CartCouner></CartCouner>
            </div>
            { activeMenu &&
                <MenuBar></MenuBar>
            }        
        </nav>
    );
};

export default Navbar;