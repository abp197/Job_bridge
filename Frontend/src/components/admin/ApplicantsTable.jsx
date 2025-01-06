/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles for react-toastify
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import axios from 'axios';

// Adjusted shortlisting status to match the backend's expected status values
const shortlistingStatus = ["approved", "rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedApplicantId, setSelectedApplicantId] = useState(null);

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedApplicantId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                // Show different success messages based on the status
                if (status === "approved") {
                    toast.success("Approved Successfully!");
                } else if (status === "rejected") {
                    toast.success("Your application is rejected");
                }
            }
        } catch (error) {
            toast.error(`Failed to update status: ${error.response?.data?.message}`);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <caption>A list of your recent applied users</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell className="text-sm sm:text-base">Full Name</TableCell>
                            <TableCell className="text-sm sm:text-base">Email</TableCell>
                            <TableCell className="text-sm sm:text-base">Contact</TableCell>
                            <TableCell className="text-sm sm:text-base">Resume</TableCell>
                            <TableCell className="text-sm sm:text-base">Date</TableCell>
                            <TableCell className="text-sm sm:text-base" align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="text-sm sm:text-base">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-sm sm:text-base">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-sm sm:text-base">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-sm sm:text-base">
                                    {item.applicant?.profile?.resume ? (
                                        <a className="text-blue-600 text-xs sm:text-sm" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-sm sm:text-base">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleClick(event, item._id)} className="p-1">
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedApplicantId === item._id}
                                        onClose={handleClose}
                                    >
                                        {shortlistingStatus.map((status, index) => (
                                            <MenuItem key={index} onClick={() => { statusHandler(status, item?._id); handleClose(); }}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add ToastContainer to display toast notifications */}
            <ToastContainer />
        </>
    );
};

export default ApplicantsTable;

