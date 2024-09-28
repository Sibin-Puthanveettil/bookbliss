
import React from "react";
// import { Link } from "react-router-dom";
import { Footer, Navbar } from "../../components";
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Add your login logic here
    };

    return (
      <>
      <Navbar/>
        <Container component="main" maxWidth="xs" sx={{backgroundColor:'yellow'}}>
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
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
        <Footer />
        </>
    );
};

export default LoginPage;





// const Login = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Login</h1>
//         <hr />
//         <div class="row my-4 h-100">
//           <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
//             <form>
//               <div class="my-3">
//                 <label for="display-4">Email address</label>
//                 <input
//                   type="email"
//                   class="form-control"
//                   id="floatingInput"
//                   placeholder="name@example.com"
//                 />
//               </div>
//               <div class="my-3">
//                 <label for="floatingPassword display-4">Password</label>
//                 <input
//                   type="password"
//                   class="form-control"
//                   id="floatingPassword"
//                   placeholder="Password"
//                 />
//               </div>
//               <div className="my-3">
//                 <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
//               </div>
//               <div className="text-center">
//                 <button class="my-2 mx-auto btn btn-dark" type="submit" disabled>
//                   Login
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;
