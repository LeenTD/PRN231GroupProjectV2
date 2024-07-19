import React, { useEffect, useState } from 'react';
import {
    AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon,
    ListItemText, Paper, TextField, Toolbar, Typography
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import profilePic from '../../../assets/Img/ingre5.jpg';
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const MyProfile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [editableField, setEditableField] = useState('');
    const [editableValue, setEditableValue] = useState('');

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('user');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const handleClickOpen = (field, value) => {
        setEditableField(field);
        setEditableValue(value);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const updatedUserInfo = { ...userInfo, [editableField]: editableValue };
        setUserInfo(updatedUserInfo);
        localStorage.setItem('user', JSON.stringify(updatedUserInfo));
        setOpen(false);
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
            <Box pt={10}>
                <Box component={Paper} elevation={3} sx={{ bgcolor: 'background.paper', p: 2, mb: 2, width: '80%', margin: 'auto' }}>
                    <Grid container alignItems="center">
                        <Grid item xs={8} container alignItems="center">
                            <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 80, height: 80 }} />
                            <Box ml={2}>
                                <Typography variant="h6">{userInfo.fullName}</Typography>
                                <Typography variant="body2">1000 followers</Typography>
                                <Typography variant="body2" color="textSecondary">Active</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                            <Button variant="contained" sx={{ bgcolor: '#00AD7C', color: 'white' }} onClick={() => navigate('/user/order-list')}>History Order</Button>
                        </Grid>
                    </Grid>
                </Box>

                <AppBar position="static" color="default" sx={{ width: '80%', margin: 'auto' }}>
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Button color="inherit" onClick={handleBlogClick}>Blog</Button>
                            <Button color="inherit" onClick={handleInformationClick}>Information</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box sx={{ display: 'flex', width: '80%', margin: 'auto', height: 'calc(100vh - 128px)' }}>
                    <Box mt={2} display="flex" sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
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

                        <Box component={Paper} elevation={3} sx={{ flexGrow: 1, p: 2, width: '74%', height: '100%', overflowY: 'auto' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">User Information</Typography>
                                </Grid>
                                {Object.entries(userInfo).map(([key, value]) => {
                                    return (
                                        <Grid item xs={12} key={key} container alignItems="center" sx={{ borderBottom: '1px solid #e0e0e0', py: 1 }}>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{key.replace(/([A-Z])/g, ' $1').trim()}:</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1">{value}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton sx={{ color: '#00AD7C' }} onClick={() => handleClickOpen(key, value)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <br />
            <Footer />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit {editableField.replace(/([A-Z])/g, ' $1').trim()}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={editableField.replace(/([A-Z])/g, ' $1').trim()}
                        type="text"
                        fullWidth
                        value={editableValue}
                        onChange={(e) => setEditableValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyProfile;
