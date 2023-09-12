import { lazy, Suspense } from 'react';
const LazyNavbar = lazy(() => import('../pages/Shared/Navbar/Navbar'));

import { Outlet } from "react-router-dom";
// import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Loading from '../components/Loading/Loading';


const Main = () => {
    return (
        <div>
            <Suspense fallback={<Loading></Loading>}>
            <LazyNavbar></LazyNavbar>
            </Suspense>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;