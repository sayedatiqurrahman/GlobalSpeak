import React from 'react';

const EnrolledClasses = () => {
    return (
        <div>
        <SectionTItle title={"Payment History"} subTitle={"Payment Chronicles: A History of Financial Transactions"} />

        <div className="overflow-x-auto w-full mt-16">
            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>TransictionsID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((item, index) => <tr
                            key={item._id}
                        >
                            <td>
                                {index + 1}
                            </td>

                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td className="">${item.price}</td>
                            <td>
                                {item.transictionId}
                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    </div>
    );
};

export default EnrolledClasses;