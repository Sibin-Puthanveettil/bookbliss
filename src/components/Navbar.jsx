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
import AccountCircle from '@mui/icons-material/AccountCircle';  
import NotificationsIcon from '@mui/icons-material/Notifications';  
import MoreIcon from '@mui/icons-material/MoreVert';  
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  
import Drawer from '@mui/material/Drawer';  
import List from '@mui/material/List';  
import ListItem from '@mui/material/ListItem';  
import ListItemText from '@mui/material/ListItemText';  
import sitelogo from '../LOGO 2.png';
import {useNavigate} from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader'; 





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
  [theme.breakpoints.up('sm')]: {  
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
    },  
  },  
}));  

export default function PrimarySearchAppBar() {  
const navigate = useNavigate()


  const [anchorEl, setAnchorEl] = React.useState(null);  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);  
  const [drawerOpen, setDrawerOpen] = React.useState(false);  

  const isMenuOpen = Boolean(anchorEl);  
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);  

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
      <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>  
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>  
      <MenuItem onClick={()=>navigate('/login')}>Login</MenuItem> 
      <MenuItem onClick={()=>navigate('/about')}>About Us</MenuItem>  
      <MenuItem onClick={()=>navigate('/cart')}>cart</MenuItem>  
      <MenuItem onClick={()=>navigate('/addbook')}>Add Book</MenuItem>  

 
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
       <MenuItem onClick={() => navigate('/cart')}>  
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">  
        <Badge badgeContent={4} color="error">  
          <ShoppingCartIcon />  
        </Badge>  
      </IconButton>  
      <p>Cart</p>  
    </MenuItem>   
      <MenuItem>  
        <IconButton  
          size="large"  
          aria-label="show 17 new notifications"  
          color="inherit"  
        >  
          <Badge badgeContent={17} color="error">  
            <NotificationsIcon />  
          </Badge>  
        </IconButton>  
        <p>Notifications</p>  
      </MenuItem>  
      <MenuItem onClick={handleProfileMenuOpen}>  
        <IconButton  
          size="large"  
          aria-label="account of current user"  
          aria-controls="primary-search-account-menu"  
          aria-haspopup="true"  
          color="inherit"  
        >  
          <AccountCircle />  
        </IconButton>  
        <p>Profile</p>  
      </MenuItem>  
    </Menu>  
  );  

  const sidebarList = () => (  
    <Box  
       sx={{  
          width: 250,  
          backgroundColor: '#282c34',   // Main sidebar background  
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
        {/* Book Categories Header */}  
        <ListSubheader   
          sx={{   
            backgroundColor: '#444', // Darker background color for the header  
            color: 'white', // Attractive text color  
            fontWeight: 'bold',   
            textAlign: 'center',  // Center the header text  
            fontSize: '1.25rem',   // Larger font size  
            padding: '16px 0',    // Add padding for spacing  
          }}   
        >  
          Book Categories  
        </ListSubheader>  

        {/* List Items with hover effect */}  
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
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>  
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
            <img src={sitelogo} onClick={() => navigate('/')} width={200}/>
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
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">  
              <Badge badgeContent={4} color="error">  
                <ShoppingCartIcon />  
              </Badge>  
            </IconButton>  
            <IconButton  
              size="large"  
              aria-label="show 17 new notifications"  
              color="inherit"  
            >  
              <Badge badgeContent={17} color="error">  
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
              <AccountCircle />  
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
      <Drawer open={drawerOpen} onClose={handleDrawerClose}>  
        {sidebarList()}  
      </Drawer>  
    </Box>  
  );  
}