import React, { useEffect, useState } from 'react';
import SectionTItle from '../../../Components/SectionTItle';
import ClassCard from '../../../Components/ClassCard';
import Fade from 'react-reveal/Fade';


const PopularClasses = () => {
    const [data, setData] = useState()
    useEffect(() => {

        fetch('https://summercampgs.vercel.app/').then(res => res.json()).then(data => {
            console.log(data);
            const topClasses = data.filter(cItems => cItems.numberOfStudents >= 50)
            setData(topClasses)
        }
        )
    }, [])

    return (
        <div>
            <Fade left>
                <SectionTItle title={'Popular Classes'} subTitle={'Exploring the Trend: Popular Classes Unveiled'} />
            </Fade>

            <div className='my-[130px]  grid md:grid-cols-2  lg:grid-cols-3 gap-5 MyContainer'>
                {
                    data?.map(pClass => <ClassCard key={pClass._id} pClass={pClass} />)
                }
            </div>

        </div>
    );
};

export default PopularClasses;