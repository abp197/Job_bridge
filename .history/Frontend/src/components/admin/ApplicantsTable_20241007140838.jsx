/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Popover from 'react-tiny-popover'; // Ensure this import is correct
import { MoreHorizontal } from 'lucide-react';
import {APPLICATION_API_END_POINT} from '../../utils/constant.js'
import { ApplicantsTable } from './ApplicantsTable';


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
                                    <Popover
                                        isOpen={isPopoverOpen === item._id}
                                        position={['top', 'left', 'right']}
                                        onClickOutside={() => setIsPopoverOpen(null)}
                                        content={(
                                            <div className="w-32 p-2 bg-white border rounded shadow-lg">
                                                {shortlistingStatus.map((status, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            statusHandler(status, item._id);
                                                            setIsPopoverOpen(null);
                                                        }}
                                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                                    >
                                                        {status}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    >
                                        <button
                                            onClick={() => setIsPopoverOpen(isPopoverOpen === item._id ? null : item._id)}
                                            className="p-1 focus:outline-none"
                                        >
                                            <MoreHorizontal />
                                        </button>
                                    </Popover>
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
