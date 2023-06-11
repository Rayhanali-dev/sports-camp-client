import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        if(data.password !== data.confirmPwd) {
            alert("password doesn't match")
            return
        }
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error => {
            console.log(error.message);
        })
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className='max-w-7xl flex items-center min-h-screen mx-auto'>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="card flex-shrink-0 w-[800px] shadow-2xl bg-base-100">
                            <h3 className='text-center text-4xl py-4 font-bold'>Register</h3>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                    <input type="email" {...register('email', { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                    {errors.email && <p className='text-red-600'>Email field is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register('password', {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$",
                                    },)} name='password' placeholder="Password" className="input input-bordered" />
                                    {errors.password && <p className='text-red-600'>Password field is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input name="confirmPwd"
                                        type="password"
                                        {...register('confirmPwd', {required: true})} placeholder="Password" className="input input-bordered" />
                                    {errors.confirmPwd && <p className='text-red-600'>Pasword Dont't Match</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="text" {...register('photo', { required: true })} name='photo' placeholder="Give your photo link" className="input input-bordered" />
                                    {errors.photo && <p className='text-red-600'>Photo file is required</p>}
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className='btn btn-primary' value="Sign Up" />
                                </div>
                            </form>
                            <p className='text-center pb-4 text-lg '> Already have an account please
                                <Link className='text-blue-700' to={`/login`}> Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;