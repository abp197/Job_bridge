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
        <div>
            <Navbar />
            <Container maxWidth="lg" sx={{ my: 10 }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        Companies Management
                    </Typography>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
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
                        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("/admin/companies/create")}
                                sx={{
                                    mt: { xs: 2, md: 0 },
                                    borderRadius: '20px',
                                    paddingX: 3,
                                    fontSize: '16px',
                                }}
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
