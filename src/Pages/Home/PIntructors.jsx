import React from 'react';
import useInstructors from '../../hooks/useInstructors';
import Instructor from '../Instructors/Instructor';
import Progress from '../../components/Progress';
import Title from '../../components/Title';

function PIntructors() {
    const [instructors, loading] = useInstructors();
    const popularInstructors = instructors.slice(0, 6);
    return (
        <div className='bg-base-300 py-8 my-8'>
            <div className="my-8">
                <Title heading={'Our Popular Instructors'} />
            </div>
            <div className='max-w-7xl mx-auto'>
                {
                    loading ? <Progress />
                        : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {
                                popularInstructors.map((instructor) =>
                                    <Instructor instructorData={instructor} key={instructor._id} />)
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default PIntructors;