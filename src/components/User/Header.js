import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
    Typography,
    Avatar,
    Popover,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import logo from "../../assets/Img/logo-bar@2x.png";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#00AD7C",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
}));

const LogoContainer = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
}));

const Logo = styled("img")(({ theme }) => ({
    width: "100%",
    marginRight: theme.spacing(2),
}));

const NavLinks = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    "& > *": {
        margin: theme.spacing(1),
    },
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
    width: 250,
    role: "presentation",
}));

const DrawerGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const DrawerButton = styled(Button)(({ theme }) => ({
    width: 100,
    textTransform: "none",
    "& .MuiTypography-root": {
        fontFamily: "Roboto, sans-serif",
    },
}));

const SignInButton = styled(Button)(({ theme }) => ({
    width: 100,
    backgroundColor: "#00AD7C",
    color: "white",
    textTransform: "none",
    "& .MuiTypography-root": {
        fontFamily: "Roboto, sans-serif",
    },
}));

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        handlePopoverClose();
        // Redirect to home page or sign-in page
        window.location.href = "/signIn";
    };

    const list = () => (
        <DrawerContainer
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {["Home", "About", "Contact"].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemIcon sx={{ color: "#015E44" }}>
                            {index === 0 ? (
                                <HomeIcon />
                            ) : index === 1 ? (
                                <InfoIcon />
                            ) : (
                                <ContactMailIcon />
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            sx={{ color: "#015E44" }}
                        />
                    </ListItem>
                ))}
            </List>
        </DrawerContainer>
    );

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <StyledAppBar sx={{ position: 'sticky' }}>
            <StyledToolbar>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={3} md={1} sm={2}>
                        <LogoContainer>
                            <Logo src={logo} alt="My Logo" />
                        </LogoContainer>
                    </Grid>
                    {!isMobile && (
                        <Grid
                            item
                            xs={8}
                            container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <NavLinks>
                                <Link to="/user" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Home
                                        </Typography>
                                    </Button>
                                </Link>
                                <Link to="/user/blog" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Blogs
                                        </Typography>
                                    </Button>
                                </Link>
                                <Link to="/user/recipe" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Recipes
                                        </Typography>
                                    </Button>
                                </Link>
                                <Link to="/user/list-of-ingredients" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Market
                                        </Typography>
                                    </Button>
                                </Link>
                                <Link to="/user/my-post" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            My Post
                                        </Typography>
                                    </Button>
                                </Link>
                                <Link to="/user/testBMI" style={{ color: "white", textDecoration: 'none' }}>
                                    <Button color="inherit">
                                        <Typography
                                            variant="button"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Test BMI
                                        </Typography>
                                    </Button>
                                </Link>
                            </NavLinks>
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={1}
                        md={1}
                        sm={2}
                        sx={{ justifyItems: "center" }}
                    >
                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : user ? (
                            <>
                                <IconButton onClick={handleProfileClick}>
                                    <Avatar
                                        src={user.profile_picture}
                                        alt={user.username}
                                    />
                                </IconButton>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handlePopoverClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                >
                                    <Box sx={{ p: 2 }}>
                                        <Button onClick={handleSignOut}>
                                            Sign Out
                                        </Button>
                                    </Box>
                                </Popover>
                            </>
                        ) : (
                            <Button href="/signIn"
                                color="inherit"
                                sx={{
                                    border: "2px solid white",
                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                }}
                            >
                                <Typography
                                    variant="button"
                                    sx={{ fontFamily: "Roboto, sans-serif" }}
                                   
                                >
                                    Sign in
                                </Typography>
                            </Button>
                        )}
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <DrawerGrid
                                container
                                direction="column"
                                justifyContent="space-between"
                                alignItems="stretch"
                            >
                                <DrawerGrid
                                    item
                                    xs
                                    container
                                    direction="column"
                                    justifyContent="space-between"
                                    alignItems="stretch"
                                >
                                    <DrawerButton
                                        role="presentation"
                                        color="inherit"
                                    >
                                        <Typography>Home</Typography>
                                    </DrawerButton>
                                    <DrawerButton
                                        role="presentation"
                                        color="inherit"
                                    >
                                        <Typography>Posts</Typography>
                                    </DrawerButton>
                                    <DrawerButton
                                        role="presentation"
                                        color="inherit"
                                    >
                                        <Typography>Recipes</Typography>
                                    </DrawerButton>
                                    <DrawerButton
                                        role="presentation"
                                        color="inherit"
                                    >
                                        <Typography>Market</Typography>
                                    </DrawerButton>
                                </DrawerGrid>
                                <DrawerGrid item xs>
                                    <SignInButton role="presentation">
                                        <Typography variant="button">
                                            Sign in
                                        </Typography>
                                    </SignInButton>
                                </DrawerGrid>
                            </DrawerGrid>
                        </Drawer>
                    </Grid>
                </Grid>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;
