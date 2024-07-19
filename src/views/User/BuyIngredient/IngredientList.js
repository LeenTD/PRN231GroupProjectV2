// IngredientList.js
import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, List, ListItem, ListItemText, Card, CardMedia, CardContent, IconButton, Badge, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from './Context/CartContext'; // Điều chỉnh đường dẫn theo cấu trúc của bạn
import axios from '~/api/axios'; // Điều chỉnh đường dẫn theo cấu trúc của bạn

import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const IngredientList = () => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart(); // Sử dụng addToCart và cartItems từ CartContext

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4001/ingredient'); // Đảm bảo URL gọi đúng endpoint
                console.log("All Ingredients:", response.data);
                setIngredients(response.data);
                
                const uniqueCategories = [...new Set(response.data.map(item => item.categoryId))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCartClick = () => {
        navigate('/user/cart');
    };

    const handleIngredientClick = (ingredient) => {
        navigate(`/user/ingredient-details/${ingredient._id}`, { state: { ingredient } });
    };

    const handleAddToCart = (ingredient) => {
        addToCart(ingredient);
    };

    const filteredIngredients = ingredients.filter(
        (ingredient) =>
            (selectedCategory === '' || ingredient.categoryId === selectedCategory) &&
            ingredient.name && // Kiểm tra xem ingredient.name có tồn tại
            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Box>
                <Card>
                    <Header />
                </Card>
                <Box>
                    <img src="https://www.wayne-local.com/media/site/department/menus%20banner.png" alt="Banner" width="100%" />
                </Box>

                <Container maxWidth="80%">
                    <Grid container spacing={4} mt={4}>
                        {/* Category List */}
                        <Grid item xs={12} sm={4} md={3}>
                            <Box sx={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', p: 2 }}>
                                <Box border={1} borderRadius={2} p={2} borderColor="grey.300" height="100%">
                                    <Typography variant="h6" gutterBottom>
                                        Categories
                                    </Typography>
                                    <List>
                                        {categories.map((category, index) => (
                                            <ListItem button key={index} onClick={() => setSelectedCategory(category)}>
                                                <ListItemText primary={`Category ${category}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Ingredient List */}
                        <Grid item xs={12} sm={8} md={9}>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    size="small"
                                    sx={{ flex: 1, marginRight: 2 }}
                                />
                                <Badge badgeContent={cartItems.length} color="error" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                                    <IconButton color="primary" aria-label="cart" sx={{ color: '#00AD7C' }} onClick={handleCartClick}>
                                        <ShoppingCartIcon sx={{ fontSize: 40 }} />
                                    </IconButton>
                                </Badge>
                            </Box>
                            <Grid container spacing={4}>
                                {filteredIngredients.map((ingredient, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={ingredient.image.length > 0 ? ingredient.image[0] : '../../../assets/Img/ingre5.jpg'} // Đảm bảo lấy ảnh đầu tiên nếu có
                                                alt={ingredient.name}
                                                sx={{ objectFit: 'cover', cursor: 'pointer' }}
                                                onClick={() => handleIngredientClick(ingredient)}
                                            />
                                            <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                    <Typography variant="h6" component="div">
                                                        {ingredient.name}
                                                    </Typography>
                                                    <Box sx={{ backgroundColor: '#00AD7C', padding: '2px 8px', borderRadius: '4px' }}>
                                                        <Typography variant="body2" color="white">
                                                            ${ingredient.price}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {ingredient.description}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <IconButton color="primary" aria-label="view details" sx={{ color: '#00AD7C' }} onClick={() => handleIngredientClick(ingredient)}>
                                                        <VisibilityIcon sx={{ fontSize: 30 }} />
                                                    </IconButton>
                                                    <IconButton color="primary" aria-label="add to shopping cart" sx={{ color: '#00AD7C' }} onClick={() => handleAddToCart(ingredient)}>
                                                        <AddShoppingCartIcon sx={{ fontSize: 30 }} />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <br />
            <Footer />
        </div>
    );
};

export default IngredientList;
