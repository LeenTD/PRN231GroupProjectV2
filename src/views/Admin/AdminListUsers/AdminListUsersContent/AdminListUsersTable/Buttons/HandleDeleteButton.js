import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUserById } from "~/api/usersAPI";
import { primaryButton, grayButton } from "~/styles/Buttons/Buttons";

export default function HandleDeleteButton({ id, refreshData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUserById(id)
      if (response.success) {
        toast.success('Delete successfully');
        refreshData();
      } else {
        toast.error('Failed to delete user');
      }
      handleClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  return (
    <>
      <Button sx={{
          backgroundColor: "red",
          p: "8px",
          mx: '5px',
          minWidth: "0px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "red",
          }
        }} onClick={handleClickOpen}>
        <BlockIcon style={{ color: "#fff" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent sx={{
          minWidth: '500px'
        }}>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={grayButton} >Cancel</Button>
          <Button onClick={handleDelete} autoFocus sx={primaryButton}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}