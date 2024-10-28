import React from 'react';
import { Button, Card, CardContent, Typography, Avatar, Badge } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <Card variant="outlined" sx={{ padding: 3, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: '50%' }}>
                        <BookmarkIcon />
                    </Button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <Avatar alt={job?.company?.name} src={job?.company?.logo} />
                    <div>
                        <Typography variant="h6">{job?.company?.name}</Typography>
                        <Typography variant="body2" color="text.secondary">India</Typography>
                    </div>
                </div>

                <div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>{job?.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{job?.description}</Typography>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                    <Badge color="primary" badgeContent={job?.position} sx={{ fontWeight: 'bold' }} />
                    <Badge color="secondary" badgeContent={job?.jobType} sx={{ fontWeight: 'bold' }} />
                    <Badge color="error" badgeContent={`${job?.salary} LPA`} sx={{ fontWeight: 'bold' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
                    <Button variant="outlined" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                    <Button variant="contained" color="primary">Save For Later</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Job;
