import * as React from "react";
import { toast } from "react-toastify";
import { Button, Typography } from "@mui/material";
import ApproveModal from "../ApproveModal/ApproveModal";
import dayjs from "dayjs";
import { createRecipe } from "~/api/recipeAPI";

export default function CreateNewButton({refreshData}) {
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    title: "",
    publish_date: dayjs(),
    // author: "",
    serving_number: '',
    prep_time: '',
    cook_time: '',
    total_time: '',
    additional_time: '',
    process_material: '',
    ingredients: "",
    images: [],
    directions: []
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async data => {
    const submitData = new FormData();

    // Thêm các trường khác vào formData
    for (const key in data) {
      if (key === "directions") {
        submitData.append(key, JSON.stringify(data[key])); // Chuyển đổi directions thành chuỗi JSON
      } else if (key === "images") {
        data[key].forEach(image => submitData.append("images", image.file)); // Thêm các ảnh vào formData
      } else {
        submitData.append(key, data[key]);
      }
    }
    try {
      console.log(submitData);
      const response = await createRecipe(submitData);
      if (response.success) {
        toast.success("Recipe created successfully");
        refreshData();
      } else {
        toast.error("Failed to create recipe");
      }
      handleClose();
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast.error("Error creating recipe");
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
        title="Create New Recipe"
      />
    </>
  );
}
