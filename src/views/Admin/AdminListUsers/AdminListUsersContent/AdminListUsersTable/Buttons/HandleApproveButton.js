import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import ApproveModal from "../ApproveModal/ApproveModal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchUserById } from "~/api/usersAPI";

export default function HandleApproveButton({ id }) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    username: 'totoo_edd',
    firstname: 'Toto San',
    date_of_birth: dayjs(''),
    email: '',
    phone_number: '',
    house_address: '',
    gender: ''
  });

  const handleClickOpen = async () => {
    try {
      const userData = await fetchUserById(id);
      setFormData({
        username: userData.username,
        firstname: userData.firstname,
        date_of_birth: dayjs(userData.date_of_birth),
        email: userData.email,
        phone_number: userData.phone_number,
        house_address: userData.house_address
      });
      setOpen(true);
    } catch (error) {
      toast.error('Can\'t view detail');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  const handleFormChange = (updatedData) => {
    setFormData(updatedData);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#6DF292",
          p: "8px",
          minWidth: "0px",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#6DF292",
          },
        }}
        onClick={handleClickOpen}
      >
        <VisibilityIcon style={{ color: "#fff" }} />
      </Button>
      <ApproveModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        formData={formData}
        onFormChange={handleFormChange}
      />
    </>
  );
}
