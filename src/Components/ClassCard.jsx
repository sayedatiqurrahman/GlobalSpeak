
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import useToast from '../Hooks/useToast';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ClassCard = ({ pClass, classes }) => {
    const [axiosSecure] = useAxiosSecure()
    let disabled = false;
    const { user } = useAuth()
    const [Toast] = useToast()

    const { languageImage, courseEnrollDeadline, foreignLanguageName, teacherName, availableSeat, price, _id } = pClass

    if (user) {
        const [userRole] = useUserRole()
        if (userRole === "Instructor" || userRole === "Admin" || availableSeat === 0) {
            console.log(userRole);
            disabled = true
        }
    }

    const handleBook = (id) => {

        if (!user) {
            Toast.fire({
                icon: "error",
                title: "Please login first to book this course"
            })
            return
        } else {
            const StudentEmail = user.email
            const bookedData = {
                bookedClass: id, foreignLanguageName, price, languageImage, teacherName,
                StudentEmail
            }
            axiosSecure.post('/mySelectedClass', bookedData).then(data => {
                console.log(data.data);
                if (data.data.error) {
                    Toast.fire({
                        icon: "error",
                        title: data.data.message
                    })
                } else {
                    Toast.fire({
                        icon: "success",
                        title: "Booked this course successfully"
                    })
                }


            })
        }

    }
    return (
        <div>
            <div className={availableSeat === 0 ? "card w-96 bg-red-600 text-white shadow-xl" : "card w-96 bg-base-100 shadow-xl"}>
                <figure><img className='h-52 w-full' src={languageImage} alt="Language image" /></figure>
                <div className="card-body">
                    {/* name of foreign language */}
                    <h2 className="card-title">{foreignLanguageName}</h2>

                    <p><b>Instructor Name:</b> {teacherName}</p>
                    {
                        classes ? <>
                            <p><b>Price:</b> ${price}</p>
                        </> : <></>
                    }
                    <div className="card-actions justify-end">
                        <div className="badge outline outline-1 outline-[#f55400]">Deadline: {courseEnrollDeadline}</div>
                        <div className="badge outline outline-1 outline-[#f55400]">Available Seat: {availableSeat}</div>

                    </div>
                    {
                        classes && <button onClick={() => handleBook(_id)} disabled={disabled} className='btn border border-[#f55400] text-[#f55400] hover:bg-[#f55400] hover:text-white relative top-8 border-b-0 rounded-t-full'>Book</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ClassCard;