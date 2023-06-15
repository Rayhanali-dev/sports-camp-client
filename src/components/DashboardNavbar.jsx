import React, { useContext, useState } from 'react';
import useAdmin from '../hooks/useAdmin';
import { Link, Outlet } from 'react-router-dom';
import { FaUsers, FaBookReader, FaRegWindowMaximize, FaPlusCircle, FaBookmark, FaMoneyCheck } from "react-icons/fa";
import { AuthContext } from '../providers/AuthProvider';
import Footer from './Footer';
import useInstructor from '../hooks/useInstructor';

function DashboardNavbar() {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const userInfo = <>
        <div className='flex align-middle flex-col justify-center px-4'>
            <div>
                <img src={user.photoURL} alt="" className='rounded-full w-20 h-20 mx-auto' />
            </div>
            <div>
                <p className='text-xl font-semibold'>{user.displayName}
                    {
                        isAdmin ? <span className='text-xs'> (Admin)</span>
                            : isInstructor ? <span className='text-xs'> (Instructor)</span>
                                : <span className='text-xs'> (Student)</span>

                    }
                </p>
                <p className='text-md'>{user.email}</p>
            </div>
        </div>
    </>
    const navItems = <>
        {
            isAdmin ? <>
                <li><Link to="admin/classes"><FaBookReader></FaBookReader>Manage Classes</Link></li>
                <li><Link to="admin/users"><FaUsers></FaUsers>Manage Users</Link></li>
            </> : isInstructor ? <>
                <li><Link to="instructor/myClasses"><FaBookReader></FaBookReader>My Classes</Link></li>
                <li><Link to="instructor/addClass"><FaPlusCircle></FaPlusCircle>Add Class</Link></li>
            </> : <>
                <li><Link to="selectedClasses"><FaBookmark></FaBookmark>Selected Classes</Link></li>
                <li><Link to="enrolledClasses"><FaBookReader></FaBookReader>Enrolled Classes</Link></li>
                <li><Link to="paymentHistory"><FaMoneyCheck></FaMoneyCheck>Payment History</Link></li>
            </>
        }
    </>



    return (
        <>
            <div className="navbar bg-base-100 px-8 shadow-xl z-50">
                <div className="navbar-start">
                    
                    <a className="btn btn-ghost normal-case text-xl hidden md:flex">Sports Camp</a>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
                </div>
            </div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn bg-green-400 my-5 drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></label>
                    <div className='text-3xl font-semibold m-4'>Welcome {user.displayName} !</div>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content">
                        {userInfo}
                        {navItems}
                        <li><Link to="/"><FaRegWindowMaximize></FaRegWindowMaximize>Go Website Home</Link></li>
                    </ul>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default DashboardNavbar