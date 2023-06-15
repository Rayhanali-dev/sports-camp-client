import React from 'react'
import Progress from '../../../components/Progress';
import Title from '../../../components/Title';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

function AdminUsers() {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], loading, refetch } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users')
    return res.data;
  })

  const handleInstructor = (user) => {
    fetch(`https://sports-camp-rayhanali-dev.vercel.app/users/instructor/${user._id}`, {
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
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }


  const handleAdmin = (user) => {
    fetch(`https://sports-camp-rayhanali-dev.vercel.app/users/admin/${user._id}`, {
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
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

  

  return (
    <>
      <Helmet>
        <title>Manage Users | Nexus Sports</title>
      </Helmet>
      <div className="my-8">
        <Title heading={"Manage Users"} subHeading={"You can manage all users from here"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='bg-base-300'>
              <th>Index</th>
              <th>Images</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              loading ? <Progress />
                : users.map((userData, index) =>
                  <tr key={userData._id} className='border-b-2 border-b-base-300'>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={userData.image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{userData.name}</td>
                    <td>{userData.email}</td>
                    <td className={userData.role == "admin" ? "text-primary" : userData.role == "instructor" ? "text-green-500" : "text-black"}>{userData.role}</td>
                    <td>
                      <button className='btn btn-success btn-xs text-white w-full mb-2' disabled={userData.role == "instructor" ? true : false} onClick={() => handleInstructor(userData)}>Instructor</button><br />
                      <button className='btn btn-primary w-full btn-xs text-white' disabled={userData.role == "admin" ? true : false} onClick={() => handleAdmin(userData)}>Admin</button><br />
                    </td>

                  </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminUsers;