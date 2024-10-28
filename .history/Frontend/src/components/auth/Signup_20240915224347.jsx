import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { USER_API_END_POINT } from '../../utils/constant';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { useDispatch } from 'react-redux'; // Import for dispatch (if using Redux)
//import { setLoading } from '../../redux/actions'; // Import your setLoading action (adjust path as needed)
import { toast } from 'react-toastify'; // Import for toast notifications

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch(); // Initialize dispatch (if using Redux)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); // Create new FormData object
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      dispatch(setLoading(true)); // Assuming you're using Redux for loading state
      const res = await axios.post(`${USER_API_END_POINT}/register`, data, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login"); // Navigate to login on success
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/05/88/11/91/240_F_588119127_ai0xZYPNgiPvEebGlR19I0O90qF2SILQ.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your role</option>
                <option value="user">Student</option>
                <option value="admin">Recruiter</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="file" className="block text-gray-700 font-medium mb-1">Upload File</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
