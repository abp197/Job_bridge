/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, IconButton, Avatar, Chip, Box, Typography, Paper } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                padding: { xs: 2, md: 3 }, 
                borderRadius: 2, 
                bgcolor: 'background.paper',
                maxWidth: '100%', 
                minHeight: 350, // Ensures consistent box height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </Typography>
                <IconButton size="small" color="primary">
                    <BookmarkIcon />
                </IconButton>
            </Box>

            <Box display="flex" alignItems="center" gap={2} mt={2}>
                <Avatar src={job?.company?.logo} sx={{ width: 48, height: 48 }} />
                <Box>
                    <Typography variant="h6">{job?.company?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">India</Typography>
                </Box>
            </Box>

            <Box mt={2}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {job?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {job?.description}
                </Typography>
            </Box>

            <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                <Chip label={`${job?.position} Positions`} color="primary" variant="outlined" />
                <Chip label={job?.jobType} sx={{ color: '#F83002' }} variant="outlined" />
                <Chip label={`${job?.salary} LPA`} sx={{ color: '#7209b7' }} variant="outlined" />
            </Box>

            <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outlined" 
                    color="primary"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Details
                </Button>
                <Button 
                    variant="contained" 
                    sx={{ bgcolor: 'primary.main', color: 'white', width: { xs: '100%', sm: 'auto' } }}
                >
                    Save For Later
                </Button>
            </Box>
        </Paper>
    );
};

export default Job;
