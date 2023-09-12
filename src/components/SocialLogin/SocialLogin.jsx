import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const SocialLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
        .then((resutlt) => {
            const user = resutlt.user;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Logged In',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/')

        // Posting user data to db
        const newUser = {userName: user?.displayName, userEmail: user?.email, userRole: 'user'}
        axios.post('https://ecom-server-hmqo5krgf-methubd.vercel.app/users', newUser)
            .then(res => {
                console.log(res.data.acknowledged);
            })
        })
    }

    return (
        <div className=''>
            <button onClick={handleGoogleLogin} className='flex text-sm items-center justify-center border px-10 rounded-md hover:bg-gray-100'>
            <img className='w-8 ' src="https://i.ibb.co/5189tFN/7123025-logo-google-g-icon.png" alt="" />Login with Google</button>
        </div>
    );
};

export default SocialLogin;