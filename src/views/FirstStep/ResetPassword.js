// src/components/ResetPassword.js

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { resetPassword } from "~/api/firstStep/index";  // Import the resetPassword function

const defaultTheme = createTheme();

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function ResetPassword() {
    const [values, setValues] = React.useState({
        newPassword: "",
        verifyNewPassword: "",
        showPassword: false,
        showVerifyPassword: false,
    });

    const [open, setOpen] = React.useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleClickShowVerifyPassword = () => {
        setValues({
            ...values,
            showVerifyPassword: !values.showVerifyPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("newPassword") !== data.get("verifyNewPassword")) {
            setOpen(true);
            return;
        }
        
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const email = queryParams.get('email');

        try {
            const response = await resetPassword(token, email, data.get("newPassword"));
            console.log(response);
            navigate("/signIn");
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    const handleClose = () => setOpen(false);

    const isButtonDisabled =
        values.newPassword === "" || values.verifyNewPassword === "";

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#015E44",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "10px",
                        padding: "40px",
                        width: "70vh",
                        backgroundImage: "url(../src/assets/Img/logo2x.png)",
                        backgroundSize: "40%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%", mb: 6 }}
                    >
                        <Grid item xs={2}>
                            <IconButton
                                aria-label="Go back"
                                component={RouterLink}
                                to="/signIn"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    sx={{ color: "#015E44" }}
                                >
                                    Reset Password
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        type={values.showPassword ? "text" : "password"}
                        id="newPassword"
                        autoComplete="new-password"
                        value={values.newPassword}
                        onChange={handleChange("newPassword")}
                        sx={{
                            bgcolor: "white",
                            mb: 2,
                            borderRadius: "5px",
                            height: "56px",
                        }}
                        InputProps={{
                            style: { height: "100%" },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="verifyNewPassword"
                        label="Verify New Password"
                        type={values.showVerifyPassword ? "text" : "password"}
                        id="verifyNewPassword"
                        autoComplete="verify-password"
                        value={values.verifyNewPassword}
                        onChange={handleChange("verifyNewPassword")}
                        sx={{
                            bgcolor: "white",
                            mb: 2,
                            borderRadius: "5px",
                            height: "56px",
                        }}
                        InputProps={{
                            style: { height: "100%" },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowVerifyPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showVerifyPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isButtonDisabled}
                        sx={{
                            mt: 8,
                            bgcolor: isButtonDisabled ? "grey" : "#52D681",
                        }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Passwords do not match
                    </Typography>
                    <Typography id="modal-desc" sx={{ mt: 2 }}>
                        Please make sure that the new password and the
                        verification password match.
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}
