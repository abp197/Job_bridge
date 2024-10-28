import { setAllJobs } from '../components/redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant.js';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    
   