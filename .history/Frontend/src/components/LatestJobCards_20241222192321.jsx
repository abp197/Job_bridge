/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-4 sm:p-5 rounded-md shadow-md sm:shadow-xl bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl max-w-full"
        >
            <div>
                <h1 className="font-medium text-base sm:text-lg truncate">{job?.company?.name}</h1>
                <p className="text-xs sm:text-sm text-gray-500">India</p>
            </div>
            <div>
                <h1 className="font-bold text-sm sm:text-lg my-2">{job?.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm py-1 px-2 rounded">
                    {job?.position} Positions
                </span>
                <span className="bg-[#f77c60] text-white font-bold text-xs sm:text-sm py-1 px-2 rounded">
                    {job?.jobType}
                </span>
                <span className="bg-[#445cf9] text-white font-bold text-xs sm:text-sm py-1 px-2 rounded">
                    {job?.salary} LPA
                </span>
            </div>
        </div>
    );
};

export default LatestJobCards;
