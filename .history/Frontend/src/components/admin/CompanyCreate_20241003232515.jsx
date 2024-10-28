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
                // Show success message instead of toast
                alert(res.data.message); // Replace with your own notification logic
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            // Handle error and set error message
            const message = error.response?.data?.message || "An error occurred while creating the company.";
            setErrorMessage(message);
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>

                {/* Error message display */}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                {/* Input for Company Name */}
                <label className="block font-medium text-gray-700">Company Name</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                
                <div className='flex items-center gap-2 my-10'>
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;


