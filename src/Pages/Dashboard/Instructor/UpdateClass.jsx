import React  from 'react'
import Title from '../../../components/Title';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from "react-icons/fa";

function UpdateClass() {
    const classData = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleGoBack = () =>{
        navigate(-1);
    }

    const onSubmit = data => {
        const {name, availableSeats, price} = data;
        const updatedClass = {
            name : name,
            availableSeats: parseInt(availableSeats),
            price: parseInt(price),
        }
        axiosSecure.patch(`/classes/${classData._id}`, updatedClass)
        .then(data => {
            console.log('after posting new class', data.data)
            if(data.data.modifiedCount > 0){
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Class Updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/dashboard/instructor/myClasses");
            }
        })
        
    }


    return (
        <>
            <Helmet>
                <title>Update Class | Nexus Sports</title>
            </Helmet>

            <div className="w-full px-10 mb-5">
                <div className="my-4">
                    <Title heading={"Update the Class"} subHeading={"You can add a class from here"} />
                </div>
                <div>
                    <button className='btn  bg-green-500 hover:bg-green-800 text-white mb-2' onClick={handleGoBack}><FaArrowLeft></FaArrowLeft>Go Back</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Class Name*</span>
                        </label>
                        <input type="text" placeholder="class name"
                            {...register("name", { required: true, maxLength: 120 })}
                            className="input input-bordered w-full " defaultValue={classData.name} />
                        {errors.name && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Available Seats*</span>
                            </label>
                            <input type="text" placeholder="number of available seats"
                                {...register("availableSeats", { required: true, maxLength: 120 })}
                                className="input input-bordered w-full " defaultValue={classData.availableSeats} />
                            {errors.availableSeats && <span className="text-red-600">Available Seats is required</span>}
                        </div>

                        <div className="form-control w-full mb-4 md:ml-4">
                            <label className="label">
                                <span className="label-text font-semibold">Price*</span>
                            </label>
                            <input type="text" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " defaultValue={classData.price} />
                            {errors.price && <span className="text-red-600">Price is required</span>}
                        </div>
                    </div>
                    <input className="btn bg-green-500 hover:bg-green-800 text-white mt-4 w-full " type="submit" value="Update Class" />
                </form>
            </div>
        </>
    )
}

export default UpdateClass;