import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReportIcon from '@mui/icons-material/Report';
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import Avatar from '@mui/material/Avatar';
import myImage from '../assets/Img/logo-bar@2x.png';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SidebarAdmin() {

  const category = [
    {
      name: 'Dashboards',
      icon: <EqualizerIcon style={{ color: "white", fontSize: '30px' }} />,
      url: '/admin'
    },
    {
      name: 'Users',
      icon: <PersonIcon style={{ color: "white", fontSize: '30px' }} />,
      url: "/admin/user"
    },
    {
      name: 'Posts',
      icon: <PostAddIcon style={{ color: "white", fontSize: '30px' }} />
    },
    {
      name: 'Menu',
      icon: <MenuOpenIcon style={{ color: "white", fontSize: '30px' }} />,
      url: "/admin/list-of-menu"
    },
    {
      name: 'Shop',
      icon: <StoreIcon style={{ color: "white", fontSize: '30px' }} />
    },
    {
      name: 'Profile',
      icon: <ReportIcon style={{ color: "white", fontSize: '30px' }} />,
      url: "/admin/profile"
    },
  ]

  return (
    <Box sx={{ display: 'flex', }}>
      <Drawer
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            xl: {
              width: 300,
              boxSizing: 'border-box',
              marginLeft: '30px',
              marginTop: '20px',
              marginBottom: "30px",
              borderRadius: '10px',
              maxHeight: '95vh',
              backgroundColor: '#00AD7C',
              color: 'white'
            },
            lg: {
              width: 210,
              boxSizing: 'border-box',
              marginLeft: '30px',
              marginTop: '20px',
              marginBottom: "30px",
              borderRadius: '10px',
              maxHeight: '95vh',
              backgroundColor: '#00AD7C',
              color: 'white'
            },
            sm: {
              width: 200,
              boxSizing: 'border-box',
              marginLeft: '30px',
              marginTop: '20px',
              marginBottom: "30px",
              borderRadius: '10px',
              maxHeight: '95vh',
              backgroundColor: '#00AD7C',
              color: 'white'
            },
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={myImage} alt="Logo"
          style={{ width: { xl: 180, lg: 150 }, height: 60, margin: '20px', position: 'relative', top: '0', left: { xl: '30px', lg: '70px' } }}
        />
        <Divider variant='middle' style={{ backgroundColor: '#f5f5f5', margin: '10px' }} />
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item sx={6}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 30, height: 30 }}
            />
          </Grid>
          <Grid item sx={6}>
            <p style={{ margin: '0', position: 'relative', fontSize: '20px' }}>Username</p>
          </Grid>
        </Grid>

        <Divider variant='middle' style={{ backgroundColor: '#f5f5f5', margin: '10px' }} />
        <List>
          {category.map((item) => (
            <Link to={item.url} style={{color:"white", textDecoration: 'none'}}>
              <ListItem key={item.name} disablePadding
                sx={{
                  marginBottom: '20px',
                  backgroundColor: '#52D681',
                  width: { xl: 270, lg: 180, sm: 170 },
                  position: 'relative',
                  left: '15px',
                  borderRadius: '4px'
                }}
              >
                <ListItemButton >
                  <ListItemIcon >
                    {item.icon}
                  </ListItemIcon >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider variant='middle' style={{ backgroundColor: '#f5f5f5', marginBottom: '20px' }} />
      </Drawer>
    </Box>
  );
}
