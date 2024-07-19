import React, { useState } from 'react';
import {
  Grid, AppBar, Toolbar, Typography, Box, IconButton, CircularProgress, Card, CardContent,
  Avatar, Button, Table, TableHead, TableBody, TableRow, TableCell, Popover,
  Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PaymentIcon from '@mui/icons-material/Payment';
import ChatIcon from '@mui/icons-material/Chat';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from '@mui/system';
import SideBar from '../../components/SidebarSeller'
import HeaderSeller from '~/components/Admin/Header';
const AppBarStyled = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#00AD7C',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
  margin: 'auto',
  width: '100%',
  height: '60vh'
}));

const title = "DASHBOARD";
const subtitle = "Dashboard";

const TargetText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: 14,
}));

const Grow = styled('div')({
  flexGrow: 1,
});

const CardStyled = styled(Card)({
  width: '90%',
  // margin: '5px',
});

const CardContentStyled = styled(CardContent)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CardIcon = styled(Avatar)({
  fontSize: '2rem',
  borderRadius: '50%',
  padding: '10px',
});

const month = ['1', 10, 30, 50, 70, 90, 100];

const notifications = ['Notification 1', 'Notification 2', 'Notification 3'];
const messages = ['Message 1', 'Message 2', 'Message 3'];
const chartData = [1000, 2000, 5000, 7000, 10000, 8000, 9500];

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [anchorElChat, setAnchorElChat] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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

  const open = Boolean(anchorEl);
  const openNoti = Boolean(anchorElNoti);
  const openChat = Boolean(anchorElChat);
  const openAccount = Boolean(anchorElAccount);
  const id = open ? 'simple-popover' : undefined;
  const idNoti = openNoti ? 'notification-popover' : undefined;
  const idChat = openChat ? 'chat-popover' : undefined;
  const idAccount = openAccount ? 'account-popover' : undefined;

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ flexGrow: 1 }}>
          <HeaderSeller title={title} subtitle={subtitle} />
          <Box sx={{ p: 3, borderRadius: '9px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', margin: '10px', backgroundColor: '#fff' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', m: 2 }}>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={3}>
                  <CardStyled>
                    <CardContentStyled>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={3} container justifyContent="center">
                          <CardIcon sx={{ backgroundColor: '#00CA92' }}>
                            <PeopleIcon />
                          </CardIcon>
                        </Grid>
                        <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Box ml={2}>
                            <Typography variant="body2" sx={{ color: '#015E44' }}>New Users</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00CA92', display: 'flex', justifyContent: 'end' }}>1234</Typography>
                          </Box>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={12}>
                          <Typography variant="body2">Number of new users</Typography>
                        </Grid>
                      </Grid>
                    </CardContentStyled>
                  </CardStyled>
                </Grid>
                <Grid item xs={3}>
                  <CardStyled>
                    <CardContentStyled>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={3} container justifyContent="center">
                          <CardIcon sx={{ backgroundColor: '#E93B77' }}>
                            <PaymentIcon />
                          </CardIcon>
                        </Grid>
                        <Grid item xs={9} container sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Box ml={2}>
                            <Typography variant="body2" sx={{ color: '#015E44' }}>Today's Transactions</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00CA92', display: 'flex', justifyContent: 'end' }}>5678</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ top: '100px' }}>+55% than last week</Typography>
                        </Grid>
                      </Grid>
                    </CardContentStyled>
                  </CardStyled>
                </Grid>
                <Grid item xs={3}>
                  <CardStyled>
                    <CardContentStyled>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={3} container justifyContent="center">
                          <CardIcon sx={{ backgroundColor: '#63B967' }}>
                            <ReceiptIcon />
                          </CardIcon>
                        </Grid>
                        <Grid item xs={9} container sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Box ml={2}>
                            <Typography variant="body2" sx={{ color: '#015E44' }}>New Recipes</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00CA92', display: 'flex', justifyContent: 'end' }}>4321</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">Number of new recipes</Typography>
                        </Grid>
                      </Grid>
                    </CardContentStyled>
                  </CardStyled>
                </Grid>
                <Grid item xs={3}>
                  <CardStyled>
                    <CardContentStyled>
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={3} container justifyContent="center">
                          <CardIcon sx={{ backgroundColor: '#1E78E9' }}>
                            <PostAddIcon />
                          </CardIcon>
                        </Grid>
                        <Grid item xs={9} container sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Box ml={2}>
                            <Typography variant="body2" sx={{ color: '#015E44' }}>New Posts</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00CA92', display: 'flex', justifyContent: 'end' }}>8765</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2">Number of new posts</Typography>
                        </Grid>
                      </Grid>
                    </CardContentStyled>
                  </CardStyled>
                </Grid>
              </Grid>
            </Box>

            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <CardContainer sx={{ padding: "28px 10px", boxSizing: "content-box", display: 'flex', justifyContent: 'space-around', alignItems: "center", flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress variant="determinate" sx={{ color: 'white', border: '1px solid white', borderRadius: '100px', padding: '5px' }} value={75} size={100} thickness={5} />
                    <Box top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography variant="h5" component="div">
                        75%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Total Sale Made Today
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    250.000₫
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Before payment, it will not be recorded here.
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <TargetText>Target</TargetText>
                      <Typography variant="h6">340.000₫</Typography>
                    </Grid>
                    <Grid item>
                      <TargetText>Last week</TargetText>
                      <Typography variant="h6" style={{ color: '#FF7D7D' }}>1.200.000₫</Typography>
                    </Grid>
                    <Grid item>
                      <TargetText>Last month</TargetText>
                      <Typography variant="h6" style={{ color: '#B5FF7D' }}>10.340.000₫</Typography>
                    </Grid>
                  </Grid>
                </CardContainer>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ m: 4, px: 2, borderRadius: '9px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', padding: '10px 20px' }}>
                  <Typography variant="h6" sx={{ margin: ' 15px 0px', color: 'rgba(1, 94, 68)', fontWeight: 'bold' }}>Last 6 months</Typography>
                  <Box>
                    <LineChart
                      xAxis={[{ data: month }]}
                      yAxis={[
                        { id: 'linearAxis', scaleType: 'linear' },
                        { id: 'logAxis', scaleType: 'log' },
                      ]}
                      series={[
                        { yAxisKey: 'linearAxis', data: month, label: 'last month' },
                        { yAxisKey: 'logAxis', data: month, label: 'this month' },
                      ]}
                      leftAxis="linearAxis"
                      rightAxis="logAxis"
                      height={400}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Typography variant="h6" sx={{ color: 'rgba(1, 94, 68, 0.5)', fontWeight: 'bold' }}>Last transitions</Typography>
              <Table sx={{ p: 3, borderRadius: '9px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', margin: '10px', justifyContent: "center", color: '#015E44' }}>
                <TableHead sx={{ color: '#015E44' }}>
                  <TableRow>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Trans Id</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>User</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Seller</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Product</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Amount</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Price</TableCell>
                    <TableCell align="center" sx={{ color: '#015E44' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(Array(7).keys()).map((index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ color: '#015E44' }}>#{index + 1}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>User {index + 1}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>Seller {index + 1}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>Product {index + 1}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>{Math.floor(Math.random() * 100)}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>{Math.floor(Math.random() * 1000)}</TableCell>
                      <TableCell align="center" sx={{ color: '#015E44' }}>{index % 2 === 0 ? 'Completed' : 'Pending'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}
