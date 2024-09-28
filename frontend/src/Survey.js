import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';


//Didn't navigate to the next Page

export const Survey = () => {
  const questions = [
    { question: "What 1 ?" },
    { question: "What 2 ?" },
    { question: "What 3 ?" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the answer submission (e.g., save it, log it, etc.)
    console.log("Answer submitted:", answer);

    // Clear the answer field
    setAnswer('');

    // Move to the next question if there are more
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSubmitted(true); // No more questions
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 2 }}>
      {submitted ? (
        <Typography variant="h5" color="primary">
          Thank you for answering all the questions!
        </Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestionIndex].question}
          </Typography>
          <TextField
            value={answer}
            onChange={handleAnswerChange}
            label="Your answer"
            variant="outlined"
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Answer
          </Button>
        </Box>
      )}
    </Box>
  );
};

