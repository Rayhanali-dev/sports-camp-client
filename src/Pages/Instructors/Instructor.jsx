import React from 'react'

function Instructor({instructorData}) {
    const {name, email, image} = instructorData;
    return (
        <div className="card w-full bg-base-300 shadow-2xl mx-auto">
            <figure className='h-72'><img src={image} alt="instructor" className='h-full w-full object-top' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Instructor;