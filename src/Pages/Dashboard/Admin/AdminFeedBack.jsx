import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminFeedBack() {
    const classData = useLoaderData();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const feedbackValue = form.feedback.value;
        const newFeedback = { feedback: feedbackValue }
        axios.patch(`https://sports-camp-rayhanali-dev.vercel.app/classes/feedback/${classData._id}`, newFeedback)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Feedback sended for ${classData.name}!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                navigate("/dashboard/admin/classes")
            })

    }

    return (
        <>
            <Helmet>
                <title>Write Feedback | Nexus Sports</title>
            </Helmet>
            <div className='px-10 bg-base-200'>
                <div className="hero min-h-screen">
                    <div className="card  w-full  bg-base-100 shadow-md">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-xl my-4">Write feedback for <b>{classData.name}</b> class</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered w-full" name='feedback' defaultValue={classData?.feedback ? classData.feedback : ""} placeholder="Write feedback here..."></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <input type='submit' className="btn bg-green-500 hover:bg-green-800 text-white" value='Send Feedback' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminFeedBack;