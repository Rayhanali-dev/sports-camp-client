import React from 'react'
import useInstructors from '../../hooks/useInstructors'
import { Helmet } from 'react-helmet-async';
import Title from '../../components/Title';
import Instructor from './Instructor';
import Progress from '../../components/Progress';

function Instructors() {
    const [instructors, loading] = useInstructors();
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>All Instructors | Sports Camp</title>
            </Helmet>
            <div className="my-4">
                <Title heading={'Our Instructors'} subHeading={'We have best Instructors, they will teach you properly'} />
            </div>
           
            {
                loading ? <Progress/>
                : <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 ">
                    {
                        instructors.map((instructor) =>
                        <Instructor instructorData={instructor} key={instructor._id} /> ) 
                    } 
                </div>
                    
            }
        
        </div>
    )
}

export default Instructors;