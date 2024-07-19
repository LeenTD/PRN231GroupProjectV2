import React from 'react';
import { AppBar, Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import profilePic from '../../../assets/Img/ingre5.jpg';
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const EditProfile = () => {
    const navigate = useNavigate();

    const userInfo = {
        Username: 'JohnDoe',
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        Address: '123 Main St',
        Phone: '+1 (123) 456-7890',
        DetailedAddress: 'Apartment 4B, 123 Main St, Springfield, USA',
        DateOfBirth: '1990-01-01',
        Biography: 'This is a short biography about John Doe.',
    };

    const menuOptions = [
        { text: 'My Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/user/my-profile') },
        { text: 'Change Password', icon: <LockIcon />, onClick: () => navigate('/user/reset-password') },
    ];

    const handleBlogClick = () => {
        navigate('/user/my-post');
    };

    const handleInformationClick = () => {
        navigate('/user/my-profile');
    };

    return (
        <Box>
            <Header />
            {/* Adding padding-top to the main container to avoid overlap with Header */}
            <Box pt={10}>
                {/* Profile Section */}
                <Box component={Paper} elevation={3} sx={{ bgcolor: 'background.paper', p: 2, mb: 2, width: '80%', margin: 'auto' }}>
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
                            <Button variant="contained" sx={{ bgcolor: '#00AD7C', color: 'white' }}>Edit Profile</Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Menu */}
                <AppBar position="static" color="default" sx={{ width: '80%', margin: 'auto' }}>
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Button color="inherit" onClick={handleBlogClick}>Blog</Button>
                            <Button color="inherit" onClick={handleInformationClick}>Information</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Profile Content */}
                <Box sx={{ display: 'flex', width: '80%', margin: 'auto', height: 'calc(100vh - 128px)' }}>
                    <Box mt={2} display="flex" sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
                        {/* Sidebar Menu */}
                        <Box component={Paper} elevation={3} sx={{ width: '25%', p: 2, mr: 2, bgcolor: '#00AD7C', height: 'fit-content' }}>
                            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>Menu</Typography>
                            <List>
                                {menuOptions.map((option, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}
                                        onClick={option.onClick}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>{option.icon}</ListItemIcon>
                                        <ListItemText primary={option.text} sx={{ color: 'white' }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        {/* Profile Picture and Biography */}
                        <Box component={Paper} elevation={3} sx={{ width: '74%', p: 2, height: '100%', overflowY: 'auto' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} container justifyContent="center" alignItems="center">
                                    <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 150, height: 150 }} />
                                    <IconButton sx={{ color: '#00AD7C', ml: 2 }}>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>

                                {/* Biography Section */}
                                <Grid item xs={12}>
                                    <Box component={Paper} elevation={2} sx={{ p: 2 }}>
                                        <Grid container alignItems="center">
                                            <Grid item xs={11}>
                                                <Typography variant="h6">Biography</Typography>
                                                <Typography variant="body1">{userInfo.Biography}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton sx={{ color: '#00AD7C' }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                {/* User Information */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">User Information</Typography>
                                </Grid>
                                {Object.entries(userInfo).map(([key, value]) => {
                                    if (key !== 'Biography') {
                                        return (
                                            <Grid item xs={12} key={key} container alignItems="center" sx={{ borderBottom: '1px solid #e0e0e0', py: 1 }}>
                                                <Grid item xs={3}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography variant="body1">{value}</Typography>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton sx={{ color: '#00AD7C' }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        );
                                    }
                                    return null;
                                })}
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

export default EditProfile;
