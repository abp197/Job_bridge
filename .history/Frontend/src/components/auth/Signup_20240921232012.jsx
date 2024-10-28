import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';

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
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            margin="normal"
            variant="outlined"
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
            className="my-4"
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
            <Button variant="contained" fullWidth disabled>
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

          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
