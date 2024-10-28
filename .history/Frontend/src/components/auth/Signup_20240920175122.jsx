import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice.js';
import { Loader2 } from 'lucide-react';

// Material-UI imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector((store) => store.auth);
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
            console.error(error);
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
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    
                    {/* Full Name Input */}
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            variant="outlined"
                        />
                    </div>
                    
                    {/* Email Input */}
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            variant="outlined"
                            type="email"
                        />
                    </div>
                    
                    {/* Phone Number Input */}
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            variant="outlined"
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="password"
                            variant="outlined"
                            type="password"
                        />
                    </div>

                    {/* Role Selection (Radio Buttons) */}
                    <FormLabel component="legend" className="my-4">Select Role</FormLabel>
                    <RadioGroup row value={input.role} onChange={changeEventHandler} name="role">
                        <FormControlLabel
                            value="student"
                            control={<Radio />}
                            label="Student"
                        />
                        <FormControlLabel
                            value="recruiter"
                            control={<Radio />}
                            label="Recruiter"
                        />
                    </RadioGroup>

                    {/* Profile Upload */}
                    <div className="my-4">
                        <Button variant="contained" component="label">
                            Upload Profile
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </Button>
                        {input.file && (
                            <Avatar
                                src={URL.createObjectURL(input.file)}
                                alt="Profile Preview"
                                sx={{ width: 56, height: 56, marginTop: '10px' }}
                            />
                        )}
                    </div>

                    {/* Loading and Submit Button */}
                    {loading ? (
                        <Button variant="outlined" className="w-full my-4" disabled>
                            <CircularProgress size={24} />
                            &nbsp;Please wait
                        </Button>
                    ) : (
                        <Button type="submit" variant="contained" color="primary" className="w-full my-4">
                            Signup
                        </Button>
                    )}

                    <span className="text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600">
                            Login
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
