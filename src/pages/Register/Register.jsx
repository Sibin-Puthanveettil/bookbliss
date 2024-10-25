import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Link,
    Box,
    Snackbar,
    Alert,
    Avatar
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
        profilePic: null, // Add profilePic to formData
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // Default to error
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePic: reader.result }); // Set the base64 string
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => { 
        const { firstName, secondName, email, mobileNumber, password, confirmPassword} = formData;

        if (!firstName || !secondName || !email || !mobileNumber || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return false;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return false;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match.");
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return false;
        }

        // if(profilePic==null){
        //     setErrorMessage("Please Upload Profile Picture !!!"); 
        //     setSnackbarSeverity('error');
        //     setOpenSnackbar(true);
        //     return false;
        // }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }
debugger;
        const customerData = {
            name: `${formData.firstName} ${formData.secondName}`,
            mobile: formData.mobileNumber,
            password: formData.password,
            createddate: new Date().toISOString(), // Use current date as created date
            profilePic: formData.profilePic!=null ? formData.profilePic.split(",")[1]:"", // Include profile picture in the data
        };

        try {
            const response = await fetch('https://localhost:44302/API/CreateCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 1 && data.message === "success") {
                setErrorMessage(data.message);
                setSnackbarSeverity('success'); // Set Snackbar severity to success
                setOpenSnackbar(true);
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                setErrorMessage(data.message);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.error('Error during registration:', error);
        }
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
                        {/* Profile Picture Upload */}
                        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                src={formData.profilePic} // Display the uploaded image
                                sx={{ width: 100, height: 100, mb: 2, border: '2px solid #333' }} // Circular avatar with border
                            />
                            <Button variant="contained" component="label">
                                Upload Profile Picture
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleChange}
                                    name="profilePic"
                                />
                            </Button>
                        </Box>

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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#333333' }}>
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the Snackbar
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {errorMessage || successMessage} {/* Display error or success message */}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    );
};

export default RegisterPage;


