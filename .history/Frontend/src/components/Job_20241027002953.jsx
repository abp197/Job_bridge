/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import { Button, Avatar, AvatarGroup, Badge, Typography, Card, CardContent, CardActions } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    // Function to calculate days ago
    const daysAgo = useMemo(() => {
        const createdAt = new Date(job?.createdAt);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }, [job?.createdAt]);

    return (
        <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                        {daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: '50%' }}>
                        <BookmarkIcon fontSize="small" />
                    </Button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                    <Avatar src={job?.company?.logo || 'default-logo.png'} sx={{ width: 56, height: 56 }} />
                    <div>
                        <Typography variant="h6">{job?.company?.name || 'Company Name'}</Typography>
                        <Typography variant="body2" color="textSecondary">India</Typography>
                    </div>
                </div>

                <Typography variant="h5" gutterBottom>{job?.title || 'Job Title'}</Typography>
                <Typography variant="body2" color="textSecondary">{job?.description || 'Job description goes here...'}</Typography>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <Badge color="primary" variant="dot" badgeContent={job?.position || '1'} sx={{ fontWeight: 'bold' }}>
                        {job?.position || '1'} Positions
                    </Badge>
                    <Badge color="secondary" variant="dot" badgeContent={job?.jobType || 'Full-time'} sx={{ fontWeight: 'bold' }}>
                        {job?.jobType || 'Full-time'}
                    </Badge>
                    <Badge color="success" variant="dot" badgeContent={`${job?.salary || '0'} LPA`} sx={{ fontWeight: 'bold' }}>
                        {job?.salary} LPA
                    </Badge>
                </div>
            </CardContent>

            <CardActions>
                <Button variant="outlined" onClick={() => navigate(`/description/${job?._id}`)}>
                    Details
                </Button>
                <Button variant="contained" color="secondary">
                    Save For Later
                </Button>
            </CardActions>
        </Card>
    );
};

export default Job;
