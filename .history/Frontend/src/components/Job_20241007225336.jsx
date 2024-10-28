import React from 'react';
import { Bookmark } from '@mui/icons-material';
import { Avatar, AvatarGroup, Button, Chip, Typography, Paper, IconButton } from '@mui/material';
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
    <Paper elevation={3} sx={{ padding: 2, borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #f0f0f0' }}>
      <div className='flex items-center justify-between'>
        <Typography variant="body2" color="textSecondary">
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </Typography>
        <IconButton>
          <Bookmark />
        </IconButton>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <IconButton sx={{ padding: '0' }}>
          <Avatar src={job?.company?.logo} alt={job?.company?.name} sx={{ width: 56, height: 56 }} />
        </IconButton>
        <div>
          <Typography variant="h6" fontWeight="medium">
            {job?.company?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            India
          </Typography>
        </div>
      </div>

      <div>
        <Typography variant="h6" fontWeight="bold" sx={{ my: 1 }}>
          {job?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job?.description}
        </Typography>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Chip label={`${job?.position} Positions`} color="primary" variant="outlined" />
        <Chip label={job?.jobType} sx={{ color: '#F83002', fontWeight: 'bold' }} variant="outlined" />
        <Chip label={`${job?.salary} LPA`} sx={{ color: '#7209b7', fontWeight: 'bold' }} variant="outlined" />
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outlined" onClick={() => navigate(`/description/${job?._id}`)}>
          Details
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#7209b7', color: '#fff' }}>
          Save For Later
        </Button>
      </div>
    </Paper>
  );
};

export default Job;
