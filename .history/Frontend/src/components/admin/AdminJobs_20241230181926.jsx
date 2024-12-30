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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-100 to-indigo-50 bg-gray-400" style={{ backgroundImage: 'url("")' }}>
            
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 bg-white p-8 rounded-lg shadow-lg'>
        <div className='flex items-center justify-between my-5'>
          {/* Search input with icon */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2h8m-8 4h.01" />
            </svg>
          </div>

          {/* New Jobs button with hover and animation */}
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-indigo-700"
          >
            + New Job
          </button>
        </div>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
