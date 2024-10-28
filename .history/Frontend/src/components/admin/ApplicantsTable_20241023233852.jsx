/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../../utils/';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

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
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <caption>A list of your recent applied users</caption>
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
                    {applicants && applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a className="text-blue-600" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={(event) => handleClick(event, item._id)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedApplicantId === item._id}
                                    onClose={handleClose}
                                >
                                    {shortlistingStatus.map((status, index) => (
                                        <MenuItem key={index} onClick={() => { statusHandler(status, item?._id); handleClose(); }}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApplicantsTable;
