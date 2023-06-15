import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Classs({ classData }) {
    const { name, image, instructorName, availableSeats, price, instructorEmail, enrolled } = classData;
    const { user } = useContext(AuthContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(user => {
                    if (user.role == "admin" || user.role == "instructor" || availableSeats == 0) {
                        setIsDisabled(true);
                    }
                })
        } else {
            if (availableSeats == 0) {
                setIsDisabled(true);
            } else {
                setIsDisabled(false);
            }
        }
    }, [user])

    const handleSelect = (classData) => {
        if (user && user.email) {
            const selectedClass = {classId: classData._id, name: classData.name, image: classData.image, price: classData.price, userEmail: user.email, status: "payable"}
            axios.post('http://localhost:5000/selected', selectedClass)
            .then(res =>{
                if(res.data.insertedId){
                    toast.success("Class Selected Successfully")
                }
            })
        }
        else {
            Swal.fire({
                title: 'Please login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }

    return (
        <div className={availableSeats == 0 ? "card-compact bg-red-500 shadow-xl " : "card-compact bg-base-100 shadow-xl"}>
            <figure className='h-60'><img src={image} alt="Shoes" className='h-full w-full' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Instructor Name: {instructorName}</p>
                <p>Instructor Email: {instructorEmail}</p>
                <p>Enrolled Students: {enrolled}</p>
                <p>Available Seats: {availableSeats}</p>
                <p className='text-xl font-semibold text-green-500'>price:${price}</p>
                <div className="card-actions w-full shadow-2xl">
                    <button className="btn bg-green-500 hover:bg-green-800 text-white w-full " onClick={() => handleSelect(classData) } disabled={isDisabled}>Select</button>
                </div>
            </div>
        </div>
    )
}

export default Classs;