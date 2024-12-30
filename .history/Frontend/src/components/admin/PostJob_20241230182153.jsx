/* eslint-disable no-unused-vars */
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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
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
    setErrorMessage("");

    // Validation
    if (!input.title || !input.description || !input.companyId) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (isNaN(input.salary) || input.salary <= 0) {
      setErrorMessage("Please provide a valid salary greater than 0.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=' bg-slate-400'>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5 ">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
          <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
          <div className="grid grid-cols-2 gap-2 bg">
            {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience', 'position'].map((field, index) => (
              <div key={index}>
                <label className="block font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type={field === 'position' || field === 'salary' ? 'number' : 'text'}
                  name={field}
                  value={input[field]}
                  onChange={changeEventHandler}
                  className="w-full p-2 border border-gray-300 rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={field !== 'position'}
                />
              </div>
            ))}

            {companies.length > 0 && (
              <div className="col-span-2">
                <label className="block font-medium text-gray-700">Select Company</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <p className="text-red-600 font-bold text-center my-3">{errorMessage}</p>
          )}

          {loading ? (
            <button
              className="w-full my-4 px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full my-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Post New Job
            </button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
