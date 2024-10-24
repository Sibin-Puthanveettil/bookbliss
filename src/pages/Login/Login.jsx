import React, { useState } from "react";  
import { Footer, Navbar } from "../../components";  
import { Container, TextField, Button, Typography, Link, Box, Snackbar, Alert } from '@mui/material';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios'; // Import axios for API calls  
import BackkImage from './Bg.jpg';  

const LoginPage = () => {  
    const [mobile, setMobile] = useState('');  
    const [password, setPassword] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');  
    const [successMessage, setSuccessMessage] = useState('');  // State for success messages  
    const [openSnackbar, setOpenSnackbar] = useState(false);  
    const [isSuccess, setIsSuccess] = useState(false); // State to track if the message is success  
    const navigate = useNavigate();  

    const handleLogin = async (event) => {  
        event.preventDefault();  

        if (!mobile || !password) {  
            setErrorMessage("Mobile number and password are required.");  
            setIsSuccess(false); // Make sure it's an error message  
            setOpenSnackbar(true);  
            return;  
        }  

        try {  
            const response = await axios.get(`https://localhost:44302/API/custlogin?mobile=${mobile}&Password=${password}`);  
            const { status, message, id, customerName, mobileNumber } = response.data;  

            if (status === 1) {  
                // Save customer details to local storage
                const customerData = {
                    id: id,
                    customerName: customerName,
                    mobileNumber: mobileNumber
                };
                localStorage.setItem('customerData', JSON.stringify(customerData)); // Save as JSON

                setSuccessMessage("Login successful! Welcome " + customerName); // Set success message  
                setIsSuccess(true); // Indicate this is a success message  
                setOpenSnackbar(true);  
                navigate('/ProductFeeds');  
            } else {  
                setErrorMessage(message);  
                setIsSuccess(false);  
                setOpenSnackbar(true);  
            }  
        } catch (error) {  
            setErrorMessage('An error occurred during login. Please try again later.');  
            setIsSuccess(false);  
            setOpenSnackbar(true);  
        }  
    };  

    const handleCloseSnackbar = () => {  
        setOpenSnackbar(false);  
    };  

    return (  
        <>  
            <Navbar />  
            <Container  
                component="main"  
                maxWidth="xs"  
                sx={{  
                    position: 'relative',  
                    zIndex: 1,  
                    marginBottom: 10,  
                    paddingBottom: 2,  
                    borderRadius: '10px',  
                    backgroundColor: 'white'  
                }}  
            >  
                <Box  
                    sx={{  
                        display: 'flex',  
                        flexDirection: 'column',  
                        alignItems: 'center',  
                        mt: 8,  
                    }}  
                >  
                    <Typography component="h1" variant="h5">  
                        Login  
                    </Typography>  
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{  
                        mt: 1,  
                        zIndex: 0  
                    }}>  
                        <TextField  
                            margin="normal"  
                            required  
                            fullWidth  
                            label="Mobile Number"  
                            autoComplete="tel"  
                            autoFocus  
                            value={mobile}  
                            onChange={(e) => setMobile(e.target.value)}  
                        />  
                        <TextField  
                            margin="normal"  
                            required  
                            fullWidth  
                            label="Password"  
                            type="password"  
                            autoComplete="current-password"  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                        />  
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#333333' }}>  
                            Login  
                        </Button>  
                        <Link href="#" variant="body2" onClick={() => alert('Forgot Password')}>  
                            Forgot password?  
                        </Link>  
                                               <Typography variant="body2" align="center" sx={{ mt: 2 }}>  
                            {"Don't have an account? "}  
                            <Link href="#" onClick={() => navigate('/register')}>  
                                Register  
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
                    backgroundImage: `url(${BackkImage})`,  
                    backgroundSize: 'cover',  
                    backgroundPosition: 'center',  
                    filter: 'blur(3px)',  
                    zIndex: -999999  
                }}  
            />  
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>  
                <Alert onClose={handleCloseSnackbar} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>  
                    {isSuccess ? successMessage : errorMessage}  
                </Alert>  
            </Snackbar>  
            <Footer />  
        </>  
    );  
};  

export default LoginPage;  

