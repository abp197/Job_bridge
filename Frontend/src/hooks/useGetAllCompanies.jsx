import { setCompanies } from '../components/redux/companySlice';
import { COMPANY_API_END_POINT } from '../utils/constant.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` } // Include the token in the request headers
                });
                console.log('called');
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
