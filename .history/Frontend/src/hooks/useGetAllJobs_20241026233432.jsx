import { setAllJobs } from '../components/redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const yourAuthToken = localStorage.getItem('authToken'); // Retrieve the token from storage or state
                if (!yourAuthToken) {
                    console.error("Authorization token is missing.");
                    return;
                }

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
        
        fetchAllJobs();
    }, [dispatch, searchedQuery]); // Include dependencies to rerun on dispatch and searchedQuery change
};

export default useGetAllJobs;
