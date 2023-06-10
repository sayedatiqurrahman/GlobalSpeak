import React from 'react';

const ClassCard = ({ pClass }) => {
    const { languageImage, courseEnrollDeadline, foreignLanguageName, teacherName } = pClass
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img className='h-52 w-full' src={languageImage} alt="Language image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{foreignLanguageName}</h2>
                    <p>Teacher Name: {teacherName}</p>
                    <div className="card-actions justify-end">
                        <div className="badge outline outline-1 outline-[#f55400]">Deadline: {courseEnrollDeadline}</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;