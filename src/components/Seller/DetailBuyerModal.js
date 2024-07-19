import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
});

const TotalBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  fontWeight: 'bold',
});

export default function DetailModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="detail-modal-title"
      aria-describedby="detail-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton onClick={handleClose} edge="start">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h2" ml={1}>
            Detail
          </Typography>
        </Box>
        <Typography variant="body1">
          Tên người mua: Hoàng Tuấn Kiệt<br />
          Địa Chỉ: FPT University<br />
          SĐT: 0123456789<br />
          Ngày mua hàng: 01/01/1001
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" fontWeight="bold">
          DELICIOUS FOOD SHOP:
        </Typography>
        <Paper variant="outlined" sx={{ my: 1, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src="path/to/image" alt="Hình" style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={10}>
              <Typography>Táo Vàng Enchance</Typography>
              <Typography variant="body2" color="textSecondary">
                Phân Loại: Trái Cây, Enchance<br />
                x10
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                500.00
              </Typography>
              <Typography variant="body1" color="error">
                499.00
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Divider sx={{ my: 2 }} />
        <ProductBox>
          <Typography>Tổng tiền hàng</Typography>
          <Typography>999.999</Typography>
        </ProductBox>
        <ProductBox>
          <Typography>Phí vận chuyển</Typography>
          <Typography>999.999</Typography>
        </ProductBox>
        <ProductBox>
          <Typography>Discount</Typography>
          <Typography>999.999</Typography>
        </ProductBox>
        <TotalBox>
          <Typography>Thành tiền</Typography>
          <Typography>999.999</Typography>
        </TotalBox>
        <Typography variant="body2" color="textSecondary">
          Phương thức thanh toán: Qua thẻ ngân hàng
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
          <Button variant="contained" color="success">
            Accept
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
