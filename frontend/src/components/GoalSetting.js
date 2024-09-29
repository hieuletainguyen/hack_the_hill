import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export const GoalSetting = (props) => {
    const {login, username} = props.status
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
      const response  = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-goal`, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: username, 
          goal: inputText
        })
      })

      const data = await response.json();
      console.log(data);
      navigate("/plan");  
      
    };


    return (

<Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        sx={{
          width: 700,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Personalized greeting text */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hey, what bad habit are you trying to break today?
        </Typography>

        {/* Input field */}
        <TextField
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{
            mb: 2,
            height: "100px", // Larger height
            borderRadius: "10px", // Rounded corners
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out",
            "& .MuiOutlinedInput-root": {
              height: "100%", // Maintain height of the input field
              fontSize: "20px", // Larger font size
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.2)", // Lighter border color
              },
              "&:hover fieldset": {
                borderColor: "#1976d2", // Blue border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2", // Blue border on focus
                boxShadow: "0px 6px 15px rgba(25, 118, 210, 0.2)", // More intense shadow on focus
              },
            },
            "& .MuiInputBase-input": {
              fontSize: "20px", // Bigger font for the input text
              padding: "20px", // Increase padding for better spacing
            },
          }}
        />

        {/* Submit button */}
        <Box display="flex" justifyContent="flex-end">
          <Button  variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
    )

};