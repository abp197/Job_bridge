import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, CircularProgress
} from '@mui/material';
import { MoreHoriz as MoreHorizontal } from '@mui/icons-material';
import { APPLICATION_API_END_POINT } from '../../utils/constant.js';

const shortlistingStatus = ["Pending", "Approved", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const statusHandler = async (status, id) => {
    setLoading(true);  // Show loading spinner during the request
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status: status.toLowerCase() });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);  // Hide loading spinner
      handleClose();  // Close the dropdown menu
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>A list of your recent applicants</caption>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants?.applications?.length ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : <span>NA</span>}
                </TableCell>
                <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleClick(e, item._id)}>
                    <MoreHorizontal />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={selectedId === item._id}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {shortlistingStatus.map((status, index) => (
                      <MenuItem key={index} onClick={() => statusHandler(status, item?._id)}>
                        {status}
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                {loading ? <CircularProgress /> : <span>No applicants found.</span>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicantsTable;
