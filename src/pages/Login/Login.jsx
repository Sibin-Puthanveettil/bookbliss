import React from "react";
// import { Link } from "react-router-dom";  
import { Footer, Navbar } from "../../components";
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackkImage from './Bg.jpg'
const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Add your login logic here  
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
                    backgroundColor: 'white' // Semi-transparent background for the form  
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
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
                    backgroundImage: `url(${BackkImage})`, // URL of your background image  
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(3px)',
                    zIndex: -9999999999999999// Behind the container  
                }}
            />
            <Footer />
        </>
    );
};

export default LoginPage;