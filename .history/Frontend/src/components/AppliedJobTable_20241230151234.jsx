/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Typography, Chip, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <TableContainer 
            component={Paper} 
            sx={{ 
                marginTop: 3, 
                borderRadius: '12px', 
                boxShadow: 3,
                overflow: 'hidden',
                width: '100%',
                maxWidth: '100%',
                backgroundColor
            }}
        >
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                    padding: 3, 
                    fontWeight: 'bold', 
                    backgroundColor: '#F3F4F6', 
                    borderBottom: '1px solid #E5E7EB',
                    textAlign: 'center', 
                    color: '#1F2937'
                }}
            >
                A list of your applied jobs
            </Typography>
            <Box 
                sx={{ 
                    overflowX: 'auto', 
                    maxWidth: '100%',
                }}
            >
                <Table aria-label="applied jobs table" sx={{ minWidth: 600 }}>
                    <TableHead sx={{ backgroundColor: '#F9FAFB' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Job Role</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Company</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#4B5563' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography variant="body2" sx={{ color: '#6B7280', paddingY: 2 }}>
                                        You haven't applied to any jobs yet.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} hover>
                                    <TableCell sx={{ color: '#374151' }}>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{appliedJob.job?.title}</TableCell>
                                    <TableCell sx={{ color: '#374151' }}>{appliedJob.job?.company?.name}</TableCell>
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
                                            variant="filled"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: appliedJob.status === 'rejected' ? '#EF4444' :
                                                       appliedJob.status === 'pending' ? '#9CA3AF' : '#10B981',
                                                backgroundColor: appliedJob.status === 'rejected' ? '#FEE2E2' :
                                                                 appliedJob.status === 'pending' ? '#F3F4F6' : '#D1FAE5',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>
        </TableContainer>
    );
};

export default AppliedJobTable;
