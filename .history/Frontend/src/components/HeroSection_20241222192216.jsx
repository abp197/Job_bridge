/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../src/components/redux/jobSlice.js';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import CategoryCarousel from './CategoryCarousel';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div
            className="relative bg-cover bg-center"
            style={{
                backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_1280.jpg)'
            }}
        >
            <div className="text-center bg-black bg-opacity-50 p-5 sm:p-10">
                <div className="flex flex-col gap-5 my-6 sm:my-10">
                    <span className="mx-auto px-3 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
                        No. 1 Job Hunt Website
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        Search, Apply & <br />
                        Get Your <span className="text-[#3917f8]">Dream Jobs</span>
                    </h1>
                    <p className="text-white text-sm sm:text-base lg:text-xl px-2 sm:px-0">
                        Welcome to JobBridge, your ultimate job portal designed to connect talent with opportunity. Explore a diverse
                        range of job listings tailored to your skills and aspirations, whether you're a job seeker or a recruiter. With an intuitive interface
                        and personalized features, we empower you to find the perfect match in today's competitive job market. Join us today and take the next
                        step in your career journey!
                    </p>
                    <div className="flex w-[90%] sm:w-[70%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto">
                        <input
                            type="text"
                            placeholder="Find your dream jobs"
                            onChange={(e) => setQuery(e.target.value)}
                            className="outline-none border-none w-full p-2 text-sm sm:text-base"
                        />
                        <button onClick={searchJobHandler} className="rounded-r-full bg-[#3917f8] text-white p-2 sm:p-3">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                    </div>
                </div>
                <div>
                    <CategoryCarousel />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
