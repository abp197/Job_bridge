import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, Button, Container, Grid } from '@mui/material';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div
            style={{
                backgroundImage: 'url("https://cdn.pixabay.com/photo/2022/04/04/16/25/business-7111768_1280.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <Navbar />
            <Container 
                maxWidth="lg" 
                sx={{ 
                    my: 10, 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for better text visibility
                    borderRadius: 2, 
                    p: 3 
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
                    <TextField
                        label="Filter by name"
                        variant="outlined"
                        size="small"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={() => navigate("/admin/companies/create")}>
                        New Company
                    </Button>
                </Grid>
                <CompaniesTable />
            </Container>
        </div>
    );
};

export default Companies;
