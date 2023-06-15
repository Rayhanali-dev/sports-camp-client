import React, { useContext } from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogIn from '../../components/SocialLogIn';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleOnSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('LoggedIn Successfully')
                navigate(from, { replace: true });
            }).catch((error) => {
                console.log(error);
                setError(error.message);
                toast.error("LoggedIn Failed. Please Try again.");
            })
    }

    return (
        <div>
            <Helmet>
                <title>Log in your account | Sports Camp</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card flex-shrink-0 w-[600px] shadow-2xl bg-base-100">
                            <h3 className='text-4xl pt-6 text-center'>Login Now</h3>
                            <form onSubmit={handleSubmit(handleOnSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text"  {...register("email")} name='email' placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type={showPassword ? 'text' : 'password'}  {...register("password")} name='password' placeholder="password" className="input input-bordered" />
                                    <span className='mt-4 bg-slate-300 rounded-lg w-7 text-center '><button onClick={handleTogglePassword}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button></span>
                                    {errors.password && <span className="text-red-600">Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <div className='px-8'>
                                <p className='text-center py-2'>New To Sports Camp member ?  <Link to="/register" className='text-green-500 hover:text-green-800 underline '>Register</Link> now.</p>
                                <SocialLogIn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn;