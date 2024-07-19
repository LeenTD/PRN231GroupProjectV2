import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";
import { createIngredient } from '~/api/ingredientsAPI';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddIngredientModal({ open, handleClose, refreshData }) {

  const [formData, setFormData] = useState({
    name: "T",
    title: "hiii",  
    categoryId: 2,
    quantity: '',
    userId: "66953f72a4c84bc1ce4f62ed" ,
    price: '',
    description: "Metacarpal/carpal biopsy",
    startDate: "04/08/2023",
    image: "http://dummyimage.com/168x100.png/dddddd/000000",
    status: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createIngredient(formData);
      if (response.success) {
        toast.success('Ingredient created successfully');
        refreshData();
      } else {
        toast.error('Failed to create Ingredient');
      }
      handleClose();
    } catch (error) {
      console.error('Error creating Ingredient:', error);
      toast.error('Error creating Ingredient');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={handleClose} edge="start">
            <ArrowBackIcon sx={{ color: "#015E44", fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6" component="h2" ml={1} color={"#015E44"} fontSize={25} fontWeight={"bold"}>
            Create Ingredients
          </Typography>
        </Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Price"
            variant="outlined"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Quantity"
            variant="outlined"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Import Date"
            variant="outlined"
            name="importDate"
            type="date"
            value={formData.importDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Expired Date"
            variant="outlined"
            name="expiredDate"
            type="date"
            value={formData.expiredDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={handleClose} color='error'>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#015E44" }}>
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
