import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../redux/companySlice.js';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For storing error messages
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                alert(res.data.message); // Replace with your own notification logic
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            const message = error.response?.data?.message || "An error occurred while creating the company.";
            setErrorMessage(message);
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
                    <div className='mb-10'>
                        <h1 className='font-bold text-3xl text-indigo-600 mb-4'>Create Your Company</h1>
                        <p className='text-gray-500 text-sm'>What would you like to name your company? You can change it later if needed.</p>
                    </div>

                    {/* Error message display */}
                    {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}

                    {/* Input for Company Name */}
                    <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    <div className='flex items-center justify-between gap-4 mt-8'>
                        <button
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-200"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-200"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
