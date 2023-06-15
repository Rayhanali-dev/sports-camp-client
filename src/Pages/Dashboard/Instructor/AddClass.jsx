import React, { useContext } from 'react'
import Title from '../../../components/Title';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
function AddClass() {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const navigate = useNavigate();

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgResponse => {
            if(imgResponse.success){
                const photoURL = imgResponse.data.display_url;
                const {name, availableSeats, price} = data;
                const newClass = {
                    name : name,
                    image : photoURL,
                    instructorName : user.displayName,
                    instructorEmail : user.email,
                    availableSeats: parseInt(availableSeats),
                    price: parseInt(price),
                    enrolled: parseInt(0),
                    status : "pending"
                }
                axiosSecure.post('/classes', newClass)
                .then(data => {
                    console.log('after posting new class', data.data)
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate("/dashboard/instructor/myClasses");
                    }
                })
            }
        })
    }



    return (
        <>
            <Helmet>
                <title>Add a class | Sports Camp</title>
            </Helmet>
            <div className="w-full px-10 mb-5">
                <div className="my-4">
                    <Title heading={"Add a class"} subHeading={"You can add a class from here"} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Class Name*</span>
                        </label>
                        <input type="text" placeholder="class name"
                            {...register("name", { required: true, maxLength: 120 })}
                            className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Available Seats*</span>
                            </label>
                            <input type="text" placeholder="number of available seats"
                                {...register("availableSeats", { required: true, maxLength: 120 })}
                                className="input input-bordered w-full " />
                            {errors.availableSeats && <span className="text-red-600">Available Seats is required</span>}
                        </div>

                        <div className="form-control w-full mb-4 md:ml-4">
                            <label className="label">
                                <span className="label-text font-semibold">Price*</span>
                                <span className="label-text text-xs">We accept only integer number as price</span>
                            </label>
                            <input type="text" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                            {errors.price && <span className="text-red-600">Price is required</span>}
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Instructor Name</span>
                            </label>
                            <input type="text" 
                                defaultValue={user.displayName}
                                placeholder={user.displayName}
                                className="input input-bordered w-full " disabled  />
                        </div>

                        <div className="form-control w-full mb-4 md:ml-4">
                            <label className="label">
                                <span className="label-text font-semibold">Instructor Email</span>
                            </label>
                            <input type="text"  placeholder={user.email} className="input input-bordered w-full " disabled />
                            
                        </div>
                    </div>
                    <div className="form-control w-full my-4">
                        <label className="label">
                            <span className="label-text">Class Image*</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                        {errors.image && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <input className="btn bg-green-500 hover:bg-green-800 text-white mt-4 w-full " type="submit" value="Add Class" />
                </form>
            </div>
        </>
    )
}

export default AddClass;