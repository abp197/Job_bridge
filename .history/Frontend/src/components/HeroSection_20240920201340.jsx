import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../src/components/redux/jobSlice.js';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
      <div className="relative bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_1280.jpg)' }}>
        <div className='text-center bg-black bg-opacity-50 p-10'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold text-white'>Search, Apply & <br /> Get Your <span className='text-[#3917f8]'>Dream Jobs</span></h1>
                <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full p-2'
                    />
                    <button onClick={searchJobHandler} className="rounded-r-full bg-[#6917f6] text-white p-2">
                        <Search className='h-5 w-5' />
                    </button>
                </div>
            </div>
        </div>
      </div>
    );
}

export default HeroSection;
