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
    Badge
} from '@mui/material';

const AppliedJobTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job);  // Default to an empty array if undefined

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
                    {allAppliedJobs.length === 0 ? (   // Check if the array is empty
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                You haveapplied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell align="right">
                                    <Badge 
                                        color={appliedJob?.status === "rejected" ? 'error' : appliedJob.status === 'pending' ? 'warning' : 'success'}
                                        variant="dot"
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppliedJobTable;
