import React, { useContext, useRef } from 'react'
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import axios from 'axios';
import SocialLogIn from '../../components/SocialLogIn';
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

function Register() {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, role: "student", image: data.photoURL }
                        axios.post('https://sports-camp-rayhanali-dev.vercel.app/users', saveUser)
                            .then(data => {
                                if (data.data.insertedId) {
                                    reset();
                                    toast.success('Registered Successfully')
                                    navigate('/');
                                }
                            })
                    }).catch(error => console.log(error))
            })
    }

    return (
        <div>
            <Helmet>
                <title>Register now | Sports Camp</title>
            </Helmet>
            <div className="hero min-h-screen px-8">
                <div className="hero-content ">
                    <div className="card flex-shrink-0 w-[600px] shadow-2xl bg-base-100">
                        <div className="card-body grid grid-cols-1">
                            <div className='h-full w-full p-4'>
                                <h3 className='text-4xl text-center'>Register Now</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" {...register('name', { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                                        {errors.name && <p className='text-red-600'>Name field is required</p>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                        {errors.email && <span className="text-red-600">Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <label className="input-group min-w-full">
                                            <input type='password' placeholder="password"  {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/
                                            })} className="input input-bordered w-full" />
                                        </label>
                                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case and one special character.</p>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>

                                        <input type='password'
                                            {...register("confirmPassword", {
                                                validate: (value) =>
                                                    value === password.current || 'The passwords do not match',
                                            })}
                                            placeholder="password" className="input input-bordered w-full" />

                                        {errors.confirmPassword && (
                                            <span><p className="text-red-600">{errors.confirmPassword.message}</p></span>
                                        )}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo URL</span>
                                        </label>
                                        <input type="text"  {...register("photoURL", { required: true })} placeholder="paste your photo url here.." className="input input-bordered" />
                                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                    </div>
                                    <div className="form-control mt-6">
                                        <input type='submit' className="btn btn-primary text-white" value="Register" />
                                    </div>
                                </form>
                                <p className='text-center py-2'>Are you already a Sports Camp member ?  <Link to="/login" className='text-green-500 hover:text-green-800 underline '>Log In</Link> now.</p>
                                <SocialLogIn />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;