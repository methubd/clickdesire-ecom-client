import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const {passwordLogin} = useAuth()
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        passwordLogin(email, password)
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Logged In',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/')
        })
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-lg font-bold pb-2 uppercase text-gray-500'>- Please Login -</h1>
            <form onSubmit={handleLogin}>
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md outline-none' type="text" name='email' placeholder='Email' />
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md mt-1 outline-none' type="password" name='password' placeholder='Password' />
                <div className="text-center">
                    <input className="btn btn-sm btn-neutral my-5" type="submit" value='Login' />
                </div>
            </form>
            <hr className='my-2 w-2/3 mx-auto' />
            <div className='flex justify-center'>
                <SocialLogin></SocialLogin>
            </div>
            <p className='text-xs py-5'>New user? Please <Link className='text-blue-500' to='/register'>Register</Link> </p>
        </div>
    );
};

export default Login;