import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTItle from '../../../../Components/SectionTItle';
import ClassCard from '../../../../Components/ClassCard';

const EnrolledClasses = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: EnrolledClass = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure('/enrolledClasses')
            const data = await res.data
            return data
        }
    })
    console.log(EnrolledClass)
    const classes = false;
    return (
        <div className='MyContainer'>
            <SectionTItle title={"Enrolled Classes"} subTitle={"Curriculum Snapshot: Exploring Your"} />

            <div className='mt-10 grid md:grid-cols-2 2xl:grid-cols-3 gap-3'>
                {
                    EnrolledClass.map(pClass => <ClassCard pClass={pClass} classes={classes} />)
                }
            </div>

        </div>
    );
};

export default EnrolledClasses;