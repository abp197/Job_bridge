import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem
} from '@mui/material';
import { MoreHoriz as MoreHorizontal } from '@mui/icons-material';
import { APPLICATION_API_END_POINT } from '../../';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const statusHandler = async (status, id) => {
    console.log('called');
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      console.log(res);
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
                {
                  item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : <span>NA</span>
                }
              </TableCell>
              <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
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
