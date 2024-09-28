import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
// import 'rsuite/dist/rsuite.min.css';

export const GoalSetting = () => {

    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted text: ", inputText)
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
        onSubmit={handleSubmit}
        sx={{
          width: 700,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Personalized greeting text */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hey marc, what bad habit are you trying to break today?
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
    )

};