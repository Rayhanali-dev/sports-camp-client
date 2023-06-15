import React from 'react'
import Progress from '../../../components/Progress';
import Title from '../../../components/Title';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function AdminClasses() {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [],loading, refetch } = useQuery(['classes'], async () => {
    const res = await axiosSecure.get('/all-classes')
    return res.data;
  })

  const handleApproved = (classData) =>{
    fetch(`https://sports-camp-rayhanali-dev.vercel.app/classes/approved/${classData._id}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${classData.name} is Approved !`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }


  const handleDenied= (classData) =>{
    fetch(`https://sports-camp-rayhanali-dev.vercel.app/classes/denied/${classData._id}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.modifiedCount) {
        refetch();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${classData.name} is Denied!`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }




  return (
    <>
      <Helmet>
        <title>Manage Classes | Sports Camp</title>
      </Helmet>
      <div className="my-8">
        <Title heading={"Manage Classes"} subHeading={"You can manage all classes from here"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='bg-base-300'>
              <th>Index</th>
              <th>Images</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Status</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              loading ? <Progress />
                : classes.map((classData, index) =>
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
                    <td>Name: {classData.instructorName}<br/>
                    Email: {classData.instructorEmail}</td>
                    <td className={classData.status == "approved" ? "text-green-500" :  classData.status == "denied" ? "text-red-500" : "text-warning" }>{classData.status}</td>
                    <td className='text-center'>{classData.availableSeats}</td>
                    <td className='text-center font-semibold'>${classData.price}</td>
                    <td>
                      <button className='btn btn-success btn-xs text-white w-full' onClick={() => handleApproved(classData)} disabled={classData.status == "approved" ? true : false }> Approved</button><br/>
                      <button className='btn bg-red-500 hover:bg-red-800 w-full btn-xs text-white my-2' onClick={() => handleDenied(classData)} disabled={classData.status == "denied" ? true : false}>Denied</button><br/>
                      <button className="btn btn-warning w-full btn-xs text-white"  disabled={classData.status == "pending" ? true : false }>
                        <Link to={`feedback/${classData._id}`}>
                          {
                            classData?.feedback && classData?.feedback !== "" ? "Update Feedback" : "feedback"
                          }
                        </Link>
                      </button>
                    </td>
                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminClasses;