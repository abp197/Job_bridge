import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById.jsx';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div
            className="bg-cover bg-center min-h-screen"
            style={{ backgroundImage: "url('https://files.oaiusercontent.com/file-8bFTdmajlUXiJbT3kUfIfaI8?se=2024-10-07T18%3A45%3A58Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De691edf6-f2cd-40bb-8030-c9de145d63d7.webp&sig=zTXkStz8PGZFM7BN/6u6oyiegMBhvRNx9ubMbcWsZx4%3D')" }}
        >
            <Navbar />
            <div className='max-w-xl mx-auto my-10 bg-white p-8 rounded-md shadow-md'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5'>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-500 font-semibold hover:bg-gray-100"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 my-4'>
                        <div>
                            <label className="block font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Website</label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="w-full p-2 border border-gray-300 rounded-md my-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <button className="w-full my-4 px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </button>
                        ) : (
                            <button type="submit" className="w-full my-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Update
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
