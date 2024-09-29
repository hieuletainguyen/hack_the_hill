import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Slide, Fade, Zoom } from '@mui/material';
import Typewriter from './effect/TypeWriter.js';
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

export const LoginSignup = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:9897"}/auth`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email, 
        password: password
      })
    })

    const data = await response.json();

    if (data.message === "success") {
      props.setStatus({
        ...props.status,
        login: true, 
        username: email
      })

      Cookies.set("TOKENS", data.token, {expires: 1});
      console.log(data)
      if (Object.keys(data.data).length === 0){
        navigate("/survey")
      } else {
        navigate("/home")
      }
      
    } else if(data.message === "Invalid email or password") {
      window.alert("Incorrect password or email");

  } else {
      console.log(data);
  }

    console.log(data);
  }

  const handleSignUp = async() => {
    if (password1 !== password2) {
      alert("Both your password are not correct")
      return -1
    }
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:9897"}/add-account`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        email: email, 
        password: password1
      })
    })

    const data = await response.json();
    console.log(data);
    if (data.message === "add succesfully"){
      alert("Your account is registered successfully")
      navigate(0)
    }

  }

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <Box 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
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
              <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)}/>
              <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
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
              <TextField label="Email" variant="outlined" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" onChange={(e) => setPassword1(e.target.value)}/>
              <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" onChange={(e) => setPassword2(e.target.value)}/>
              <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
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
