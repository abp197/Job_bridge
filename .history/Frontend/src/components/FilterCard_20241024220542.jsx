import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '../../src/components'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setSelectedValue(e.target.value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index}>
                        <h2 className='font-bold text-lg mt-4'>{data.filterType}</h2>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                                        <input
                                            type="radio"
                                            id={itemId}
                                            name={data.filterType}
                                            value={item}
                                            checked={selectedValue === item}
                                            onChange={changeHandler}
                                            className="cursor-pointer"
                                        />
                                        <label htmlFor={itemId} className="cursor-pointer">{item}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard;
