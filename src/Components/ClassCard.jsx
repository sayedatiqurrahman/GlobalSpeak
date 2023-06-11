import React from 'react';

const ClassCard = ({ pClass }) => {
    const { languageImage, courseEnrollDeadline, foreignLanguageName, teacherName, availableSeat } = pClass
    return (
        <div>
            <div className={ availableSeat === 0 ? "card w-96 bg-red-600 text-white shadow-xl" :"card w-96 bg-base-100 shadow-xl"}>
                <figure><img className='h-52 w-full' src={languageImage} alt="Language image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{foreignLanguageName}</h2>
                    <p>Teacher Name: {teacherName}</p>
                    <div className="card-actions justify-end">
                        <div className="badge outline outline-1 outline-[#f55400]">Deadline: {courseEnrollDeadline}</div>
                        <div className="badge outline outline-1 outline-[#f55400]">Available Seat: {availableSeat}</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;