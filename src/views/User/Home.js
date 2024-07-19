import React from 'react';
import { Button, Box, useMediaQuery, useTheme, Typography } from '@mui/material';
import { Container, Card } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../../assets/Img/logo@2x.png';
import Grid from '@mui/material/Grid';
import Header from '../../components/User/Header';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carosel';

function UserHomePage() {

    const Logo = styled('img')(({ theme }) => ({
        backgroundSize: 'cover',
        width: '100%',
    }));

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const carousel1Items = [
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://i0.wp.com/smittenkitchen.com/wp-content/uploads/2023/03/easy-freezer-waffles-7-scaled.jpg?fit=1200%2C800&ssl=1&w=640" // Replace with your actual image path
        },
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://www.cherryonmysundae.com/wp-content/uploads/2018/12/egg-onigiri-final-feature.jpg" // Replace with your actual image path
        },
        // Add more items if needed
    ];
    const carousel2Items = [
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://www.cherryonmysundae.com/wp-content/uploads/2018/12/egg-onigiri-final-feature.jpg" // Replace with your actual image path
        },
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtM3QR0_yud7C5Ab-pFu2EVbBCnNIjkYeSg&s" // Replace with your actual image path
        },
        // Add more items if needed
    ];
    const carousel3Items = [
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtM3QR0_yud7C5Ab-pFu2EVbBCnNIjkYeSg&s" // Replace with your actual image path
        },
        {
            title: "Waffle",
            description: "Waffle is a type of baked cake, originating from Belgium",
            imageUrl: "https://www.cherryonmysundae.com/wp-content/uploads/2018/12/egg-onigiri-final-feature.jpg" // Replace with your actual image path
        },
        // Add more items if needed
    ];


    return (
        <div className="Home">
            {/* Header */}
            <Card sx={{ position: 'sticky', top:'0px', zIndex:'4' }}>
                <Header />
            </Card>

            {/* Body */}
            <Grid container spacing={2} sx={{ position: 'sticky' }}>
                <Grid item container xs={12} sx={{ backgroundColor: '#00AD7C', margin: 'none', padding: '20px 0px' }}>
                    <Grid item xs={9} sx={{ margin: 'none', padding: '20px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{ textAlign: 'center',width:'70vh'  }}>
                            {isMobile ? (
                                <>
                                    <Typography variant="h3" sx={{ marginBottom: '8px'}}>GuildVie</Typography>
                                    <Typography variant="body1">Welcome to VitaHealthHub, your ultimate destination
                                        for wellness and lifestyle inspiration! Our platform empowers users to share their
                                        insights, experiences, and knowledge on health and holistic living through engaging
                                        blog posts.
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h1" sx={{ marginBottom: '8px' }}>GuildVie</Typography>
                                    <Typography variant="body1">Welcome to VitaHealthHub, your ultimate destination
                                        for wellness and lifestyle inspiration! Our platform empowers users to share their
                                        insights, experiences, and knowledge on health and holistic living through engaging
                                        blog posts.
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={3} sm={3} md={2} sx={{ margin: 'none', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Logo src={logo} alt="My Logo" />
                    </Grid>
                </Grid>

                <Grid item container xs={12} sx={{ backgroundColor: '#B8FEBF', margin: 'none', padding: '20px 0px' }}>
                    <Grid item xs={12} sm={6} md={6} >
                        <Carousel carouselItems={carousel1Items}/>
                    </Grid>
                    {!isMobile ? (
                        <>
                            <Grid item container direction="column" justifyContent="space-between" alignItems="center" xs={6} sx={{ padding: '0px 25px', marginTop: '10px' }}>
                                <Grid item container xs={3}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center', width: '100%',
                                        height: '100%', alignContent: 'center', justifyContent: 'center', 
                                        position: 'relative'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Recipes</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={3}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center', width: '100%',
                                        height: '100%', alignContent: 'center', justifyContent: 'center', 
                                        position: 'relative'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Buy Ingredients</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={3}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        height: '100%', alignContent: 'center', justifyContent: 'center', 
                                        position: 'relative'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Write Blogs</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item container direction="column" justifyContent="space-between" alignItems="center" xs={12} sx={{ padding: '20px 0px' }}>
                                <Container sx={{ margin: '10px 0px' }}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center', width: '100%',
                                        height: '100%', alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Recipes</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Container>
                                <Container sx={{ margin: '10px 0px' }}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center', width: '100%',
                                        height: '100%', alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Buy Ingredients</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Container>
                                <Container sx={{ margin: '10px 0px 0px 0px' }}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{
                                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Easy-baking-recipes-f26a922.jpg?resize=768,574)',
                                        backgroundSize: 'cover', backgroundPosition: 'center',
                                        height: '100%', alignContent: 'center', justifyContent: 'center'
                                    }}>
                                        <Typography variant="h6" sx={{ marginBottom: '8px', padding: '0px', color: 'white' }}>Write Blogs</Typography>
                                        <Button sx={{ textTransform: 'none', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>Read more</Button>
                                    </Grid>
                                </Container>
                            </Grid>
                        </>
                    )}


                    <Grid container item xs={12} sm={6} md={6} sx={{ padding: '10px 25px 0px 25px'}}>
                        <Grid sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center', width:'100%',display:'flex' , borderRadius: '6px' }}>
                            <Typography variant="h5" sx={{ marginBottom: '0px', padding: '0px', color: 'white',}}>RECIPES</Typography>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ margin: '0px', padding: '0px' }} sm={6} md={6}>
                        <Carousel carouselItems={carousel2Items} />
                    </Grid>
                    {isMobile ? (
                        <>
                            <Grid container item xs={12} sx={{ padding: '10px 25px 0px 25px'}}>
                                <Grid sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)',justifyContent: 'center', alignItems: 'center', width:'100%',display:'flex', borderRadius: '6px' }}>
                                    <Typography variant="h5" sx={{ margin: '8px', padding: '0px', color: 'white' }}>WRITE BLOGS</Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ margin: '0px', padding: '0px' }} xs={12}>
                                <Carousel sx={{ margin: '0px' }} carouselItems={carousel3Items} />
                            </Grid>

                        </>
                    ) : (
                        <>
                            <Grid item sx={{ margin: '0px', padding: '0px' }} sm={6} md={6}>
                                <Carousel carouselItems={carousel3Items} />
                            </Grid>
                            <Grid container item sm={6} md={6} sx={{ padding: '10px 25px 0px 25px'}}>
                                <Grid sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)',justifyContent: 'center', alignItems: 'center', width:'100%',display:'flex', borderRadius: '6px' }}>
                                    <Typography variant="h5" sx={{ margin: '8px', padding: '0px', color: 'white' }}>WRITE BLOGS</Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div >
    );
}

export default UserHomePage;