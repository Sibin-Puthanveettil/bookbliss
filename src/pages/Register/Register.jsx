import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Link,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Footer, Navbar } from "../../components";
import BgImage from '../Login/Bg.jpg'; // Adjust the path based on your project structure  

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            setOpenSnackbar(true);
            return;
        }

        // Add your registration logic here  
        console.log('Registration successful!', formData);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Navbar />

            <Container component="main" maxWidth="xs" sx={{
                position: 'relative',
                zIndex: 1,
                marginBottom: 10,
                paddingBottom: 2,
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for the form  
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 8,
                    }}
                >
                    <Typography component="h1" variant="h5">
                     <b> REGISTER</b>
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                sx={{ marginRight: 1 }} // Space between columns  
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Second Name"
                                name="secondName"
                                value={formData.secondName}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{ marginRight: 1 }} // Space between columns  
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Mobile Number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Box>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Register
                        </Button>
                        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                            {"Already have an account? "}
                            <Link href="#" onClick={() => navigate('/login')}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${BgImage})`, // URL of your background image  
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(3px)',
                    zIndex: -999999 // Behind the container  
                }}
            />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    );
};

export default RegisterPage;