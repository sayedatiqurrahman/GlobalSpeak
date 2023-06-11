import React, { useEffect, useState } from 'react';
import SectionTItle from '../../../Components/SectionTItle';
import PopInstructorCard from '../../../Components/PopInstructorCard';



const PopularInstructor = () => {

    const [data, setData] = useState()
    useEffect(() => {

        fetch('http://localhost:5000/').then(res => res.json()).then(data => {
            console.log(data);
            const topClasses = data.filter(cItems => cItems.numberOfStudents >= 50)
            setData(topClasses)
        }
        )
    }, [])

    return (
        <div  className='mt-40 mb-[130px]'>
            <SectionTItle title={'Popular Instructors'} subTitle={'Behind the Success: Unveiling the Popular Instructors'} />

            <div className=' mt-24 grid md:grid-cols-2  lg:grid-cols-3 gap-10 MyContainer'>
                {
                    data?.map(pInstructor => <PopInstructorCard key={pInstructor._id} pInstructor={pInstructor} />)
                }
            </div>

        </div>
    );
};

export default PopularInstructor;