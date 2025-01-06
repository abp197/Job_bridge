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
    }, [input, dispatch]);

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181951_960_720.jpg')" }}>
            <Navbar />
            <Container maxWidth="lg" className="my-10 bg-opacity-80 rounded-lg">
                <Paper elevation={3} className="p-4 rounded-lg">
                    <Typography variant="h4" component="h1" className="mb-3 font-bold text-gray-800 text-center sm:text-left">
                        Companies Management
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2} className="mb-5">
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Filter by name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} className="text-center sm:text-right">
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

