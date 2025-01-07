/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import axios from 'axios';

const shortlistingStatus = ['approved', 'rejected'];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
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
                if (status === 'approved') {
                    toast.success('Approved Successfully!');
                } else if (status === 'rejected') {
                    toast.success('Your application is rejected');
                }
            }
        } catch (error) {
            toast.error(`Failed to update status: ${error.response?.data?.message}`);
        }
    };

    return (
        <div
            className="p-4 min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://disabilityinsider.com/wp-content/uploads/2022/02/close-up-hand-with-laptop-838x525.jpg')`, // Replace with your image URL
            }}
        >
            <TableContainer component={Paper} className="bg-opacity-90">
                <Table>
                    <caption className="text-xs sm:text-sm text-gray-600">A list of your recent applied users</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell className="text-xs sm:text-sm font-medium">Full Name</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium">Email</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium">Contact</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium">Resume</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium">Date</TableCell>
                            <TableCell className="text-xs sm:text-sm font-medium" align="right">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="text-xs sm:text-sm truncate">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-xs sm:text-sm truncate">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-xs sm:text-sm truncate">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-xs sm:text-sm">
                                    {item.applicant?.profile?.resume ? (
                                        <a
                                            className="text-blue-600 text-xs sm:text-sm"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm">{item?.applicant.createdAt.split('T')[0]}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={(event) => handleClick(event, item._id)}
                                        className="p-1"
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedApplicantId === item._id}
                                        onClose={handleClose}
                                    >
                                        {shortlistingStatus.map((status, index) => (
                                            <MenuItem
                                                key={index}
                                                onClick={() => {
                                                    statusHandler(status, item?._id);
                                                    handleClose();
                                                }}
                                            >
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
            <ToastContainer />
        </div>
    );
};

export default ApplicantsTable;

