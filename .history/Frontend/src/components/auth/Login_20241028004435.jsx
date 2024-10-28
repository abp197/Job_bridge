/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice.js';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const [notification, setNotification] = useState(""); // State for notification message

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setNotification(""); // Clear notification on input change
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setNotification("Login successful!"); // Set success notification
                setTimeout(() => navigate("/"), 1500); // Redirect after 1.5s delay
            } else {
                setNotification(res.data.message || "Something went wrong, please try again.");
            }
        } catch (error) {
            setNotification(error.response?.data?.message || "Login failed. Please try again.");
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
                <form onSubmit={submitHandler} className='border border-gray-200 rounded-lg shadow-lg p-8 my-10 max-w-md w-full'>
                    <h1 className='font-bold text-2xl mb-5 text-center text-gray-800'>Login to Your Account</h1>

                    {/* Notification Message */}
                    {notification && (
                        <div className={`mb-4 text-center ${notification === "Login successful!" ? "text-green-600" : "text-red-600"}`}>
                            {notification}
                        </div>
                    )}

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

                    {/* Role Selection */}
                    <FormControl component="fieldset" className='my-4'>
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup
                            name="role"
                            value={input.role}
                            onChange={changeEventHandler}
                            row
                        >
                            <FormControlLabel value="" control={<Radio />} label="Job Seeker" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </FormControl>

                    {/* Submit Button */}
                    {loading ? (
                        <Button variant="contained" fullWidth disabled className="bg-gray-600">
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
                            Login
                        </Button>
                    )}

                    <div className='text-center'>
                        <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-red-900 hover:underline'>Signup</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
