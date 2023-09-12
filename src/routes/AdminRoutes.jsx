import React from 'react';
import useAdmin from '../hooks/useAdmin';
import Loading from '../components/Loading/Loading';

const AdminRoutes = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();

    if(isAdminLoading){
        return <Loading></Loading>
    }
    
    if (isAdmin) {
        return children;
    }

    return <div>Unauthorized Access</div>
};

export default AdminRoutes;