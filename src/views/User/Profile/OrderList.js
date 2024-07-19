import React, { useEffect, useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Card } from '@mui/material';
import Header from '~/components/User/Header';
import Footer from '~/components/Footer';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
        // localStorage.clear();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <Box>
                <Header />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Order List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Total Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{order.name}</TableCell>
                                        <TableCell>{order.phone}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" onClick={() => handleViewDetails(order)}>View Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Footer />
            </Box>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {selectedOrder && (
                        <Card>
                            <Typography variant="h6" gutterBottom>
                                Order Details
                            </Typography>
                            <Typography variant="body1">
                                <strong>Name:</strong> {selectedOrder.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {selectedOrder.phone}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Address:</strong> {selectedOrder.address}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Estimated Delivery Date:</strong> {new Date(selectedOrder.estimatedDeliveryDate).toDateString()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Purchased Products:</strong>
                            </Typography>
                            {selectedOrder.purchasedIngredients.map((ingredient, index) => (
                                <Typography key={index} variant="body2">
                                    {ingredient.name} - {ingredient.quantity} x ${ingredient.price}
                                </Typography>
                            ))}
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography variant="body2">Shipping Fee</Typography>
                                <Typography variant="body2">${selectedOrder.shippingFee}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body2">Discount</Typography>
                                <Typography variant="body2">-${selectedOrder.discount}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6">${selectedOrder.totalPrice.toFixed(2)}</Typography>
                            </Box>
                            <Button variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
                                Close
                            </Button>
                        </Card>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default OrderList;
