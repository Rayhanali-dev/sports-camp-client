import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import Title from '../../../components/Title';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function InstructorClasses() {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/instructor/classes?email=${user.email}`)
            .then(data => setClassesData(data.data))
    }, [])

    return (
        <>
            <Helmet>
                <title>My Classes | Sports Camp</title>
            </Helmet>
            <div className="my-8">
                <Title heading={"My Classes"} subHeading={"You can manage your classes from here"} />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-base-300'>
                            <th>Index</th>
                            <th>Images</th>
                            <th>Class Name</th>
                            <th>Available Seats</th>
                            <th>Enrolled</th>
                            <th>Price</th>
                            <th>Status</th>
                            <td>Feedback</td>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {

                            classesData.map((classData, index) =>
                                <tr key={classData._id} className='border-b-2 border-b-base-300'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={classData.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{classData.name}</td>
                                    <td className='text-center'>{classData.availableSeats}</td>
                                    <td className='text-center'>{classData.enrolled}</td>
                                    <td className='text-center font-semibold'>${classData.price}</td>
                                    <td className={classData.status == "approved" ? "text-green-500" : classData.status == "denied" ? "text-red-500" : "text-warning"}>{classData.status}</td>
                                    <td>{classData.status == "denied" ? classData?.feedback : "No feedback"}</td>
                                    <td>
                                        <Link to={`update/${classData._id}`}>
                                            <button className='btn btn-success btn-xs text-white w-full'>Update</button>
                                        </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default InstructorClasses;