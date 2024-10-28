/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const Job = ({ 03
    job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className='p-5 rounded-md shadow-lg bg-white border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <button className="rounded-full p-1 border border-gray-300 transition-colors hover:bg-gray-200">
                    <Bookmark />
                </button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <button className="p-1 border border-gray-300 rounded-full transition-transform hover:scale-105">
                    <img src={job?.company?.logo || ''} alt={job?.company?.name || 'Company Logo'} className="w-12 h-12 rounded-full" />
                </button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name || "Company Name"}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location || "Location"}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title || "Job Title"}</h1>
                <p className='text-sm text-gray-600'>{job?.description || "Job Description"}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className='badge bg-blue-100 text-blue-700 font-bold py-1 px-2 rounded'>{job?.position || 0} Positions</span>
                <span className='badge bg-[#df5d40] text-white font-bold py-1 px-2 rounded'>{job?.jobType || "N/A"}</span>
                <span className='badge bg-[#455de8] text-white font-bold py-1 px-2 rounded'>{job?.salary || "N/A"} LPA</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <button
                    onClick={() => job?._id && navigate(`/description/${job._id}`)}
                    className="p-2 border border-gray-300 rounded-md transition-colors hover:bg-gray-100"
                >
                    Details
                </button>

                <button className="bg-[#435ce9] text-white p-2 rounded-md transition-colors hover:bg-[#6c0db3]">
                    Save For Later
                </button>
            </div>
        </div>
    );
};

export default Job;
