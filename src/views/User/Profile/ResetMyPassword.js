import React from 'react';
import { AppBar, Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import profilePic from '../../../assets/Img/ingre5.jpg';
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const ResetMyPassword = () => {
    const menuOptions = [
        { text: 'My Profile', icon: <AccountCircleIcon />, path: '/user/my-profile' },
        { text: 'Change Password', icon: <LockIcon />, path: '/user/reset-password' },
    ];

    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Header />

            {/* Profile Section */}
            <Box component={Paper} elevation={3} sx={{ bgcolor: 'background.paper', p: 2, mb: 2, width: '80%', margin: 'auto', mt: 10 }}>
                <Grid container alignItems="center">
                    <Grid item xs={8} container alignItems="center">
                        <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 80, height: 80 }} />
                        <Box ml={2}>
                            <Typography variant="h6">John Doe</Typography>
                            <Typography variant="body2">1000 followers</Typography>
                            <Typography variant="body2" color="textSecondary">Active</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} container justifyContent="flex-end">
                        <Button variant="contained" component={RouterLink} to="/user/edit-profile" sx={{ bgcolor: '#00AD7C', color: 'white' }}>Edit Profile</Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Menu */}
            <AppBar position="static" color="default" sx={{ width: '80%', margin: 'auto' }}>
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Button color="inherit" component={RouterLink} to="/user/my-post">Blog</Button>
                        <Button color="inherit" component={RouterLink} to="/user/my-profile">Information</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Reset Password Form */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100vw', mt: 2 }}>
                <Box display="flex" sx={{ width: '80%' }}>
                    {/* Sidebar Menu */}
                    <Box component={Paper} elevation={3} sx={{ width: '25%', p: 2, mr: 2, bgcolor: '#00AD7C', height: 'fit-content' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Menu</Typography>
                        <List>
                            {menuOptions.map((option, index) => (
                                <ListItem button key={index} component={RouterLink} to={option.path} sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}>
                                    <ListItemIcon sx={{ color: 'white' }}>{option.icon}</ListItemIcon>
                                    <ListItemText primary={option.text} sx={{ color: 'white' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* Reset Password Form */}
                    <Box component={Paper} elevation={3} sx={{ width: '72%', p: 2, height: 'fit-content', mb: 2 }}>
                        <Typography variant="h6">Reset Password</Typography>
                        <Box component="form" sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Current Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirm New Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} container justifyContent="flex-end">
                                    <Button variant="contained" sx={{ bgcolor: '#00AD7C', color: 'white' }}>Reset Password</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <br/>
            <Footer/>
        </Box>
    );
};

export default ResetMyPassword;
