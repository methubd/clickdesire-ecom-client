import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-5xl font-bold text-red-500'>404</h1>
            <p>Not Found</p>
            <Link to='/' className="flex px-10 py-5 items-center gap-1 active:text-black hover:text-gray-700 transition-colors text-sm"> <ArrowLeftOnRectangleIcon width={18}/>Go Back</Link>
        </div>
    );
};

export default ErrorPage;