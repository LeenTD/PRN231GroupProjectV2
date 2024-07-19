import React, { useState, useEffect } from 'react';
import { Box, Grid, Avatar, Typography, TextField, Button, Popover, IconButton, AppBar, Toolbar, Select, MenuItem, InputLabel, OutlinedInput } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';
import SideBar from '../../components/SidebarAdmin';
import HeaderAdmin from '~/components/Admin/Header';
const StyledAvatar = styled(Box)({
  backgroundImage: 'url(https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/14054104/image-100-y-tuong-avatar-cute-doc-dao-an-tuong-nhat-cho-ban-166567566414594.jpg)',
  width: 300,
  height: 300,
  backgroundSize: 'contain',
  position: 'relative',
  // cursor: 'pointer',
  border: '3px solid',
  borderColor: '#015E44',
  '&:hover .camera-overlay': {
    opacity: 1,
  },
  borderRadius: 4,
});

const CameraOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: 0,
  transition: 'opacity 0.3s',
  color: 'white',
});

const ProfileUpdate = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [anchorElChat, setAnchorElChat] = useState(null);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [editable, setEditable] = useState(false); // New state for edit mode
  const [userData, setUserData] = useState({
    username: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    house_address: '',
    district_address: '',
    city_address: '',
    profile_picture: '',
    date_of_birth: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

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

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const date = new Date(userData.date_of_birth).getDate();
  const monthz = new Date(userData.date_of_birth).getMonth() + 1;
  const yearz = new Date(userData.date_of_birth).getFullYear();
  // const username = "Lee Hieu";
  // const phoneNumber = "0919283749";
  // const email = "hiueln@gmail.com";
  // const detailAddress = "39, Yersin"

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const title = "PROFILE";
  const subtitle = "Profile";

  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');

  // Giả sử bạn có dữ liệu về các phường, quận và tỉnh thành
  const wards = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'];
  const districts = ['District 1', 'District 2', 'District 3', 'District 4'];
  const provinces = ['Province 1', 'Province 2', 'Province 3', 'Province 4'];

  const handleWardChange = (event) => {
    setWard(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
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
    <Grid container>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
      <Grid item xs={9}>
        <Box sx={{ backgroundColor: '#F4FFEC', height: '100vh', color: '#fff' }}>
          <HeaderAdmin title={title} subtitle={subtitle} />
          <Box sx={{ p: 3, borderRadius: '9px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', margin: '10px', backgroundColor: '#fff', color: '#015E44' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box position="relative">
                  <StyledAvatar onClick={handleAvatarClick} src={userData.profile_picture}>
                    <CameraOverlay className="camera-overlay">
                      <CameraAltIcon />
                    </CameraOverlay>
                  </StyledAvatar>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body2" gutterBottom>
                  {`${date} - ${monthz} - ${yearz}`}
                </Typography>
                <Typography variant="h3" gutterBottom>
                  {`${userData.first_name} ${userData.middle_name} ${userData.last_name}`}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <TextField fullWidth label="Username" InputLabelProps={{ shrink: true }} defaultValue={userData.username} InputProps={{ readOnly: !editable }} placeholder={userData.username} variant="outlined" margin="dense" />
                  <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <TextField fullWidth label="First Name" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: !editable }} placeholder={userData.first_name} variant="outlined" margin="dense" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField fullWidth label="Middle Name" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: !editable }} placeholder={userData.middle_name} variant="outlined" margin="dense" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField fullWidth label="Last Name" InputLabelProps={{ shrink: true }} InputProps={{ readOnly: !editable }} placeholder={userData.last_name} variant="outlined" margin="dense" />
                    </Grid>
                  </Grid>
                  <TextField fullWidth label="Phone number" InputLabelProps={{ shrink: true }} defaultValue={userData.phone_number} InputProps={{ readOnly: !editable }} placeholder={userData.phone_number} variant="outlined" margin="dense" />
                  <TextField fullWidth label="Email" InputLabelProps={{ shrink: true }} defaultValue={userData.email} InputProps={{ readOnly: !editable }} placeholder={userData.email} variant="outlined" margin="dense" />
                  <TextField fullWidth label="Detail address" InputLabelProps={{ shrink: true }} defaultValue={userData.house_address} InputProps={{ readOnly: !editable }} placeholder={userData.house_address} variant="outlined" margin="dense" />

                  <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid item xs={4}>
                      <InputLabel id="ward-label" sx={{ color: '#015E44' }}>Ward</InputLabel>
                      <Select
                        labelId="ward-label"
                        id="ward"
                        value={ward || userData.house_address}
                        onChange={handleWardChange}
                        disabled={!editable}
                        input={<OutlinedInput id="ward-placeholder" />}
                        sx={{ width: '95%' }}
                      >
                        <MenuItem value={userData.house_address}>
                          {userData.house_address}
                        </MenuItem>
                        {wards.map((ward) => (
                          <MenuItem key={ward} value={ward}>
                            {ward}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid item xs={4}>
                      <InputLabel id="district-label" sx={{ color: '#015E44' }}>District</InputLabel>
                      <Select labelId="district-label" id="district" value={district || userData.district_address} onChange={handleDistrictChange} disabled={!editable} input={<OutlinedInput id="district-placeholder" />}
                        sx={{ width: '95%', left: "7px" }}>
                        <MenuItem value={userData.district_address}>
                          {userData.district_address}
                        </MenuItem>
                        {districts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel id="province-label" sx={{ color: '#015E44' }}>Province</InputLabel>
                      <Select labelId="province-label" id="province" value={province || userData.city_address} onChange={handleProvinceChange} disabled={!editable} input={<OutlinedInput id="province-placeholder" />}
                        sx={{ width: '95%', padding: '0px 10px', left: "14px" }}>
                        <MenuItem value={userData.city_address}>
                          {userData.city_address}
                        </MenuItem>
                        {provinces.map((province) => (
                          <MenuItem key={province} value={province}>
                            {province}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid item xs={4}>
                      <InputLabel id="day-label" sx={{ color: '#015E44' }}>Day</InputLabel>
                      <Select labelId="day-label" id="day" fullWidth value={day || date} onChange={handleDayChange} disabled={!editable} input={<OutlinedInput id="day-placeholder"
                        sx={{ width: '95%' }} />}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={date} disabled>
                          {date}
                        </MenuItem>
                        {days.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel id="month-label" sx={{ color: '#015E44' }}>Month</InputLabel>
                      <Select labelId="month-label" id="month" fullWidth value={month || monthz} onChange={handleMonthChange} disabled={!editable} input={<OutlinedInput id="month-placeholder"
                        sx={{ width: '95%', left: "7px" }} />} >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={monthz} disabled>
                          {monthz}
                        </MenuItem>
                        {months.map((month) => (
                          <MenuItem key={month} value={month}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <InputLabel id="year-label" sx={{ color: '#015E44' }}>Year</InputLabel>
                      <Select labelId="year-label" id="year" value={year || yearz} onChange={handleYearChange} disabled={!editable} input={<OutlinedInput id="year-placeholder" />}
                        sx={{ width: '95%', left: "14px" }} >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={yearz} disabled>
                          {yearz}
                        </MenuItem>
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginTop: '15px' }} >
                    {editable ? (
                      <>
                        <Grid item xs={6} container justifyContent="center">
                          <Button variant="outlined" onClick={() => setEditable(false)} sx={{
                            width: '80%', color: '#015E44', borderColor: '#015E44', '&:hover': { backgroundColor: '#015E44', color: '#52D681' },
                            fontWeight: 'bold',
                          }} >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="contained" sx={{ width: '80%', backgroundColor: '#015E44', '&:hover': { backgroundColor: '#52D681', color: '#015E44' }, fontWeight: 'bold', }}>
                            Submit
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Grid item xs={9} justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => setEditable(true)} sx={{ width: '80%', backgroundColor: '#015E44', '&:hover': { backgroundColor: '#52D681', color: '#015E44' }, fontWeight: 'bold', }}>
                          Update
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>



            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="body1">Change Profile Picture</Typography>
                <Button variant="contained" color="primary" component="label">
                  Upload File
                  <input type="file" hidden />
                </Button>
              </Box>
            </Popover>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileUpdate;
