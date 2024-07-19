import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, Checkbox, IconButton, Paper, TextField, Badge, Card } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useCart } from './Context/CartContext'; // Adjust path according to your structure

import Footer from '~/components/Footer';
import Header from '~/components/User/Header';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize selectedItems with default quantity of 1 for each item
        setSelectedItems(cartItems.map(item => ({ ...item, selected: false, quantity: 1 })));
    }, [cartItems]);

    const handleQuantityChange = (id, delta) => {
        setSelectedItems(prevItems =>
            prevItems.map(item =>
                item._id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );
    };

    const handleApplyDiscount = () => {
        if (discountCode.trim() === 'DISCOUNT10') {
            setDiscountApplied(true);
        } else {
            alert('Invalid discount code');
        }
    };

    const handleOrderClick = () => {
        const selectedIngredients = selectedItems.filter(item => item.selected && item.quantity > 0);
        
        if (selectedIngredients.length === 0) {
            alert('Please select at least one ingredient to proceed with the order.');
            return;
        }

        navigate('/user/confirm-order', { state: { purchasedIngredients: selectedIngredients } });
    };

    const handleSelectChange = (id, selected) => {
        setSelectedItems(prevItems =>
            prevItems.map(item =>
                item._id === id ? { ...item, selected } : item
            )
        );
    };

    const totalPrice = selectedItems.reduce((total, item) => item.selected ? total + item.price * item.quantity : total, 0);
    const discountedTotalPrice = discountApplied ? totalPrice * 0.9 : totalPrice;

    return (
        <div>
            <Box>
                <Card>
                    <Header />
                </Card>
                {/* Banner */}
                <Box>
                    <img src="https://www.wayne-local.com/media/site/department/menus%20banner.png" alt="Banner" width="100%" />
                </Box>
                <br />
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box flex={1}>
                            <Typography variant="h3" gutterBottom sx={{ color: '#00AD7C' }}>
                                Cart
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" flex={1} justifyContent="flex-end">
                            <Badge badgeContent={cartItems.length} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                <IconButton color="primary" aria-label="cart" sx={{ color: '#00AD7C' }}>
                                    <ShoppingCartIcon sx={{ fontSize: 40 }} />
                                </IconButton>
                            </Badge>
                        </Box>
                    </Box>
                    <Grid container spacing={4} direction="column">
                        {selectedItems.map(item => (
                            <Grid item xs={12} key={item._id}>
                                <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={item.selected || false}
                                            onChange={(e) => handleSelectChange(item._id, e.target.checked)}
                                        />
                                        <img src={item.image.length > 0 ? item.image[0] : 'placeholder_image_url'} alt={item.name} width="250px" style={{ marginLeft: '8px' }} />
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', ml: 2 }}>
                                        <Typography variant="h5" sx={{ fontSize: '1.7rem' }}>{item.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1.4rem' }}>
                                            Unit: {item.unit}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box display="flex" alignItems="center">
                                            <IconButton onClick={() => handleQuantityChange(item._id, -1)} sx={{ color: '#00AD7C' }}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ mx: 1, fontSize: '1.4rem' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton onClick={() => handleQuantityChange(item._id, 1)} sx={{ color: '#00AD7C' }}>
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="h6" sx={{ fontSize: '1.7rem' }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                                            {/* Display original price if available */}
                                            {item.originalPrice && (
                                                <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', fontSize: '1.4rem' }}>
                                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="flex-end" mt={4}>
                        <Box sx={{ width: '50%' }}>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    label="Discount Code"
                                    variant="outlined"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    size="small"
                                    sx={{ marginRight: 2, flex: 1 }}
                                />
                                <Button variant="contained" color="primary" onClick={handleApplyDiscount} sx={{ bgcolor: '#00AD7C', flex: 1 }}>
                                    Apply
                                </Button>
                            </Box>
                            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5" sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00AD7C' }}>
                                    Total: ${discountedTotalPrice.toFixed(2)}
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ bgcolor: '#00AD7C', fontSize: '1.2rem' }} onClick={handleOrderClick}>
                                    Order
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <br />
            <Footer />
        </div>
    );
};

export default Cart;
