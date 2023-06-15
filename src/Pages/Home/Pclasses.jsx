import React from 'react'
import useClasses from '../../hooks/useClasses'
import Title from '../../components/Title';
import Class from '../Classes/Classs';
import Progress from '../../components/Progress';

const Pclasses = () =>  {
    const [classes, loading] = useClasses();
    const sorted = classes.sort((a, b) => b.enrolled - a.enrolled);
    const popularClasses = sorted.slice(0, 6);
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="my-8">
                <Title heading={'Our Popular Classes'} />
            </div>
            {
                loading ? <Progress/>
                    : <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        {
                            popularClasses.map((popularClassData) => <Class classData={popularClassData} key={popularClassData._id} />)
                        }
                    </div>
            }
        </div>
    )
}

export default Pclasses
