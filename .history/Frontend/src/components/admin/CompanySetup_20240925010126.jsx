import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

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
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
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
                    <div className='grid grid-cols-2 gap-4'>
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
