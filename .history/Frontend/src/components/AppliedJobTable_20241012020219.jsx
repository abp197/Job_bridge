// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Badge
} from '@mui/material';
import { fetchAppliedJobs } from './';  // Assuming you have a function to fetch applied jobs

const AppliedJobTable = () => {
    const dispatch = useDispatch();
    const { allAppliedJobs = [] } = useSelector(store => store.job);

    // Fetch applied jobs on component mount
    useEffect(() => {
        dispatch(fetchAppliedJobs());  // Make sure this function dispatches an action to fetch applied jobs
    }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                A list of your applied jobs
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                You have not applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell align="right">
                                    <Badge 
                                        color={
                                            appliedJob?.status === "rejected" ? 'error' :
                                            appliedJob?.status === 'pending' ? 'warning' : 
                                            'success'
                                        }
                                        variant="dot"
                                    >
                                        {appliedJob?.status ? appliedJob.status.toUpperCase() : 'N/A'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AppliedJobTable;
