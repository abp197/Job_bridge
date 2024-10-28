import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../../utils/constant.js';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(${`USER_API_END_POINT}/register`}, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <form onSubmit={submitHandler} className="space-y-6">
            <h1 className="font-extrabold text-2xl text-center text-gray-900 mb-6">Create Account</h1>

            <div className="grid gap-4">
              <div className="relative">
                <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name='fullname'
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder="Enter your name"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-200"
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={input.email}
                  name='email'
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-200"
                />
              </div>

              <div className="relative">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name='phoneNumber'
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-200"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter your password"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-200"
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    className="form-radio h-4 w-4 text-purple-600"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                  />
                  <label htmlFor="student" className="text-sm text-gray-700">Student</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    className="form-radio h-4 w-4 text-purple-600"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                  />
                  <label htmlFor="recruiter" className="text-sm text-gray-700">Recruiter</label>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="file" className="text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-200 cursor-pointer"
                />
              </div>

              <div>
                <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition duration-200">
                  Signup
                </button>
              </div>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;