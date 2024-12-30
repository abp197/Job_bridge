/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../components/redux/jobSlice';

const filterData = [
    { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"] },
    { filterType: "Industry", array: ["Frontend Developer", "Backend Developer", "FullStack Developer"] },
    { filterType: "Salary", array: ["0-40k", "42-1lakh", "1lakh to 5lakh"] },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (event) => {
        setSelectedValue(event.target.value);
    };

    const clearFilters = () => {
        setSelectedValue('');
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <h1 className="font-semibold text-xl mb-4">Filter Jobs</h1>
            <hr className="my-2" />
            
            {filterData.map((data, index) => (
                <div key={index} className="mb-4">
                    <FormControl component="fieldset">
                        <FormLabel component="legend" className="font-semibold text-lg">{data.filterType}</FormLabel>
                        <RadioGroup value={selectedValue} onChange={changeHandler}>
                            {data.array.map((item, idx) => (
                                <FormControlLabel
                                    key={idx}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                    className="mb-2"
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>
            ))}
            
            {/* Clear Filters Button */}
            <Button
                onClick={clearFilters}
                variant="outlined"
                color="primary"
                fullWidth
                className="mt-4"
            >
                Clear Filters
            </Button>
        </div>
    );
};

export default FilterCard;
