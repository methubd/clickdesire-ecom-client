import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const {passwordRegister, updateUserProfile, loading} = useAuth();

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const userName = form.name.value;
        const userEmail = form.email.value;
        const contact = form.contact.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        const userRole = 'user';
        const newUser = {userName, userEmail, contact, userRole}

        if(confirm !== password){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Password not matched!',
                showConfirmButton: false,
                timer: 1500
            })
            return 
        }

        passwordRegister(userEmail, password)
            .then(() => {
                updateUserProfile(userName)
                axios.post('https://ecom-server-hmqo5krgf-methubd.vercel.app/users', newUser)
                .then((res) => {                    
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'New Create Successfull',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                form.reset();
                navigate('/')
                })
                .catch(error => {
                    console.log(error.message);
                })
            })

        

        

        

    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-lg font-bold pb-2 uppercase text-gray-500'>- Please Register -</h1>
            <form onSubmit={handleRegister} className="lg:w-1/3 px-5">
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md outline-none' type="text" name='name' placeholder='Name' required/>
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md mt-1 outline-none' type="text" name='email' placeholder='Email'required/>
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md mt-1 outline-none' type="text" name='contact' placeholder='Contact Number'required/>
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md mt-1 outline-none' type="password" name='password' placeholder='Password'required/>
                <input className='bg-gray-100 w-full px-2 py-1 rounded-md mt-1 outline-none' type="password" name='confirm' placeholder='Confirm Password' required/>
                <div className="text-center">
                    <input className="btn btn-sm btn-neutral my-5" type="submit" value='Register' />
                </div>
            </form>
            <hr className='my-2 w-2/3 mx-auto' />
            <div className='flex justify-center'>

            </div>
            <p className='text-xs py-5'>Already have an Account? Please <Link className='text-blue-500' to='/login'>Login</Link> </p>
        </div>
    );
};

export default Register;