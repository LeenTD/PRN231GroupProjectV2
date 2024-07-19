import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { sendEmail } from "~/api/firstStep/index"; // Import the sendEmail function

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

export default function SendEmail() {
    const [values, setValues] = React.useState({
        to: "",
        subject: "Link go to reset password from GuildVie",
        body: "This is a link: http://localhost:5173/reset-password",
    });

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await sendEmail(values);
            console.log(response);
            navigate("/signIn");
        } catch (error) {
            console.error("Send email failed:", error);
        }
    };

    const handleClose = () => setOpen(false);

    const isButtonDisabled = !values.to;

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
                                    Send Email
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="to"
                        label="Email"
                        name="to"
                        autoComplete="email"
                        autoFocus
                        value={values.to}
                        onChange={handleChange("to")}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "5px",
                            height: "56px",
                        }}
                        InputProps={{
                            style: { height: "100%" },
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
                        Send Email
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
                        Error
                    </Typography>
                    <Typography id="modal-desc" sx={{ mt: 2 }}>
                        There was an error sending the email. Please try again.
                    </Typography>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}
