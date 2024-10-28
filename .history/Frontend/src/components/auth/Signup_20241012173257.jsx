/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant.js'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../'

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
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    // formData object
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
    }

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
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="patel"
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                        />
                    </div>
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between my-5'>
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup
                            row
                            value={input.role}
                            onChange={changeEventHandler}
                            name="role"
                        >
                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </div>
                    <div className='my-2'>
                        <Button
                            variant="contained"
                            component="label"
                            className='w-full my-4'
                        >
                            Upload Profile Image
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={changeFileHandler}
                            />
                        </Button>
                    </div>
                    {
                        loading ?
                            <Button fullWidth variant="contained" className="w-full my-4" disabled>
                                <CircularProgress size={24} className="mr-2" /> Please wait
                            </Button> :
                            <Button fullWidth variant="contained" color="primary" type="submit" className="w-full my-4">
                                Signup
                            </Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;
