import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import useClasses from '../../hooks/useClasses';
import Title from '../../components/Title';
import Progress from '../../components/Progress';
// import Class from './Class';
import Class from './Classs';


const Classes = () => {
    const [classes, loading] = useClasses();
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>All Classes | Sports Camp</title>
            </Helmet>
            <div className="my-4">
                <Title heading={'Our All Classes'} subHeading={'This are best classes, for your summer vacation camp.'} />
            </div>
            {
                loading ? <Progress />
                    : <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {
                            classes.map((classData) => <Class classData={classData} key={classData._id} />)
                        }
                    </div>
            }
        </div>
    )
}

export default Classes;