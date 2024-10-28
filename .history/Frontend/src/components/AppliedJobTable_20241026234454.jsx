/* eslint-disable no-unused-vars */
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Typography, Chip } from '@mui/material';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2, fontWeight: 'bold' }}>
                A list of your applied jobs
            </Typography>
            <Table aria-label="applied jobs table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Job Role</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography variant="body2">You haven't applied to any jobs yet.</Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={appliedJob.status.toUpperCase()}
                                        color={
                                            appliedJob?.status === 'rejected'
                                                ? 'error'
                                                : appliedJob.status === 'pending'
                                                ? 'default'
                                                : 'success'
                                        }
                                        variant="outlined"
                                    />
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
