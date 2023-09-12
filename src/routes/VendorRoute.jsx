import React from 'react';
import useVendor from '../hooks/useVendor';
import Loading from '../components/Loading/Loading';
import useAdmin from '../hooks/useAdmin';

const VendorRoute = ({children}) => {
    const [isVendor,isVendorLoading] = useVendor();
    const [isAdmin] = useAdmin();

    if(isVendor || isAdmin) {
        return children;
    }

    return <div>Unauthorized Access</div>
};

export default VendorRoute;