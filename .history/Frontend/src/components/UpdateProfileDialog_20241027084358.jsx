/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { setUser } from '../components/redux/authSlice.js';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
        setOpen(false);
    };

    return (
        open && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                <div className='bg-white rounded-lg shadow-lg p-8 w-96'>
                    <h2 className='text-xl font-bold mb-4'>Update Profile</h2>
                    <form onSubmit={submitHandler}>
                        <div className='mb-4'>
                            <label htmlFor="fullname" className='block mb-1'>Full Name</label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block mb-1'>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="phoneNumber" className='block mb-1'>Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="bio" className='block mb-1'>Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="skills" className='block mb-1'>Skills (comma separated)</label>
                            <input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="file" className='block mb-1'>Resume</label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className='w-full border border-gray-300 p-2 rounded'
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 rounded bg-blue-600 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default UpdateProfileDialog;
