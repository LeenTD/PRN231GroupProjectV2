import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  DialogContentText,
  Typography,
  FormControl,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { grayButton, primaryButton } from "~/styles/Buttons/Buttons";

import TotoAva from "~/assets/Img/toto.jpg";

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

const AdminListUserModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  onFormChange,
}) => {
  const {
    control,
    handleSubmit: formSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: formData,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    Object.keys(formData).forEach(key => {
      setValue(key, formData[key]);
    });
  }, [formData, setValue]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onFormChange({ ...formData, image: imageUrl });
      setIsDirty(true);
    }
  };

  const onSubmit = data => {
    data.image = formData.image;
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

  useEffect(() => {
    const subscription = watch(value => {
      onFormChange(value);
      setIsDirty(true);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseWithConfirmation}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: "#015E44", fontWeight: "bold" }}>
          User Profile
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid
                item
                container
                sm={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box sx={{ width: "80%", textAlign: "center" }}>
                    <Box
                      component="img"
                      src="https://i.pinimg.com/originals/21/39/8d/21398d375e0e5977de20fe4c7e6e1e0c.jpg"
                      sx={{
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "20px",
                        border: "2px solid #015E44",
                      }}
                    />
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  {/* <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    htmlFor="contained-button-file"
                    sx={primaryButton}
                  >
                    Upload avatar
                  </Button> */}
                </Box>
              </Grid>
              <Grid item container sm={8} spacing={1}>
                <Grid item sm={12}>
                  <Typography
                    variant="h3"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    {formData.fullname}
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Username
                  </Typography>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        placeholder="Username..."
                        sx={commonTextFieldStyles}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Email
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        placeholder="Email..."
                        sx={commonTextFieldStyles}
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Phone number
                  </Typography>
                  <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        fullWidth
                        placeholder="Phone number..."
                        sx={commonTextFieldStyles}
                      />
                    )}
                  />
                </Grid>
                {/* <Grid item container sm={12} spacing={2}>
                  <Grid item sm={6}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#015E44", fontWeight: "bold" }}
                    >
                      Gender
                    </Typography>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled
                          placeholder="Male"
                          sx={commonTextFieldStyles}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#015E44", fontWeight: "bold" }}
                    >
                      Date of birth
                    </Typography>
                    <Controller
                      name="date_of_birth"
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                {...field}
                                value={field.value || null}
                                onChange={field.onChange}
                                disabled
                                fullWidth
                                sx={commonTextFieldStyles}
                                renderInput={params => (
                                  <TextField {...params}/>
                                )}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid> */}
                <Grid item sm={12}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#015E44", fontWeight: "bold" }}
                    >
                      Gender
                    </Typography>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          disabled
                          placeholder="Male"
                          sx={commonTextFieldStyles}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Typography
                      variant="h5"
                      sx={{ color: "#015E44", fontWeight: "bold" }}
                    >
                      Date of birth
                    </Typography>
                    <Controller
                      name="date_of_birth"
                      control={control}
                      render={({ field }) => (
                        <FormControl>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                {...field}
                                value={field.value || null}
                                onChange={field.onChange}
                                disabled
                                sx={commonTextFieldStyles}
                                renderInput={params => (
                                  <TextField {...params} fullWidth/>
                                )}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </FormControl>
                      )}
                    />
                  </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Address
                  </Typography>
                  <Controller
                    name="house_address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        disabled
                        placeholder="Address..."
                        sx={commonTextFieldStyles}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <DialogActions>
              {/* <Button type="submit" sx={primaryButton}>
                Update
              </Button> */}
              <Button onClick={handleCloseWithConfirmation} sx={grayButton}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Discard Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Do you want to discard all changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminListUserModal;
