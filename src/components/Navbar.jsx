import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from 'react-router-dom';
import sitelogo from '../LOGO 2.png';  // Logo import  
import LoginIcon from '@mui/icons-material/Login';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const PrimarySearchAppBar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = React.useState(null);

  const notifications = [
    "New book added: 'The Great Gatsby'",
    "Your order has been shipped!",
    "Reminder: Your book return is due soon.",
    "New message from the support team.",
    "A new review has been posted on your book."
  ];

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(notificationMenuAnchorEl);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate('/profile')}>My Account</MenuItem>
      <MenuItem onClick={() => navigate('/cart')}>Cart</MenuItem>
      <MenuItem onClick={() => navigate('/Orders')}>Orders</MenuItem>
      {/* <MenuItem onClick={() => navigate('/addbook')}>Add Book</MenuItem> */}
      <MenuItem onClick={() => navigate('/Admin')}>Admin</MenuItem>
      <MenuItem onClick={() => navigate('/about')}>About Us</MenuItem>
      <MenuItem onClick={() => navigate('/login')}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <img
          src={"https://img.freepik.com/premium-photo/beautiful-anime-woman-passport-size-pic_685680-483.jpg"}
          alt="Profile"
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%', // Makes it round  
            marginRight: '10px',
          }}
        />
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
      <MenuItem onClick={() => navigate('/about')}>About Us</MenuItem>
      <MenuItem onClick={() => navigate('/cart')}>Cart</MenuItem>
      <MenuItem onClick={() => navigate('/addbook')}>Add Book</MenuItem>
    </Menu>
  );

  const notificationMenuId = 'notification-menu';
  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationMenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={index} onClick={handleNotificationMenuClose}>
          {notification}
        </MenuItem>
      ))}
    </Menu>
  );

  const sidebarList = () => (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#4e125e', // Main sidebar background  
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
        padding: 0,
      }}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        <ListSubheader
          sx={{
            backgroundColor: '#4e125e', // Darker background color for the header  
            color: 'white', // Attractive text color  
            fontWeight: 'bold',
            textAlign: 'center', // Center the header text  
            fontSize: '1.25rem', // Larger font size  
            padding: '16px 0', // Add padding for spacing  
          }}
        >
          Book Categories
        </ListSubheader>

        {["Home", "Fiction", "Non-Fiction", "Children's Books", "Mystery", "Science Fiction", "Fantasy", "Graphic Novels", "Others",
          "Historical Fiction", "Biography", "Poetry", "Cookbooks", "Self-Help", "Travel", "True Crime", "Comics",
          "Classic Literature", "Anthology", "Products", "About", "Contact"].map(item => (
            <ListItem
              button
              key={item}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'E5CCFF', // Dark background on hover  
                  color: '#FFFFFF', // Keep text color white for contrast  
                },
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#8c29a6' }} elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <img src={sitelogo} onClick={() => navigate('/')} width={200} alt="Site Logo" />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="login"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              <LoginIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img
                src={"https://img.freepik.com/premium-photo/beautiful-anime-woman-passport-size-pic_685680-483.jpg"}
                alt="Profile"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%', // Makes the image round  
                }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
      <Drawer open={drawerOpen} onClose={handleDrawerClose}>
        {sidebarList()}
      </Drawer>
    </Box>
  );
};

export default PrimarySearchAppBar;


