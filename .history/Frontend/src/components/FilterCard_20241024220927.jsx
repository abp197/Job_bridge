/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '';

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
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <FormControl component="fieldset" key={index}>
                    <FormLabel component="legend" className='font-bold text-lg'>{data.filterType}</FormLabel>
                    <RadioGroup value={selectedValue} onChange={changeHandler}>
                        {data.array.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                value={item}
                                control={<Radio />}
                                label={item}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            ))}
        </div>
    );
}

export default FilterCard;
