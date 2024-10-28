import React from 'react';
import { Button, Card, CardContent, Typography, Avatar, Badge, Chip } from '@mui/material';
import { Bookmark } from 'lucide-react';
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
        <Card variant="outlined" sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <Typography variant="caption" color="text.secondary">
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: '50%' }}>
                        <Bookmark />
                    </Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button variant="outlined" size="small" sx={{ padding: 1 }}>
                        <Avatar src={job?.company?.logo} />
                    </Button>
                    <div>
                        <Typography variant="h6" component="h1">{job?.company?.name}</Typography>
                        <Typography variant="caption" color="text.secondary">India</Typography>
                    </div>
                </div>

                <div>
                    <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', marginY: 1 }}>{job?.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{job?.description}</Typography>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                    <Chip label={`${job?.position} Positions`} color="primary" sx={{ fontWeight: 'bold' }} />
                    <Chip label={job?.jobType} sx={{ color: '#F83002', fontWeight: 'bold' }} />
                    <Chip label={`${job?.salary} LPA`} sx={{ color: '#7209b7', fontWeight: 'bold' }} />
                </div>

                <div className='flex items-center gap-4 mt-4'>
                    <Button variant="outlined" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                    <Button variant="contained" sx={{ backgroundColor: '#7209b7' }}>Save For Later</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Job;
