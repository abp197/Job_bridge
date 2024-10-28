import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant.js';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;

        // Convert salary to a number and validate position as number
        setInput((prevState) => ({
            ...prevState,
            [name]: name === 'salary' || name === 'position' ? Number(value) : value
        }));
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany ? selectedCompany._id : "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        setErrorMessage(""); // Reset error message

        // Validation: Check for required fields
        if (!input.title || !input.description || !input.companyId) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        // Check if salary is a valid number greater than 0
        if (isNaN(input.salary) || input.salary <= 0) {
            setErrorMessage("Please provide a valid salary greater than 0.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                alert(res.data.message); // Replace this with your preferred notification method
                navigate("/admin/jobs");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('')" }} // Replace with your background image path
        >
            <Navbar />
            <div className='p-8 max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-2xl transform transition hover:scale-105 hover:shadow-3xl'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Post a New Job</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience', 'position'].map((field, index) => (
                            <div key={index} className="transform hover:scale-105 transition duration-300">
                                <label className="block font-medium text-gray-700 capitalize">{field}</label>
                                <input
                                    type={field === 'position' || field === 'salary' ? 'number' : 'text'} // Ensure salary and position are numbers
                                    name={field}
                                    value={input[field]}
                                    onChange={changeEventHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition"
                                    required={field !== 'position'} // Optional for position
                                />
                            </div>
                        ))}
                        {companies.length > 0 && (
                            <div className="col-span-2">
                                <label className="block font-medium text-gray-700">Select Company</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-lg my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition"
                                    onChange={(e) => selectChangeHandler(e.target.value)}
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Select a Company</option>
                                    {companies.map((company) => (
                                        <option key={company._id} value={company.name.toLowerCase()}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    {errorMessage && (
                        <p className='text-red-600 font-bold text-center my-3'>
                            {errorMessage}
                        </p>
                    )}

                    {loading ? (
                        <button
                            className="w-full my-4 px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center"
                            disabled
                        >
                            <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                            Posting job...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full my-4 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transform transition duration-300"
                        >
                            Post New Job
                        </button>
                    )}
                    
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first, before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
