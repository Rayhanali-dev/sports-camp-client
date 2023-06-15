import React from 'react'
import useEnrolled from '../../../hooks/useEnrolled';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title';

function EnrolledClasses() {
  const [enrolledClasses] = useEnrolled();
  console.log(enrolledClasses)
  return (
    <>
      <Helmet>
        <title> Enrolled Classes | Sports Camp</title>
      </Helmet>
      <div className="my-8">
        <Title heading={"My Enrolled Classes"} subHeading={"You can see your enrolled classes here"} />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className='bg-base-300'>
              <th>Index</th>
              <th>Images</th>
              <th>Class Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              enrolledClasses.map((classData, index) =>
                <tr key={classData._id} className='border-b-2 border-b-base-300'>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={classData.classImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{classData.className}</td>
                  <td className='text-green-800 font-semibold'>{classData.status}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EnrolledClasses;