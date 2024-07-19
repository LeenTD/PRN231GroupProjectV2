import * as React from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RecipeModal from "../ApproveModal/ApproveModal";
import dayjs from "dayjs";
import { fetchRecipeById, updateRecipeById } from "~/api/recipeAPI";

export default function HandleApproveButton({ id, refreshData }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    title: '',
    serving_number: '',
    prep_time: '',
    cook_time: '',
    total_time: '',
    additional_time: '',
    process_material: '',
    publish_date: dayjs(''),
    ingredients: '',
    images: [],
    directions: []
  });

  const handleClickOpen = async () => {
    setLoading(true);
    try {
      const recipeData = await fetchRecipeById(id);

      // Map directions to ensure each step is included
      const mappedDirections = recipeData.directions.map(
        (direction, index) => ({
          step: index + 1,
          content: direction.content,
        })
      );

      setFormData({
        title: recipeData.title,
        serving_number: recipeData.serving_number,
        prep_time: recipeData.prep_time,
        cook_time: recipeData.cook_time,
        total_time: recipeData.total_time,
        additional_time: recipeData.additional_time,
        process_material: recipeData.process_material,
        publish_date: dayjs(recipeData.publish_date),
        ingredients: recipeData.ingredients,
        directions: mappedDirections,
        images: recipeData.images,
      });
      // console.log(formData)
      // console.log(recipeData)
      setOpen(true);
    } catch (error) {
      toast.error("Can't view detail");
    } finally {
      setLoading(false);
    }
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
        data[key].forEach(image => submitData.append("images", image.file || image)); // Thêm các ảnh vào formData
      } else {
        submitData.append(key, data[key]);
      }
    }
    try {
      const response = await updateRecipeById(id, submitData);
      if (response.success) {
        toast.success("Recipe updated successfully");
        refreshData();
      } else {
        toast.error("Failed to update recipe");
      }
      handleClose();
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe");
    }
  };

  const handleFormChange = updatedData => {
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
      <RecipeModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleFormSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        title="Update Recipe"
        loading={loading} // Pass loading state
      />
    </>
  );
}
