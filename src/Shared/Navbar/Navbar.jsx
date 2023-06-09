import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';

const Navbar = () => {

    const {user} = useContext(AuthContext)

    return (
        <div className='bg-slate-600'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-400 rounded-box w-52">
                            <li><NavLink to={`/`} className='text-white text-lg bg-transparent'>Home</NavLink></li>
                            <li><NavLink to={`/`} className='text-white'>Parent</NavLink></li>
                            <li><NavLink to={`/`} className='text-white'>Item 3</NavLink></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Logo</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to={`/`} className='text-white text-lg bg-transparent'>Home</NavLink></li>
                        <li><NavLink to={`/`} className='text-white text-lg bg-transparent'>Classes</NavLink></li>
                        <li><NavLink to={`/`} className='text-white text-lg bg-transparent'>Instructors</NavLink></li>
                        {user ? <>
                            <li>
                                <img src="" className='w-8 h-8 bg-slate-500 rounded-full' alt="" />
                            </li>
                            <NavLink to={`/register`} className="btn">Log Out</NavLink>
                        </> : <NavLink to={`/login`} className="btn">Login</NavLink>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;