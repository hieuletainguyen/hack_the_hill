import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const Login = () => {
   const navigate = useNavigate(); 

   const handleSignUp = () => {
       navigate('/signup'); 
   };
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
               
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Welcome Back!
                    </Typography>
                    <Typography variant="body1">
                        Please enter your credentials to access your account. 
                        If you don't have an account yet, consider signing up for new features and updates!
                    </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Sign In
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <TextField
                            id="standard-email-input"
                            label="Enter your email"
                            type="email"
                            autoComplete="current-email"
                            variant="standard"
                        />
                        <TextField
                            id="standard-password-input"
                            label="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Sign In
                        </Button>

                       <Button variant="text" color="secondary" onClick={handleSignUp}>
                            Don't have an account? Sign Up
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}



