import React, { useEffect, useState } from 'react';
import ClassCard from '../../Components/ClassCard';
import SectionTItle from '../../Components/SectionTItle';

const Classes = () => {
    const [Class, setClass] = useState([])
    const classes = true;
    useEffect(() => {
        fetch('https://summercampgs.vercel.app').then(res => res.json()).then(data => setClass(data))
    }, [])

    return (
        <>
            <div className='my-28'>
                <SectionTItle title={'All Classes'} subTitle={'Unlock Your Potential: Exploring the World of '} />
            </div>

            <div className='MyContainer grid md:grid-cols-2 lg:grid-cols-3 gap-10 '>
                {Class.map(pClass => <ClassCard key={pClass._id} pClass={pClass} classes={classes} />)}
            </div>
        </>
    );
};

export default Classes;