/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../redux/applicationSlice';
import { toast } from 'sonner'; // Assuming you want to use toast for notifications

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchAllApplicants = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job)); // Assuming res.data.job contains the applicants data
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch applicants.'); // Notify user on error
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAllApplicants();
    }, [dispatch, params.id]); // Add dependencies

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
                    Applicants ({applicants?.applications?.length || 0})
                </h1>
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <p className="text-gray-500 text-center text-sm sm:text-base">Loading...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <ApplicantsTable />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applicants;
