import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ApproveModal from "../ApproveModal/ApproveModal";
import dayjs from 'dayjs';
import { fetchDiscountCodeById, updateDiscountCodeById } from "~/api/discountCodeAPI";

export default function HandleApproveButton({ id, refreshData }) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    discount_code: '',
    discount_type: '',
    discount_value: '',
    start_date: dayjs(),
    end_date: dayjs(),
    discount_summary: ''
  });

  const handleClickOpen = async () => {
    try {
      const discountCodeData = await fetchDiscountCodeById(id);
      setFormData({
        discount_code: discountCodeData.discount_code,
        discount_type: discountCodeData.discount_type,
        discount_value: discountCodeData.discount_value,
        start_date: dayjs(discountCodeData.start_date),
        end_date: dayjs(discountCodeData.end_date),
        discount_summary: discountCodeData.discount_summary
      });
      setOpen(true);
    } catch (error) {
      toast.error('Can\'t view detail');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      const response = await updateDiscountCodeById(id, data)
      if (response.success) {
        toast.success('Discount code updated successfully');
        refreshData();
      } else {
        toast.error('Failed to update discount code');
      }
      handleClose();
    } catch (error) {
      console.error('Error updating discount code:', error);
      toast.error('Error updating discount code');
    }
    
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
        <EditIcon style={{ color: "#fff" }} />
      </Button>
      <ApproveModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        title='Update Discount Code'
      />
    </>
  );
}
