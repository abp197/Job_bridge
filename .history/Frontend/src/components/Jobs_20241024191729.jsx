/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material'; // Material UI spinner

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        setLoading(true); // Set loading to true while filtering
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
        setLoading(false); // Set loading to false after filtering
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    {/* Filter section */}
                    <div className='w-1/5'>
                        <FilterCard />
                    </div>
                    {/* Jobs listing section */}
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {loading ? ( 
                            // Loading spinner using Material UI CircularProgress
                            <div className="flex justify-center items-center h-full">
                                <CircularProgress size={50} />
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            // Message when no jobs are found
                            <div className="flex justify-center items-center h-full">
                                <span className="text-gray-500 text-lg">Job not found</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
