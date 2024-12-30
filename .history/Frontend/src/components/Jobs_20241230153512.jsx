/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-gray-100" 
            style={{
                backgroundImage: "url('')"
            }}
        >
            <Navbar />
            <div className="bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto mt-10">
                    <div className="flex gap-5">
                        <div className="w-1/4 bg-white p-5 rounded-lg shadow-md">
                            <FilterCard />
                        </div>
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            {filterJobs.length <= 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <span className="text-xl text-gray-500">Job not found</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filterJobs.map((job) => (
                                        job && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job._id}
                                                className="transition-transform transform hover:scale-105"
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
