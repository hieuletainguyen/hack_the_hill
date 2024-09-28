import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export const Signup =() => {
    const navigate = useNavigate(); 

    const handleLogin = () => {
        navigate('/login'); 
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
               
              <Grid item xs={12} md={6}>
                   <Typography variant="h5" gutterBottom>
                        Welcome Back!
                    </Typography>
                    <Typography variant="body1">
                    Welcome to appName – your trusted guide to breaking bad 
                    habits and unlocking the best version of yourself. Let’s take the 
                    first step together towards a healthier, happier you.
                    </Typography>
                </Grid> 

                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Sign up 
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: 'grey.300', // Set the background color to grey
                            padding: 3,
                            borderRadius: 2, 
                         }}
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
                            Sign Up
                        </Button>
                        <Button variant="text" color="secondary" onClick={handleLogin}>
                             Alrealdy have an account?
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}


