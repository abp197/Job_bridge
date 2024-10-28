import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// Comment out Popover and MoreHorizontal for debugging
// import Popover from 'react-tiny-popover';
// import { MoreHorizontal } from 'lucide-react';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [isPopoverOpen, setIsPopoverOpen] = useState(null);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                console.log(res.data.message); // Replace toast with console log
            }
        } catch (error) {
            console.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <caption className="p-4 text-lg font-medium text-left">A list of your recently applied users</caption>
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Resume</th>
                        <th className="p-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="p-3 text-right text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants?.applications?.length > 0 ? (
                        applicants.applications.map((item) => (
                            <tr key={item._id} className="border-t">
                                <td className="p-3">{item?.applicant?.fullname || "NA"}</td>
                                <td className="p-3">{item?.applicant?.email || "NA"}</td>
                                <td className="p-3">{item?.applicant?.phoneNumber || "NA"}</td>
                                <td className="p-3">
                                    {item?.applicant?.profile?.resume ? (
                                        <a className="text-blue-600 hover:underline" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </td>
                                <td className="p-3">{item?.applicant?.createdAt.split("T")[0] || "NA"}</td>
                                <td className="p-3 text-right">
                                    <div>
                                        {/* Replace with your custom button for now */}
                                        Action Button
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-3 text-center">No applicants found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTable;
