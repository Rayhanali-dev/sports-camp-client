import React from 'react'
import useSelectedClasses from '../../../hooks/useSelectedClasses';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function SelectedClasses() {
    const [selectedClasses, refetch] = useSelectedClasses();
    
    const handleDelete = (classData) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            position: 'center',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selected/class/${classData._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: 'Deleted',
                                text: "Selected Class Deleted",
                                icon: 'success'
                            })
                        }
                    })
            }
        })
    }

    return (
        <>
            <Helmet>
                <title> Selected Classes | Nexus Sports</title>
            </Helmet>
            <div className="my-8">
                <Title heading={"My Selected Classes"} subHeading={"You can pay or remove classes from here"} />
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className='bg-base-300'>
                            <th>Index</th>
                            <th>Images</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((classData, index) =>
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
                                    <td className='font-semibold'>${classData.price}</td>
                                    <td>
                                        <button className='btn bg-red-500 hover:bg-red-800 w-full btn-xs text-white my-2' onClick={() => handleDelete(classData)}>Delete</button><br />
                                        <Link to={`payment/${classData._id}`}>
                                            <button className="btn btn-warning w-full btn-xs text-white" disabled={classData.status == "paid" ? true : false}>
                                                Pay
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SelectedClasses;