import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import ApproveModal from "../ApproveModal/ApproveModal";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import { createDiscountCode } from "~/api/discountCodeAPI";

export default function CreateNewButton({ refreshData }) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    discount_code: "",
    discount_type: "",
    discount_value: "",
    start_date: dayjs(),
    end_date: dayjs(),
    discount_summary: "",
  });

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      const response = await createDiscountCode(data)
      if (response.success) {
        toast.success('Discount code created successfully');
        refreshData();
      } else {
        toast.error('Failed to create discount code');
      }
      handleClose();
    } catch (error) {
      console.error('Error creating discount code:', error);
      toast.error('Error creating discount code');
    }
    
  };

  const handleFormChange = updatedData => {
    setFormData(updatedData);
  };

  return (
    <>
      <Button
        size="large"
        variant="outlined"
        sx={{
          color: "#015E44",
          borderColor: "#015E44",
          borderWidth: 1,
          "&:hover": {
            borderColor: "#015E44",
          },
        }}
        onClick={handleClickOpen}
      >
        <Typography variant="h7" sx={{ fontWeight: "bolder" }}>
          Create New
        </Typography>
      </Button>
      <ApproveModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        title='Create New Discount Code'
      />
    </>
  );
}
