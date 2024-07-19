import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function UpdateIngredientModal({ open, handleClose, row, onUpdate, refreshData }) {
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    importDate: '',
    expiredDate: ''
  });

  useEffect(() => {
    if (row) {
      setFormData({
        name: row.ingedientName || '',
        price: row.price || '',
        quantity: row.quantity || '',
        importDate: row.importDate || '',
        expiredDate: row.expiredDate || ''
      });
    }
  }, [row]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdate function passed as a prop with the updated data
    onUpdate(row.ingredient_id ,formData);
    refreshData();
    handleClose();
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
            Update Ingredients
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
            value={formData.importDate}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            margin="normal"
            fullWidth
            label="Expired Date"
            variant="outlined"
            name="expiredDate"
            value={formData.expiredDate}
            onChange={handleInputChange}
            disabled
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={handleClose} color='error'>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#015E44" }}>
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
