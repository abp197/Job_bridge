import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
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
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
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
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-indigo-50">
            <Navbar />
            <div className="flex justify-center py-10">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                    <form onSubmit={submitHandler}>
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/companies")}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-500 font-semibold hover:bg-gray-100 transition"
                            >
                                <ArrowLeft />
                                <span>Back</span>
                            </button>
                            <h1 className="text-2xl font-bold text-indigo-600">Company Setup</h1>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter company name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter company description"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter website URL"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter location"
                                />
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-gray-700 font-semibold mb-2">Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center cursor-not-allowed">
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                Please wait
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                            >
                                Update Company
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanySetup;
