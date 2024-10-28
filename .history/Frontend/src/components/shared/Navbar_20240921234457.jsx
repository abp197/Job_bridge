import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <Typography variant="h4" component="h1">
                        Job<span style={{ color: '#F83002' }}>Portal</span>
                    </Typography>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outlined">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="contained" style={{ backgroundColor: '#6A38C2' }}>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <IconButton onClick={handleAvatarClick}>
                                <Avatar src={user?.profile?.profilePhoto} alt={user?.fullname} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: { width: '250px' },
                                }}
                            >
                                <div className="flex gap-2 p-2">
                                    <Avatar src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    <div>
                                        <Typography variant="subtitle1">{user?.fullname}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {user?.profile?.bio}
                                        </Typography>
                                    </div>
                                </div>
                                <MenuItem onClick={handleMenuClose}>
                                    {user && user.role === 'student' && (
                                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <User2 /> View Profile
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem onClick={logoutHandler}>
                                    <LogOut /> Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
