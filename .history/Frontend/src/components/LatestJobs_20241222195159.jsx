/* eslint-disable no-unused-vars */
import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-semibold text-center'>
                <span className='text-[rgb(40,103,250)]'>Latest & Top </span> Job Openings
            </h1>
            <p className='text-center text-lg mt-3 text-gray-500'>
                Discover the best job opportunities available right now.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className="col-span-full text-center text-xl text-gray-600">
                            No Jobs Available
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default LatestJobs;
