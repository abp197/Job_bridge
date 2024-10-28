import { setAllJobs } from '../components/redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.jobs);
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            const yourAuthToken = localStorage.getItem('authToken');  // Get token

            if (!yourAuthToken) {
                console.error("Authorization token is missing.");
                return;  // Stop here if no token
            }

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${yourAuthToken}`,
                    },
                });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        if (localStorage.getItem('authToken')) {  // Only call fetchAllJobs if token exists
            fetchAllJobs();
        }
    }, [dispatch, searchedQuery]);  // Dependencies

};

export default useGetAllJobs;
