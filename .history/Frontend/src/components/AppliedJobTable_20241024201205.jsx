import React from 'react';
import { useSelector } from 'react-redux';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Chip, Typography
} from '@mui/material';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    // Function to return a styled Chip based on job status
    const getStatusChip = (status) => {
        let color = 'default';
        if (status === 'rejected') {
            color = 'error';
        } else if (status === 'pending') {
            color = 'warning';
        } else {
            color = 'success';
        }

        return (
            <Chip
                label={status.toUpperCase()}
                color={color}
                size="small"
            />
        );
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
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
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        You haven applied to any jobs yet.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell align="right">
                                        {getStatusChip(appliedJob.status)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AppliedJobTable;
