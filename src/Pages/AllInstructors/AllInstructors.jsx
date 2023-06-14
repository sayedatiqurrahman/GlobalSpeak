import React, { useEffect, useState } from 'react';
import SectionTItle from '../../Components/SectionTItle';
import PopInstructorCard from '../../Components/PopInstructorCard';

const AllInstructors = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/').then(res => res.json()).then(data => setInstructors(data))
    }, [])
    return (
        <>
            <div className='my-28'>
                <SectionTItle title={'All Instructors'} subTitle={'Guiding Knowledge, Inspiring Minds: The World of'} />
            </div>
            <div className="MyContainer grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    instructors?.map(pInstructor => <PopInstructorCard key={pInstructor._id} pInstructor={pInstructor} />)
                }
            </div>

        </>
    );
};

export default AllInstructors;