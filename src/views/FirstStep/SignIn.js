import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn() {
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");

        const userInfo = {
            username: username,
            fullName: "Thuy Nguyen",
            email: "thuyntt@gmailcom",
            address: "123 hoang dieu",
            phone: "+84 9876 987 098",
            detailedAddress: "Apartment 4B, 123 Main St, Springfield, USA",
            dateOfBirth: "1990-01-01",
            biography: "This is a short biography about John Doe.",
        };

        if (username === "admin" && password === "admin") {
            userInfo.role = "ROLE_ADMIN";
            navigate("/admin");
        } else if (username === "seller" && password === "seller") {
            userInfo.role = "ROLE_SELLER";
            navigate("/seller");
        } else if (username === "user" && password === "user") {
            userInfo.role = "ROLE_USER";
            navigate("/user");
        } else {
            console.error("Invalid credentials");
            return;
        }

        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify(userInfo));
    };

    const isButtonDisabled = values.username === "" || values.password === "";

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
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ mb: "5vh", color: "#015E44" }}
                    >
                        Sign in
                    </Typography>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={values.showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
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
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="baseline"
                        sx={{ padding: "5px 0 5px" }}
                    >
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/send-email"
                                variant="body2"
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            mb: 1,
                            backgroundColor: "#DB4437",
                            color: "white",
                        }}
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 1,
                            mb: 1,
                            backgroundColor: "#3b5998",
                            color: "white",
                        }}
                        startIcon={<FacebookIcon />}
                    >
                        Sign in with Facebook
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isButtonDisabled}
                        sx={{
                            mt: 1,
                            mb: 1,
                            bgcolor: isButtonDisabled ? "grey" : "#52D681",
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="baseline"
                    >
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to="/signUp"
                                variant="body2"
                            >
                                Not have account?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}





// import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import { Box } from "@mui/system";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { signIn } from "~/api/firstStep/index"; // Import the signIn function

// const defaultTheme = createTheme();

// export default function SignIn() {
//     const [values, setValues] = React.useState({
//         username: "",
//         password: "",
//         showPassword: false,
//     });

//     const handleChange = (prop) => (event) => {
//         setValues({ ...values, [prop]: event.target.value });
//     };

//     const handleClickShowPassword = () => {
//         setValues({
//             ...values,
//             showPassword: !values.showPassword,
//         });
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const navigate = useNavigate();
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         const formDataObject = {
//             username: data.get("username"),
//             password: data.get("password"),
//         };

//         console.log(formDataObject); // This will log the plain JavaScript object
//         try {
//             const response = await signIn(formDataObject);
//             console.log("check>",response);

//             // Lưu thông tin người dùng và token vào localStorage
//             localStorage.setItem('user', JSON.stringify(response));

//             // Điều hướng dựa trên vai trò người dùng
//             if (response.roles[0] === "ROLE_ADMIN") {
//                 navigate("/admin");
//             } else if (response.roles[0] === "ROLE_SELLER") {
//                 navigate("/seller");
//             } else if (response.roles[0] === "ROLE_USER") {
//                 navigate("/user");
//             } else {
//                 navigate("/signIn");
//             }
//         } catch (error) {
//             console.error("Sign In failed:", error);
//         }
//     };

//     const isButtonDisabled = values.username === "" || values.password === "";

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     height: "100vh",
//                     backgroundColor: "#015E44",
//                     justifyContent: "center",
//                 }}
//             >
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     noValidate
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         backgroundColor: "rgba(255, 255, 255, 0.7)",
//                         borderRadius: "10px",
//                         padding: "40px",
//                         width: "70vh",
//                         backgroundImage: "url(../src/assets/Img/logo2x.png)",
//                         backgroundSize: "40%",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     <Typography
//                         component="h1"
//                         variant="h4"
//                         sx={{ mb: "5vh", color: "#015E44" }}
//                     >
//                         Sign in
//                     </Typography>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="username"
//                         label="Username"
//                         name="username"
//                         autoComplete="username"
//                         autoFocus
//                         value={values.username}
//                         onChange={handleChange("username")}
//                         sx={{
//                             bgcolor: "white",
//                             borderRadius: "5px",
//                             height: "56px", // Consistent height
//                         }}
//                         InputProps={{
//                             style: { height: "100%" }, // Ensure inner input fills the TextField
//                         }}
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type={values.showPassword ? "text" : "password"}
//                         id="password"
//                         autoComplete="current-password"
//                         value={values.password}
//                         onChange={handleChange("password")}
//                         sx={{
//                             bgcolor: "white",
//                             borderRadius: "5px",
//                             height: "56px", // Consistent height
//                         }}
//                         InputProps={{
//                             style: { height: "100%" }, // Ensure inner input fills the TextField
//                             endAdornment: (
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                         edge="end"
//                                     >
//                                         {values.showPassword ? (
//                                             <VisibilityOff />
//                                         ) : (
//                                             <Visibility />
//                                         )}
//                                     </IconButton>
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                     <Grid
//                         container
//                         direction="row"
//                         justifyContent="flex-end"
//                         alignItems="baseline"
//                         sx={{ padding: "5px 0 5px" }}
//                     >
//                         <Grid item>
//                             <Link
//                                 component={RouterLink}
//                                 to="/send-email"
//                                 variant="body2"
//                             >
//                                 Forgot password?
//                             </Link>
//                         </Grid>
//                     </Grid>
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                             mt: 1,
//                             mb: 1,
//                             backgroundColor: "#DB4437",
//                             color: "white",
//                         }}
//                         startIcon={<GoogleIcon />}
//                     >
//                         Sign in with Google
//                     </Button>
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                             mt: 1,
//                             mb: 1,
//                             backgroundColor: "#3b5998",
//                             color: "white",
//                         }}
//                         startIcon={<FacebookIcon />}
//                     >
//                         Sign in with Facebook
//                     </Button>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         disabled={isButtonDisabled}
//                         sx={{
//                             mt: 1,
//                             mb: 1,
//                             bgcolor: isButtonDisabled ? "grey" : "#52D681",
//                         }}
//                     >
//                         Sign In
//                     </Button>
//                     <Grid
//                         container
//                         direction="row"
//                         justifyContent="center"
//                         alignItems="baseline"
//                     >
//                         <Grid item>
//                             <Link
//                                 component={RouterLink}
//                                 to="/signUp"
//                                 variant="body2"
//                             >
//                                 Not have account?
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// }
