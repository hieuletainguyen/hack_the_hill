import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Slide, Fade, Zoom } from '@mui/material';
import Typewriter from './effect/TypeWriter.js';

export const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', // Set flexDirection to column to stack elements
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* App Name */}
      <Zoom in timeout={{ enter: 500 }}>
        <Typography 
        
          variant="h3" 
          component="h1" 
          align="center" 
          sx={{ 
            mb: 4, // Add some margin below the title
            fontWeight: 'bold', 
            color: '#333',
          }}
        >
          Bad Habit Buster
        </Typography>
      </Zoom>
      <Paper 
        elevation={3}
        sx={{
          borderRadius: '30px',
          overflow: 'hidden',
          width: '900px',  // Set the width of the Paper component
          maxWidth: '90%',  // Ensures it doesn't exceed the screen size
          minHeight: '480px',
          backgroundColor: '#fff',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.35)',
          display: 'flex',
        }}
      >
        {/* Forms Area */}
        <Box sx={{ width: '50%', padding: 2, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Sign In Form */}
          <Slide direction="left" in={!isSignUp} mountOnEnter unmountOnExit timeout={300}>
            <Box 
              sx={{ 
                position: 'absolute',
                backgroundColor: '#e3f2fd', 
                height: '94%', 
                display: 'flex', 
                alignItems: 'center',
                flexDirection: 'column',
                padding: 2,
                borderRadius: '10px',
                width: '100%', // Set width to 100% to fit the parent box
                boxSizing: 'border-box', // Ensures padding is included in the width
              }}
            >
              <Typography variant="h4" gutterBottom>
                Sign In
              </Typography>
              <TextField label="Email" variant="outlined" fullWidth margin="normal" />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
              <Button variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Don't have an account? <Button onClick={handleToggle}>Sign Up</Button>
              </Typography>
            </Box>
          </Slide>

          {/* Sign Up Form */}
          <Slide direction="right" in={isSignUp} mountOnEnter unmountOnExit timeout={300}>
            <Box 
              sx={{   
                position: 'absolute',
                backgroundColor: '#e3f2fd', 
                alignItems: 'center',
                height: '94%', 
                display: 'flex', 
                flexDirection: 'column',
                padding: 2,
                borderRadius: '10px',
                width: '100%', // Set width to 100% to fit the parent box
                boxSizing: 'border-box', // Ensures padding is included in the width
              }}
            >
              <Typography variant="h4" gutterBottom>
                Sign Up
              </Typography>
              <TextField label="Email" variant="outlined" fullWidth margin="normal" />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
              <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />
              <Button variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Already have an account? <Button onClick={handleToggle}>Sign In</Button>
              </Typography>
            </Box>
          </Slide>
        </Box>
       {/* Welcome Text Area */}
       <Box 
          sx={{ 
            padding: 6, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%', 
          }}
        >
          
          <Fade in>
            <Typography variant="h5" gutterBottom>
              {isSignUp ? <Typewriter key="signup" text="Welcome To Bad Habit Buster!" delay={100} />  : <Typewriter key="signin" text="Welcome Back!" delay={100} />} 
            </Typography>
          </Fade>
          <Fade in>
            <Typography variant="body4" gutterBottom align="justify" sx={{ lineHeight: 2 }} fontSize={20}>
              {isSignUp
                ? <Typewriter key="signup-text" text="Your trusted guide to breaking bad habits and unlocking the best version of yourself. Let’s take the first step together towards a healthier, happier you." delay={25} />
                : <Typewriter key="signin-text" text="Please enter your credentials to access your account. If you don’t have an account yet, consider signing up for new features and updates!" delay={25} />}
            </Typography>
          </Fade>
        </Box>
      </Paper>
    </Box>
  );
};
