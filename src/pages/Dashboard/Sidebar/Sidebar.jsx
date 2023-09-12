import React from 'react';
import SiteLogo from '../../../components/SiteLogo/SiteLogo';
import ActiveLink from '../../../components/ActiveLink/ActiveLink';
import { ArrowLeftOnRectangleIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, ClipboardDocumentIcon, CurrencyBangladeshiIcon, PlusCircleIcon, ReceiptRefundIcon, RectangleGroupIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import useAdmin from '../../../hooks/useAdmin';
import useVendor from '../../../hooks/useVendor';
import Loading from '../../../components/Loading/Loading';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isVendor, isVendorLoading] = useVendor();

    if(isAdminLoading || isVendorLoading) {
        return <Loading></Loading>
    }

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <aside className="md:w-[270px] hidden lg:block md:block h-screen border-gray-400 border-r-4">
            <div className="flex justify-center py-5">
                <SiteLogo></SiteLogo>
            </div>

            {/* Dashboard Menus */}
            <div className="flex flex-col gap-2 text-sm">
                {/* Student Routes */}
                <ActiveLink to='/dashboard/'> <RectangleGroupIcon width={18}/>Dashboard</ActiveLink>
                <hr className="border-gray-400 "/>
                <ActiveLink to='/dashboard/pending-orders'> <ReceiptRefundIcon width={18}/>Pending Orders</ActiveLink>
                <ActiveLink to='/dashboard/payment-history'> <CurrencyBangladeshiIcon width={18}/>Payment History</ActiveLink>
                <hr className="border-gray-400 "/>

                {/* Vendor Routes */}
                { isVendor &&
                    <>
                    <ActiveLink to='/dashboard/add-product'> <PlusCircleIcon width={18}/>Add a Product</ActiveLink>
                    <ActiveLink to='/dashboard/manage-products'> <CurrencyBangladeshiIcon width={18}/>Manage Products</ActiveLink>
                    <ActiveLink to='/dashboard/response-chat'> <ChatBubbleLeftRightIcon width={18}/>Response Chat</ActiveLink>
                    <hr className="border-gray-400 "/>
                    </>
                }

                {/* Admin Routes */}
                { isAdmin &&
                    <>
                    <ActiveLink to='/dashboard/add-product'> <PlusCircleIcon width={18}/>Add a Product</ActiveLink>
                    <ActiveLink to='/dashboard/manage-products'> <CurrencyBangladeshiIcon width={18}/>Manage Products</ActiveLink>
                    <ActiveLink to='/dashboard/response-chat'> <ChatBubbleLeftRightIcon width={18}/>Response Chat</ActiveLink>
                    <p className='text-xs bg-red-500 px-5 text-white py-1'>Manage users</p>
                    <ActiveLink to='/dashboard/manage-users'> <UserGroupIcon width={18}/>Manage Users</ActiveLink>
                    <hr className="border-gray-400 "/>
                    </>
                }

            </div>
            <button onClick={handleLogout} className="flex px-10 py-5 items-center gap-1 active:text-black hover:text-gray-700 transition-colors text-sm"> <ArrowLeftOnRectangleIcon width={18}/>Go Back</button>
        </aside>
    );
};

export default Sidebar;