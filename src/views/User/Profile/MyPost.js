import React, { useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';

import profilePic from '../../../assets/Img/ingre5.jpg';
import postImage from '../../../assets/Img/ingre5.jpg';
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const blogPostsData = [
    {
        id: 1,
        username: 'Thuy Nguyen',
        postTime: '2 hours ago',
        description: 'This is a sample blog post description',
        postImage: postImage,
        likes: 10,
        comments: 5,
    },
    {
        id: 2,
        username: 'Thuy Nguyen',
        postTime: '1 hour ago',
        description: 'Another blog post description',
        postImage: postImage,
        likes: 8,
        comments: 2,
    },
    {
        id: 3,
        username: 'Thuy Nguyen',
        postTime: '30 minutes ago',
        description: 'Yet another blog post description',
        postImage: postImage,
        likes: 15,
        comments: 4,
    },
    {
        id: 4,
        username: 'Thuy Nguyen',
        postTime: '10 minutes ago',
        description: 'More blog post content',
        postImage: postImage,
        likes: 5,
        comments: 1,
    },
];

const MyPost = () => {
    const [blogPosts, setBlogPosts] = useState(blogPostsData);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        localStorage.clear();
        setMenuAnchor(null);
    };

    const handleBlogClick = () => {
        navigate('/user/my-post');
    };

    const handleInfoClick = () => {
        navigate('/user/my-profile');
    };

    const handleEditProfileClick = () => {
        navigate('/user/order-list');
    };

    return (
        <Box>
            <Header />
            {/* Adding padding-top to the main container */}
            <Box pt={10}>
                {/* Profile Section */}
                <Box component={Paper} elevation={3} sx={{ bgcolor: 'background.paper', p: 2, mb: 2, width: '80%', margin: 'auto' }}>
                    <Grid container alignItems="center">
                        <Grid item xs={8} container alignItems="center">
                            <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 80, height: 80 }} />
                            <Box ml={2}>
                                <Typography variant="h6">Thuy Nguyen</Typography>
                                <Typography variant="body2">1000 followers</Typography>
                                <Typography variant="body2" color="textSecondary">Active</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} container justifyContent="flex-end">
                            <Button variant="contained" sx={{ bgcolor: '#00AD7C', color: 'white' }} onClick={handleEditProfileClick}>History Order</Button>
                        </Grid>
                    </Grid>
                </Box>

                {/* Menu */}
                <AppBar position="static" color="default" sx={{ width: '80%', margin: 'auto' }}>
                    <Toolbar>
                        <Box display="flex" flexGrow={1}>
                            <Button color="inherit" onClick={handleBlogClick}>Blog</Button>
                            <Button color="inherit" onClick={handleInfoClick}>Information</Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Post Section */}
                <Container maxWidth="lg" sx={{ bgcolor: 'background.paper', p: 2, mb: 2, width: '86%', margin: 'auto', position: 'relative', zIndex: 1 }}>
                    <Box mt={2}>
                        {/* <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6">Create a new post</Typography>
                            <TextField
                                label="What's on your mind?"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                sx={{ mt: 2 }}
                            />
                            <Button variant="contained" color="primary" sx={{ mt: 2, bgcolor: '#00AD7C' }}>
                                Post
                            </Button>
                        </Paper> */}
                        <Box>
                            <Grid container spacing={4} direction="column">
                                {blogPosts.slice(0, 3).map(post => ( // Display only the first 3 posts
                                    <Grid item xs={12} key={post.id}>
                                        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', p: 2, m: 2 }}> {/* Add padding and margin */}
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar src={profilePic} alt={post.username} sx={{ mr: 2 }} />
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle1">{post.username}</Typography>
                                                    <Typography variant="body2" color="textSecondary">{post.postTime}</Typography>
                                                </Box>
                                                <IconButton onClick={handleMenuOpen}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                                                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                                                </Menu>
                                            </Box>
                                            <Box mt={2}>
                                                <Typography variant="body1">{post.description}</Typography>
                                                <Box mt={2} display="flex" justifyContent="center">
                                                    <Box component="img" src={post.postImage} alt="Post" sx={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: 2 }} />
                                                </Box>
                                            </Box>
                                            <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton>
                                                    <FavoriteIcon color="error" />
                                                </IconButton>
                                                <Typography variant="body2" sx={{ mr: 2 }}>{post.likes}</Typography>
                                                <IconButton>
                                                    <CommentIcon color="primary" />
                                                </IconButton>
                                                <Typography variant="body2">{post.comments}</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default MyPost;
