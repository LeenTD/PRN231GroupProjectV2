import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, IconButton, Paper, Badge, Card } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './Context/CartContext'; // Import your CartContext hook
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const IngredientDetail = () => {
    const [timeLeft, setTimeLeft] = useState(43200); // 12 hours in seconds
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredient } = location.state || {}; // Access the passed ingredient
    const { addToCart, cartItems } = useCart(); // Assuming addToCart and cartItems functions are from CartContext

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const handleBuyClick = () => {
        addToCart(ingredient, quantity); // Add current ingredient with quantity to cart
        navigate('/user/confirm-order', { state: { purchasedIngredients: [{ ingredient, quantity }] } });
    };
    

    const handleCartClick = () => {
        navigate('/user/cart');
    };

    if (!ingredient) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Ingredient not found.
                </Typography>
            </Container>
        );
    }

    return (
        <div>
        <Box>
            <Card>
            <Header />
            </Card>
        <br/>
            {/* Banner */}
            <Box>
                <img src="https://www.wayne-local.com/media/site/department/menus%20banner.png" alt="Banner" width="100%" />
            </Box>
            <br />
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h3" gutterBottom sx={{ color: '#00AD7C' }}>
                        Details
                    </Typography>
                    <Badge badgeContent={cartItems.length} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <IconButton color="primary" aria-label="shopping cart" sx={{ fontSize: 40, color: '#00AD7C' }} onClick={handleCartClick}>
                            <ShoppingCartIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                    </Badge>
                </Box>
                <Grid container spacing={4} mt={4}>
                    {/* Ingredient Image */}
                    <Grid item xs={12} sm={6} md={6} display="flex">
                        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                            <Box p={3} display="flex" justifyContent="center">
                                <img src={ingredient.image} alt={ingredient.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Ingredient Details */}
                    <Grid item xs={12} sm={6} md={6} display="flex">
                        <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                            <Box p={3} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                                <Box>
                                    <Typography variant="h4" gutterBottom>
                                        {ingredient.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontSize: 20 }}>
                                        {ingredient.description}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" gutterBottom sx={{ fontSize: 20 }}>
                                        Unit: 100 Gram
                                    </Typography>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Box sx={{ backgroundColor: '#00AD7C', padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="h5" color="white" sx={{ fontSize: 24 }}>
                                                ${ingredient.price}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                                        <Box sx={{ mr: 1, color: 'red' }}>Flash sale -</Box>
                                        <Box display="flex">
                                            <Box sx={{ bgcolor: 'red', color: 'white', borderRadius: '4px', p: 1, mr: 1 }}>
                                                <Typography variant="body2" component="span">
                                                    {formatTime(hours)}:
                                                </Typography>
                                            </Box>
                                            <Box sx={{ bgcolor: 'red', color: 'white', borderRadius: '4px', p: 1, mr: 1 }}>
                                                <Typography variant="body2" component="span">
                                                    {formatTime(minutes)}:
                                                </Typography>
                                            </Box>
                                            <Box sx={{ bgcolor: 'red', color: 'white', borderRadius: '4px', p: 1 }}>
                                                <Typography variant="body2" component="span">
                                                    {formatTime(seconds)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" mt={2}>
                                    <IconButton aria-label="decrease quantity" onClick={decreaseQuantity} sx={{ color: '#00AD7C' }}>
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }}>
                                        {quantity}
                                    </Typography>
                                    <IconButton aria-label="increase quantity" onClick={increaseQuantity} sx={{ color: '#00AD7C' }}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>

                                <Grid container spacing={2} mt={2} justifyContent="space-between">
                                    <Grid item xs={5}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ width: '100%', borderColor: '#00AD7C', color: '#00AD7C' }}
                                            onClick={() => addToCart(ingredient, quantity)} // Updated onClick to addToCart
                                        >
                                            <AddShoppingCartIcon sx={{ fontSize: 30 }} />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button variant="contained" color="primary" sx={{ width: '100%', bgcolor: '#00AD7C' }} onClick={handleBuyClick}>
                                            Buy
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
        <br/>
        <Footer/>
        </div>
    );
};

export default IngredientDetail;
