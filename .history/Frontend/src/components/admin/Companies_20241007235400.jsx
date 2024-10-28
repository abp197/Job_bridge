import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, Button, Container, Grid, Paper, Typography } from '@mui/material';
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
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2019/02/14/22/06/table-3997521_1280.jpg')" }}>
            <Navbar />
            <Container maxWidth="lg" className="my-10  bg-opacity-80 rounded-lg">
                <Paper elevation={3} className="p-4 rounded-lg">
                    <Typography variant="h4" component="h1" className="mb-3 font-bold text-gray-800">
                        Companies Management
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center" className="mb-5">
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Filter by name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className="text-right">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/admin/companies/create")}
                                className="mt-2 md:mt-0 rounded-full px-6 text-lg"
                            >
                                New Company
                            </Button>
                        </Grid>
                    </Grid>
                    <CompaniesTable />
                </Paper>
            </Container>
        </div>
    );
};

export default Companies;
