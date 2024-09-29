import React, { useState } from 'react';
import {Zoom} from '@mui/material';
import "./Survey.css"
import { useNavigate } from "react-router-dom";

export const Survey = (props) => {
  const {login, username} = props.status;
  const navigate = useNavigate();
  const questions = [
    { 
      question: "How do you typically approach problem-solving or decision-making in your daily life or work?", 
      options: [
        "I rely on intuition and experience.",
        "I gather all the relevant information before making a decision.",
        "I consult others for advice or input.",
        "I prefer to take risks and experiment with new solutions."
      ]
    },
    { 
      question: "When encountering a new technology or tool, how do you prefer to learn about it—through hands-on experience, reading, or tutorials?", 
      options: [
        "Hands-on experimentation.",
        "Reading documentation or articles.",
        "Watching tutorials or videos.",
        "Learning through discussion with peers."
      ]
    },
    { 
      question: "What motivates you to engage with or return to a product or service consistently?", 
      options: [
        "Ease of use and efficiency.",
        "High-quality design and aesthetics.",
        "Personalization and customization options.",
        "Consistent updates and new features."
      ]
    },
    {
      question: "How do you handle feedback, both positive and negative, in personal or professional settings?",
      options: [
        "I appreciate and act on feedback, regardless of type.",
        "I value positive feedback but struggle with negative feedback.",
        "I reflect on feedback but don’t always act on it.",
        "I tend to dismiss feedback unless it aligns with my perspective."
      ]
    }, 
    {
      question: "What role does routine play in your life—do you prefer structured schedules or a more flexible approach to tasks?", 
      options: [
        "I prefer a strict, structured routine.",
        "I like some structure, but flexibility is important.",
        "I work best with complete flexibility and spontaneity.",
        "I follow a routine only when necessary."
      ]
    },
    {
      question: "How do you balance creativity with practicality when working on projects or making choices?",
      options: [
        "I prioritize practicality over creativity.",
        "I prefer creative solutions even if they are less practical.",
        "I balance both equally depending on the situation.",
        "I let the project’s goals dictate whether I lean toward creativity or practicality."
      ]
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState({
    answer1: '', 
    answer2: '',
    answer3: '', 
    answer4: '',
    answer5: '', 
    answer6: ''
  });

 const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswer(prevState => ({
      ...prevState,
      [`answer${questionIndex + 1}`]: option
    }));
  };

  const checkingAllQuestionAnswered = () => {
    for (const key in selectedAnswer) {
      if (selectedAnswer[key] === ''){
        return true
      }
    }
    return false
  }

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:9897/add-survey`, {
      method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ ...selectedAnswer, username: username})
    })

    const data = await response.json();
    if (data.message === "add succesfully") {
      navigate("/goal-setting")
    } else {
      console.log(data)
    }
    
  }

  return (
    <div className="survey-box">
    <div className="main-survey-container">
      <Zoom in timeout={600}>
      <div className="survey-header">
          SURVEY
      </div>
      </Zoom>
      
      {questions.map((q, questionIndex) => (
        
        <div key={questionIndex} className="head-survey-container">

          <p className="zoom">{q.question}</p>
          
          {q.options.map((option, optionIndex) => (
            <div key={optionIndex} className="survey-option">
              <input
                type="radio"
                name={`question${questionIndex}`}
                value={option}
                checked={selectedAnswer[`answer${questionIndex + 1}`] === option}
                onChange={() => handleOptionChange(questionIndex, option)}
              />
              <label>{option}</label>
            </div>
            
          ))}
          </div>
      ))}

      <button className="submit-button" onClick={handleSubmit} disabled={checkingAllQuestionAnswered()}>SUBMIT</button>
    </div>
    </div>
  );
};
