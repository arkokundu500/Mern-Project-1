import React, { useState, useContext } from 'react'
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../utilities/providers/AuthProvider';


const Login = () => {
    const [showPassword,setshowPassword] = useState(false)
    const location = useLocation();
    const {login, error,setError,loader,setLoader} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = e =>
    {
        setError('');
        e.preventDefault();
        

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data)
        // console.log(formData)
        login(formData.email, formData.password).then(() => {
            alert("Login successful")
            navigate(location.state?.from || '/dashboard')
        })
        .catch((err) => {
            setError(err.code);
            setLoader(false);
            // console.log(error)
        })
    }


    return (
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>

            <h1 className='text 2-xl font-bold text-secondary sm:text-3xl text-center'>Get Started Today</h1>
            <p className='mx-auto mt-4 mx-w-md text-center text-gray-500'>Explore our exclusive online courses and begin your journey on the preparation of GATE exam</p>
            <div className='mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 '>
                <form onSubmit={handleSubmit}  className='space-y-4'>
                    <p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
                    <div>
                        <label htmlFor="email" className='sr-only'>Email</label>
                        <div className='relative'>
                            <input type="email" name="email" placeholder='Enter your email'
                                className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' />
                            <span className='absolute inset-y-0 end-0 grid place-items-center px-4'><MdEmail className='h-5 w-5 text-gray-400' /></span>
                        </div>
                    </div>

                     {/*Password*/}

                     <div>
                        <label htmlFor="password" className='sr-only'>Password</label>
                        <div className='relative'>
                            <input type={showPassword ?'text' : 'password'} name="password" placeholder='Enter your password'
                                className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm' />
                            <span onClick={ () => setshowPassword(!showPassword)} className='absolute inset-y-0 end-0 grid place-items-center px-4'>
                                 <FaEye className='h-5 w-5 text-gray-400'/></span>
                        </div>
                    </div>
                    <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white hover:bg-primary' > Sign In </button>
                        <p className='text-center text-sm text-gray-500'>No Account?? <Link className='underline' to="/register"> Register Now!!</Link></p>
                </form>
                <GoogleLogin/>
            </div>
        </div>
    )
}

export default Login