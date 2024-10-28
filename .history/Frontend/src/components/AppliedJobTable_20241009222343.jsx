/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
} from '@mui/material';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" align="center" sx={{ padding: '16px' }}>
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
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                You have not applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split('T')[0]}</TableCell>
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
