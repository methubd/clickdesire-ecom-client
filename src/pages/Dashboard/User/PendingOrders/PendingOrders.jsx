import React from 'react';
import usePendingOrders from '../../../../hooks/usePendingOrders';
import Loading from '../../../../components/Loading/Loading';

const PendingOrders = () => {
    const [pendingOrders, refetch, isPendingOrdersLoading] = usePendingOrders();
    
    if (isPendingOrdersLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>Pending Orders: {pendingOrders?.length}</h1>
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
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Payment Type</th>
                    <th>Place Date</th>
                    <th>Order Status</th>
                </tr>
                </thead>
                <tbody>
                    {
                        pendingOrders?.map((order, index) => <tr
                        key={order._id}
                        >
                            <th>
                                <label>
                                    {index + 1}
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                    <div className="uppercase">{order._id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-sm text-right opacity-50"> ${order?.amount}</div>
                            </td>
                            <td>
                                <div className="">{order?.paymentType}</div>
                            </td>
                            <td>
                                <div className="font-semibold">{order?.placeDate}</div>
                            </td>
                            <td>
                                <div className="border border-gray-400 px-2 text-center py-1 rounded-md">{order?.status}</div>
                            </td>
                        </tr>)
                    }
                                
                </tbody>    
            </table>
            </div>
        </div>
    );
};

export default PendingOrders;