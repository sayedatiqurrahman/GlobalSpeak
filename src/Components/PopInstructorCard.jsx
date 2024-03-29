import React from 'react';

const PopInstructorCard = ({ pInstructor }) => {


    const { numberOfStudents, courseEnrollDeadline, foreignLanguageName, teacherName, teacherImage, email, availableSeat, status } = pInstructor
    return (
        <>
            {
                status === "approved" && <div className="card  bg-base-100 shadow-xl">
                    <figure><img className='h-52 w-full' src={teacherImage} alt="Language image" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{teacherName}</h2>
                        <p><b>Tutor Of:</b> {foreignLanguageName} Language</p>
                        <p><b>Students:</b> {numberOfStudents}</p>
                        <p><b>Email:</b> {email}</p>
                        <div className="card-actions justify-end">
                            <div className="badge outline outline-1 outline-[#f55400]">Deadline: {courseEnrollDeadline}</div>
                            <div className="badge outline outline-1 outline-[#f55400]">Available Seats: {availableSeat}</div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PopInstructorCard;