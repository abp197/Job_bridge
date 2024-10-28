import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice.js';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

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
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-set-paper-sheets-with-copy-space_23-2148320447.jpg")' }}>
      <Navbar />
      <div className='flex items-center justify-center min-h-screen'>
        <form onSubmit={submitHandler} className='bg-white border border-gray-200 rounded-lg shadow-lg p-8 my-10 max-w-md w-full'>
          <h1 className='font-bold text-2xl mb-5 text-center text-gray-800'>Create Your Account</h1>

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            margin="normal"
            variant="outlined"
            className="rounded-md"
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={input.email}
            onChange={changeEventHandler}
            margin="normal"
            variant="outlined"
            className="rounded-md"
          />

          {/* Phone Number */}
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            margin="normal"
            variant="outlined"
            className="rounded-md"
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={input.password}
            onChange={changeEventHandler}
            margin="normal"
            variant="outlined"
            className="rounded-md"
          />

          {/* Role */}
          <FormControl component="fieldset" className='my-4'>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              name="role"
              value={input.role}
              onChange={changeEventHandler}
              row
            >
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
            </RadioGroup>
          </FormControl>

          {/* File Upload */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            className="my-4 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Upload Profile
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={changeFileHandler}
            />
          </Button>

          {/* Submit Button */}
          {loading ? (
            <Button variant="contained" fullWidth disabled className="bg-gray-600 mt-3">
              <CircularProgress size={24} />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="my-4"
            >
              Signup
            </Button>
          )}

          <div className='text-center'>
            <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
