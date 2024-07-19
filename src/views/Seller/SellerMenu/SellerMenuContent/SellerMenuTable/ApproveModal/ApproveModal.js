import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Grid,
  CircularProgress,
  DialogContentText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { primaryButton, grayButton, redButton } from "~/styles/Buttons/Buttons";

const commonTextFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#015E44",
    },
    "&:hover fieldset": {
      borderColor: "#028A69",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#015E44",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#015E44",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#015E44",
  },
  "& .MuiInputBase-input": {
    borderRadius: "8px",
    "&::placeholder": {
      color: "#015E44",
      opacity: 1,
    },
  },
};

const RecipeModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  onFormChange,
  title,
  loading
}) => {
  const { control, handleSubmit: formSubmit, watch, reset, getValues } = useForm({
    defaultValues: formData,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "directions",
  });

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     if (name && name.startsWith("directions")) {
  //       const updatedDirections = getValues("directions");
  //       onFormChange({
  //         ...value,
  //         directions: updatedDirections,
  //         images: formData.images, // Preserve images
  //       });
  //     } else {
  //       onFormChange({ ...value, images: formData.images }); // Preserve images
  //     }
  //     setIsDirty(true);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, onFormChange, getValues, formData.images]);

  // useEffect(() => {
  //   Object.keys(formData).forEach(key => {
  //     setValue(key, formData[key]);
  //   });
  // }, [formData, setValue]);

  useEffect(() => {
    if (open) {
      reset(formData);
      setIsDirty(false);
    }
  }, [open, formData, reset]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && name.startsWith("directions")) {
        const updatedDirections = getValues("directions");
        formData.directions = updatedDirections;
      }
      if (name && name.startsWith("images")) {
        const updatedImages = getValues("images");
        formData.images = updatedImages;
      } 
      else {
        formData[name] = value[name];
      }
      setIsDirty(true);
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, formData]);

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     if (name && name.startsWith("directions")) {
  //       const updatedDirections = getValues("directions");
  //       onFormChange({
  //         ...value,
  //         directions: updatedDirections,
  //         images: formData.images, // Preserve images
  //       });
  //     } else {
  //       onFormChange({ ...value, images: formData.images }); // Preserve images
  //     }
  //     setIsDirty(true);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, onFormChange,getValues, formData.images]);

  // useEffect(() => {
  //   Object.keys(formData).forEach(key => {
  //     setValue(key, formData[key]);
  //   });
  // }, [formData, setValue]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    onFormChange({
      ...formData,
      images: [...formData.images, ...newImages],
    });
    // formData.images = [...formData.images, ...newImages];
    setIsDirty(true);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((img, i) => i !== index);
    onFormChange({
      ...formData,
      images: updatedImages,
    });
    // formData.images = updatedImages;
    setIsDirty(true);
  };

  const onSubmit = (data) => {
    const formattedDirections = data.directions.map((direction, index) => ({
      step: index + 1,
      content: direction.content,
    }));
    data.directions = formattedDirections;
    data.images = formData.images;
    handleSubmit(data);
    setIsDirty(false);
  };

  const handleCloseWithConfirmation = () => {
    if (isDirty) {
      setConfirmOpen(true);
    } else {
      handleClose();
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseWithConfirmation}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "#015E44", fontWeight: "bold" }}>
          {title}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <CircularProgress />
            </Box>
          ) : (
            <form onSubmit={formSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {formData.images.map((img, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          component="img"
                          src={img.url || img}
                          sx={{ width: 56, height: 56 }}
                        />
                        <IconButton onClick={() => handleRemoveImage(index)}>
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Box>
                    ))}
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <Button
                      component="label"
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                      htmlFor="contained-button-file"
                      sx={primaryButton}
                    >
                      Upload Images
                    </Button>
                  </Box>
                </Grid>
                <Grid container item xs={6} spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Title"
                          fullWidth
                          sx={commonTextFieldStyles}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="ingredients"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          multiline
                          rows={4}
                          fullWidth
                          label="Ingredients"
                          sx={commonTextFieldStyles}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item container xs={12} spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="serving_number"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Servings"
                            type="number"
                            fullWidth
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="prep_time"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Prep Time"
                            fullWidth
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="cook_time"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Cook Time"
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} spacing={2}>
                    <Grid item xs={4}>
                      <Controller
                        name="total_time"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Total Time (minutes)"
                            fullWidth
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="additional_time"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Additional Time (minutes)"
                            fullWidth
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="process_material"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Process Material"
                            sx={commonTextFieldStyles}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <Box>
                      {fields.map((field, index) => (
                        <Box
                          key={field.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <Controller
                            name={`directions.${index}.content`}
                            control={control}
                            defaultValue={field.content}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={`Step ${index + 1}`}
                                fullWidth
                                sx={commonTextFieldStyles}
                              />
                            )}
                          />
                          <IconButton onClick={() => remove(index)}>
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        variant="contained"
                        onClick={() => append({ content: "" })}
                        startIcon={<AddCircleOutlineIcon />}
                        sx={primaryButton}
                      >
                        Add Step
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleCloseWithConfirmation} sx={grayButton}>
                  Cancel
                </Button>
                <Button type="submit" sx={primaryButton}>
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {confirmOpen && (
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Unsaved Changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You have unsaved changes. Are you sure you want to leave without saving?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={grayButton} >No</Button>
            <Button onClick={handleConfirmClose} sx={redButton} autoFocus>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default RecipeModal;
