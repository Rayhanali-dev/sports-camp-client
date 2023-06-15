import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import avatarImg from '../assets/avatar.png'
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-hot-toast';

function Navbar() {
    const location = useLocation();
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);
    useEffect(() => {
        if (user?.email) {
            fetch(`https://sports-camp-rayhanali-dev.vercel.app/users/${user.email}`)
                .then(res => res.json())
                .then(user => {
                    if (user.role == "admin") {
                        setIsAdmin(true);
                    } else if (user.role == "instructor") {
                        setIsInstructor(true);
                    }
                })
        } else {
            setIsAdmin(false);
            setIsInstructor(false);
        }
    }, [user])

    const isActiveRoute = (route) => {
        return location.pathname === route;
    };

    const handleLogOut = () => {
        logOut().then(() => {
            toast.success('Logged Out Successfully!')
        }).catch((error) => {
            console.log(error);
            setError(error.message);
            toast.error("LoggedOut Failed. Please Try again.");
        })
    }

    const navItems = <>
        <li><Link to="/" className={isActiveRoute('/') ? 'text-green-500' : ''}>Home</Link></li>
        <li><Link to="/instructors" className={isActiveRoute('/instructors') ? 'text-green-500' : ''}>Instructors</Link></li>
        <li><Link to="/classes" className={isActiveRoute('/classes') ? 'text-green-500' : ''}>Classes</Link></li>
        {
            user ? <>
                <li>
                    {
                        isAdmin ?
                            <Link to="/dashboard/admin/classes" className={isActiveRoute('/dashboard') ? 'text-green-500' : ''}>Dashboard </Link>
                            : isInstructor ?
                                <Link to="/dashboard/instructor/myClasses" className={isActiveRoute('/dashboard') ? 'text-green-500' : ''}>Dashboard </Link>
                                : <Link to="/dashboard/selectedClasses" className={isActiveRoute('/dashboard') ? 'text-green-500' : ''}>Dashboard </Link>
                    }
                </li>
            </>
                : null
        }
    </>

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme,])

    return (
        <div className='bg-base-200 shadow-lg md:px-10 sticky top-0 z-50'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                            {
                                user ? <div className='flex flex-row'>
                                    <div className="w-10 rounded-full mx-2">
                                        {
                                            user.photoURL ? <img src={user.photoURL} title={user?.displayName} className='rounded-full' />
                                                : <img src={avatarImg} title={user?.displayName} />
                                        }
                                    </div>
                                    <button className="btn bg-green-500 text-white" onClick={handleLogOut}>Log Out</button>
                                </div>
                                    : <Link className="btn bg-green-500 text-white" to='/login'>Log In</Link>
                            }
                        </ul>
                    </div>
                    <Link to={`/`} className="btn btn-ghost normal-case text-xl">Sports Camp</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end hidden md:flex items-center">
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="checkbox" className="toggle" checked={theme === 'light' ? false : true} onChange={handleToggle} />
                        </label>
                    </div>
                    {
                        user ? <div className='flex flex-row items-center'>
                            <div className="w-10 rounded-full mx-2">
                                {
                                    user.photoURL ? <img src={user.photoURL} title={user?.displayName} className='rounded-full' />
                                        : <img src={avatarImg} title={user?.displayName} />
                                }
                            </div>
                            <button className="btn bg-green-500 hover:bg-green-800 text-white" onClick={handleLogOut}>Log Out</button>
                        </div>
                            : <Link className="btn bg-green-500 hover:bg-green-800 text-white" to='/login'>Log In</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;