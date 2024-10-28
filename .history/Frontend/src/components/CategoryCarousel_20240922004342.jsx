import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../components/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <Box className="w-full max-w-xl mx-auto my-20">
            <Carousel
                autoPlay={false}
                navButtonsAlwaysVisible
                animation="slide"
                indicators={false}
            >
                {category.map((cat, index) => (
                    <Box key={index} display="flex" justifyContent="center" p={2}>
                        <Button 
                            onClick={() => searchJobHandler(cat)} 
                            variant="outlined" 
                            className="rounded-full"
                            size="large"
                        >
                            {cat}
                        </Button>
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default CategoryCarousel;
