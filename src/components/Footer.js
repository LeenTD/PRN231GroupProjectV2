// Footer.js
import React from 'react';
import { Box, Typography, Container, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Logo from "../assets/Img/logo-bar@2x.png"

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                p: 3,
                mt: 'auto',
                backgroundColor: '#00AD7C',
                color: 'white',
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative' }}>
                <Grid container spacing={4} >
                    {/* Information Section */}
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <img src={Logo} alt="GuildVie Logo" width="200" style={{ marginRight: '8px' }} />
                        </Box>
                        <Typography variant="h6" color="white" gutterBottom>
                            “Good health - Good vibe - Good diet”
                        </Typography>
                        <Typography variant="body2" color="white">
                            <LocationOnIcon />   123 Main Street, Anytown, USA
                        </Typography>
                        <Typography variant="body2" color="white">
                            <PhoneIcon />    (123) 456-7890
                        </Typography>
                        <Typography variant="body2" color="white">
                            <EmailIcon />    info@example.com
                        </Typography>
                    </Grid>

                    {/* Quick Links Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="white" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
                            <ArrowRightIcon />  Home
                        </Link>
                        <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
                            <ArrowRightIcon />  Shop
                        </Link>
                        <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
                            <ArrowRightIcon />  Shopping Cart
                        </Link>
                        <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
                            <ArrowRightIcon />  Checkout
                        </Link>
                        <Link href="#" color="inherit" variant="body2" display="block" gutterBottom sx={{ textDecoration: 'none' }}>
                            <ArrowRightIcon />  Contact us
                        </Link>
                    </Grid>

                    {/* Follow Us Section */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="white" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1 }}>
                            <Link href="https://facebook.com" target="_blank" color="inherit" sx={{ textDecoration: 'none', display:'flex', padding:'0px 0px 5px 0px' }}>
                                <Facebook />&nbsp;Facebook
                            </Link>
                            <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ textDecoration: 'none', display:'flex', padding:'0px 0px 5px 0px' }}>
                                <Twitter />&nbsp;Twitter
                            </Link>
                            <Link href="https://instagram.com" target="_blank" color="inherit" sx={{ textDecoration: 'none', display:'flex', padding:'0px 0px 5px 0px' }}>
                                <Instagram />&nbsp;Instagram
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" color="inherit" sx={{ textDecoration: 'none', display:'flex' }}>
                                <LinkedInIcon />&nbsp;LinkedIn
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography variant="body2" color="white" align="center">
                        {'© '}
                        <Link color="inherit" href="https://your-website.com/" sx={{ textDecoration: 'none' }}>
                            GuildVie.com
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
