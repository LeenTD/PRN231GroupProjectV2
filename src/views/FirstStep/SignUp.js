import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { signUp } from "~/api/firstStep/index"; // Import the signUp function
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";

const defaultTheme = createTheme();

export default function SignUp() {
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        verifyPassword: "",
        email: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        date_of_birth: null,
        phone_number: "",
        house_address: "",
        district_address: "",
        city_address: "",
        roles: [],
        showPassword: false,
        showVerifyPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleDateChange = (date) => {
        setValues({ ...values, date_of_birth: date });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleRoleChange = (event) => {
        setValues({ ...values, roles: [event.target.value] });
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

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formDataObject = {
            username: data.get("username"),
            password: data.get("password"),
            verifyPassword: data.get("verifyPassword"),
            email: data.get("email"),
            first_name: data.get("first_name"),
            middle_name: data.get("middle_name"),
            last_name: data.get("last_name"),
            date_of_birth: values.date_of_birth
                ? values.date_of_birth.format("YYYY-MM-DD")
                : null,
            phone_number: data.get("phone_number"),
            house_address: data.get("house_address"),
            district_address: data.get("district_address"),
            city_address: data.get("city_address"),
            roles: values.roles,
        };
        console.log(formDataObject); // Log the form data object

        try {
            const response = await signUp(formDataObject);
            console.log(response);
            // Handle the response as needed, e.g., navigate to a different page
            navigate("/signIn");
        } catch (error) {
            console.error("Sign Up failed:", error);
        }
    };

    const isButtonDisabled =
        values.username === "" ||
        values.password === "" ||
        values.verifyPassword === "" ||
        values.email === "" ||
        values.phone_number === "" ||
        values.roles.length === 0;

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
                        sx={{ width: "100%", mb: 1 }}
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
                                    Sign Up
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={values.username}
                        onChange={handleChange("username")}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "5px",
                            height: "56px", // Consistent height
                        }}
                        InputProps={{
                            style: { height: "100%" }, // Ensure inner input fills the TextField
                        }}
                    />
                    <Grid
                        container
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                    >
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={values.showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={values.password}
                                onChange={handleChange("password")}
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: "5px",
                                    height: "56px", // Consistent height
                                }}
                                InputProps={{
                                    style: { height: "100%" }, // Ensure inner input fills the TextField
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
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
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="verifyPassword"
                                    label="Verify Password"
                                    type={
                                        values.showVerifyPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="new-password"
                                    value={values.verifyPassword}
                                    onChange={handleChange("verifyPassword")}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "5px",
                                        height: "56px", // Consistent height
                                    }}
                                    InputProps={{
                                        style: { height: "100%" }, // Ensure inner input fills the TextField
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowVerifyPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
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
                            </Box>
                        </Grid>
                    </Grid>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={values.email}
                        onChange={handleChange("email")}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "5px",
                            height: "56px", // Consistent height
                        }}
                        InputProps={{
                            style: { height: "100%" }, // Ensure inner input fills the TextField
                        }}
                    />
                    <Grid
                        container
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%", mb: 1 }}
                    >
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="first_name"
                                label="First name"
                                name="first_name"
                                autoComplete="first_name"
                                autoFocus
                                value={values.first_name}
                                onChange={handleChange("first_name")}
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: "5px",
                                    height: "56px", // Consistent height
                                }}
                                InputProps={{
                                    style: { height: "100%" }, // Ensure inner input fills the TextField
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="middle_name"
                                    label="Middle name"
                                    name="middle_name"
                                    autoComplete="middle_name"
                                    autoFocus
                                    value={values.middle_name}
                                    onChange={handleChange("middle_name")}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "5px",
                                        height: "56px", // Consistent height
                                    }}
                                    InputProps={{
                                        style: { height: "100%" }, // Ensure inner input fills the TextField
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last name"
                                    name="last_name"
                                    autoComplete="last_name"
                                    autoFocus
                                    value={values.last_name}
                                    onChange={handleChange("last_name")}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "5px",
                                        height: "56px", // Consistent height
                                    }}
                                    InputProps={{
                                        style: { height: "100%" }, // Ensure inner input fills the TextField
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            margin="normal"
                            id="date_of_birth"
                            label="Date of birth"
                            name="date_of_birth"
                            autoComplete="date_of_birth"
                            autoFocus
                            value={values.date_of_birth}
                            onChange={handleDateChange}
                            sx={{
                                bgcolor: "white",
                                borderRadius: "5px",
                                height: "56px", // Consistent height
                                width: "100%",
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        autoComplete="phone_number"
                        autoFocus
                        value={values.phone_number}
                        onChange={handleChange("phone_number")}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "5px",
                            height: "56px", // Consistent height
                        }}
                        InputProps={{
                            style: { height: "100%" }, // Ensure inner input fills the TextField
                        }}
                    />
                    <Grid
                        container
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                    >
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="house_address"
                                label="House address"
                                name="house_address"
                                autoComplete="house_address"
                                autoFocus
                                value={values.house_address}
                                onChange={handleChange("house_address")}
                                sx={{
                                    bgcolor: "white",
                                    borderRadius: "5px",
                                    height: "56px", // Consistent height
                                }}
                                InputProps={{
                                    style: { height: "100%" }, // Ensure inner input fills the TextField
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="district_address"
                                    label="District address"
                                    name="district_address"
                                    autoComplete="district_address"
                                    autoFocus
                                    value={values.district_address}
                                    onChange={handleChange("district_address")}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "5px",
                                        height: "56px", // Consistent height
                                    }}
                                    InputProps={{
                                        style: { height: "100%" }, // Ensure inner input fills the TextField
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="city_address"
                                    label="City address"
                                    name="city_address"
                                    autoComplete="city_address"
                                    autoFocus
                                    value={values.city_address}
                                    onChange={handleChange("city_address")}
                                    sx={{
                                        bgcolor: "white",
                                        borderRadius: "5px",
                                        height: "56px", // Consistent height
                                    }}
                                    InputProps={{
                                        style: { height: "100%" }, // Ensure inner input fills the TextField
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>{" "}
                    <FormControl fullWidth>
                        <InputLabel
                            id="demo-simple-select-label"
                            sx={{
                                top: "16px",
                            }}
                        >
                            Roles
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.roles}
                            label="Roles"
                            onChange={handleRoleChange}
                            fullWidth
                            sx={{
                                bgcolor: "white",
                                borderRadius: "5px",
                                height: "56px", // Consistent height
                                marginTop: "16px",
                            }}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="seller">Seller</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isButtonDisabled}
                        sx={{
                            mt: 5,
                            bgcolor: isButtonDisabled ? "grey" : "#52D681",
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
