import React, { useState } from 'react';
import {Zoom} from '@mui/material';
import "./Survey.css";
import questions from './helpers/SurveyQuestions';
import axios from '../axios'
import { useNavigate } from "react-router-dom";

export const Survey = (props) => {
  const {login, username} = props.status;
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({
    answer1: '', 
    answer2: '',
    answer3: '', 
    answer4: '',
    answer5: '', 
    answer6: ''
  });

  // Handle option selection for checkboxes (only one selected allowed)
 const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswer(prevState => ({
      ...prevState,
      [`answer${questionIndex + 1}`]: prevState[`answer${questionIndex + 1}`] === option ? '' : option
    }));
  };

  // Check if all questions are answered
  const checkingAllQuestionAnswered = () => {
    for (const key in selectedAnswer) {
      if (selectedAnswer[key] === '') {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = () => {
    axios.post('/add-survey', selectedAnswer)
    .then((response) => {
      console.log(response.data); // Handle the response data
    })
    .catch((error) => {
      console.error('Error submitting survey:', error); // Handle any error
    });
  };

  return (
    <div className="survey-box">
    <div className="main-survey-container">
      <Zoom in timeout={600}>
      <div className="survey-header">
        <h2>Survey</h2>
        <p>Please answer the questions one at a time.</p>
      </div>

      {/* Display only the current question with animation */}
      <div className="question-container">
        <p className="question-title">{questions[currentQuestionIndex].question}</p>
        <div className="options-container">
          {questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex} className="survey-option">
              <input
                type="checkbox"
                name={`question${currentQuestionIndex}`}
                value={option}
                checked={selectedAnswer[`answer${currentQuestionIndex + 1}`] === option}
                onChange={() => handleOptionChange(currentQuestionIndex, option)}
              />
              <label className="option-label">{option}</label>
            </div>
            
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <button
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit
      </button>

        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="nav-button"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            disabled={!selectedAnswer[`answer${currentQuestionIndex + 1}`]}
          >
            Next
          </button>
        ) : (
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={checkingAllQuestionAnswered()}
          >
            Submit
          </button>
        )}
      </div>
    </div>
    </div>
  );
};
