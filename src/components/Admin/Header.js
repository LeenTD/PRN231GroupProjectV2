import React, { useState } from "react";
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Button,
    Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import { signOut } from "~/api/firstStep/index";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const HeaderAdmin = ({ title, subtitle }) => {
    const [anchorElNoti, setAnchorElNoti] = useState(null);
    const [anchorElChat, setAnchorElChat] = useState(null);
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleNotificationClick = (event) => {
        setAnchorElNoti(event.currentTarget);
    };

    const handlePopoverCloseNoti = () => {
        setAnchorElNoti(null);
    };

    const handleChatClick = (event) => {
        setAnchorElChat(event.currentTarget);
    };

    const handlePopoverCloseChat = () => {
        setAnchorElChat(null);
    };

    const handleAccountClick = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handlePopoverCloseAccount = () => {
        setAnchorElAccount(null);
    };

    const handleSignOut = async () => {
        navigate("/signIn");
    };

    const openNoti = Boolean(anchorElNoti);
    const openChat = Boolean(anchorElChat);
    const openAccount = Boolean(anchorElAccount);
    const idNoti = openNoti ? "notification-popover" : undefined;
    const idChat = openChat ? "chat-popover" : undefined;
    const idAccount = openAccount ? "account-popover" : undefined;

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: "#fff", boxShadow: "none" }}
        >
            <Toolbar>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={6}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                color: "#00AD7C",
                                fontWeight: "bold",
                            }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ pr: 2, color: "#00AD7C" }}
                        >
                            {subtitle}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton
                    onClick={handleNotificationClick}
                    size="large"
                    sx={{
                        borderRadius: "4px",
                        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.2)",
                        margin: " 0px 10px",
                    }}
                >
                    <NotificationsIcon />
                </IconButton>
                <Popover
                    id={idNoti}
                    open={openNoti}
                    anchorEl={anchorElNoti}
                    onClose={handlePopoverCloseNoti}
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
                        <Typography variant="body1">
                            Notification Popover
                        </Typography>
                        {/* Add content for notification popover here */}
                    </Box>
                </Popover>
                <IconButton
                    onClick={handleChatClick}
                    size="large"
                    sx={{
                        borderRadius: "4px",
                        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.2)",
                        margin: " 0px 10px",
                    }}
                >
                    <ChatIcon />
                </IconButton>
                <Popover
                    id={idChat}
                    open={openChat}
                    anchorEl={anchorElChat}
                    onClose={handlePopoverCloseChat}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1">Chat Popover</Typography>
                        {/* Add content for chat popover here */}
                    </Box>
                </Popover>
                <IconButton
                    onClick={handleAccountClick}
                    size="large"
                    sx={{
                        borderRadius: "4px",
                        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.2)",
                        margin: " 0px 10px",
                    }}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Popover
                    id={idAccount}
                    open={openAccount}
                    anchorEl={anchorElAccount}
                    onClose={handlePopoverCloseAccount}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Box sx={{ p: 2 }} align="center">
                        <Typography variant="h6">Account</Typography>
                        <Avatar />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={handleSignOut}
                        >
                            Log out
                        </Button>
                    </Box>
                </Popover>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderAdmin;
