/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../components/redux/jobSlice.js';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, loading } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className=' ' >
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4' >
                <h1 className='font-bold text-2xl text-center mb-6'>
                    Search Results ({allJobs.length})
                </h1>
                
                {/* Loading State */}
                {loading ? (
                    <div className="text-center text-lg text-gray-500">Loading...</div>
                ) : (
                    <>
                        {/* No Jobs Available */}
                        {allJobs.length === 0 ? (
                            <div className="text-center text-xl text-gray-600 mt-10">
                                No Jobs Available
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {allJobs.map((job) => (
                                    <Job key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Browse;
