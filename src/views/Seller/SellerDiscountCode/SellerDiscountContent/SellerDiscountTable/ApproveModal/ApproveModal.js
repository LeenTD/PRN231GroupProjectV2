import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  DialogContentText,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

const DiscountCodeModal = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  onFormChange,
  title
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

  const onSubmit = data => {
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
          {title}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item container sm={8} spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Discount Code
                  </Typography>
                <Controller
                  name="discount_code"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Ex: DISCOUNT_CODE"
                      sx={commonTextFieldStyles}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth sx={commonTextFieldStyles}>
                <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Discount Type
                  </Typography>
                  <Controller
                    name="discount_type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ color: '#015E44'}}
                      >
                        <MenuItem value="" disabled>
                          <em>Discount Type</em>
                        </MenuItem>
                        <MenuItem sx={{ color: '#015E44'}} value="percentage">Percentage</MenuItem>
                        <MenuItem sx={{ color: '#015E44'}} value="fixed_amount">Fixed Amount</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={12} sm={12}>
              <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Discount Amount
                  </Typography>
                <Controller
                  name="discount_value"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Ex: 10000"
                      sx={commonTextFieldStyles}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}></Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item sm={6}>
                <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Start Date
                  </Typography>
                  <Controller 
                    name='start_date'
                    control={control}
                    render={({field}) => (
                      <FormControl sx={commonTextFieldStyles}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker 
                        {...field}
                        value={field.value || null}
                        onChange={field.onChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>
                    )}
                  />
                </Grid>
                <Grid item sm={6}>
                <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    End Date
                  </Typography>
                <Controller 
                    name='end_date'
                    control={control}
                    render={({field}) => (
                      <FormControl sx={commonTextFieldStyles}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker 
                        {...field}
                        value={field.value || null}
                        onChange={field.onChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              </Grid>
              <Grid item container sm={4} >
              <Grid item xs={12} sm={12} spacing={2}>
              <Typography
                    variant="h5"
                    sx={{ color: "#015E44", fontWeight: "bold" }}
                  >
                    Discount Summary
                  </Typography>
                <Controller
                  name="discount_summary"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={8} 
                      placeholder="Content... (Thanksgiving,...)"
                      sx={commonTextFieldStyles}
                    />
                  )}
                />
              </Grid>
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" sx={primaryButton}>
                Submit
              </Button>
              <Button
                onClick={handleCloseWithConfirmation}
                sx={grayButton}
              >
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
          <Button onClick={() => setConfirmOpen(false)} sx={grayButton}>
            No
          </Button>
          <Button onClick={handleConfirmClose} sx={redButton} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiscountCodeModal;
