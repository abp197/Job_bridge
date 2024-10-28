/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          {/* Native input element with Tailwind styling */}
          <input
            type="text"
            className="w-fit p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          
          {/* Native button element with Tailwind styling */}
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            New Jobs
          </button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
