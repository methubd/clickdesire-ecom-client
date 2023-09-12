import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import CartItems from "../pages/Dashboard/User/CartItems/CartItems";

import PaymentHistory from "../pages/Dashboard/User/PaymentHistory/PaymentHistory";
import AddProduct from "../pages/Dashboard/Admin/AddProduct/AddProduct";
import ManageProducts from "../pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import ProductDetails from "../pages/Home/AllProducts/ProductDetails";
import CreditCardPay from "../pages/Dashboard/User/PaymentMethods/CreditCardPay";
import CashOnDelivery from "../pages/Dashboard/User/PaymentMethods/CashOnDelivery";
import PendingOrders from "../pages/Dashboard/User/PendingOrders/PendingOrders";
import AdminRoutes from "./AdminRoutes";
import Register from "../pages/Register/Register";
import VendorRoute from "./VendorRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            }, 
            {
                path: '/register',
                element: <Register></Register>
            }, 
            {
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>, 
                loader: async ({params}) => fetch(`https://ecom-server-hmqo5krgf-methubd.vercel.app/products/${params.id}`)
            }, 
            {
                path: '/cart-items',
                element: <PrivateRoute><CartItems></CartItems></PrivateRoute>
            }, 
            {
                path: '/credit-card-pay',
                element: <CreditCardPay></CreditCardPay>
            }, 
            {
                path: '/cash-on-delivery',
                element: <CashOnDelivery></CashOnDelivery>
            }
        ]
    }, 
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        children: [
            {
                path: '/dashboard/',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: '/dashboard/cart-items',
                element: <CartItems></CartItems>
            },
            {
                path: '/dashboard/pending-orders',
                element: <PendingOrders></PendingOrders>
            },
            {
                path: '/dashboard/payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: '/dashboard/add-product',
                element: <VendorRoute><AddProduct></AddProduct></VendorRoute>
            },
            {
                path: '/dashboard/manage-products',
                element: <VendorRoute><ManageProducts></ManageProducts></VendorRoute>
            }, 
            {
                path: '/dashboard/manage-users',
                element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>
            }

        ]
    }, 
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router;