import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, Button, Container, Grid } from '@mui/material';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

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
