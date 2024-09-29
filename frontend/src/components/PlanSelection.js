import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: '100%', // Takes 70% of the width
    display: 'flex',
    justifyContent: 'space-around', // Space around the cards
  },
  card: {
    width: '80%', // Each card takes 30% of the container width
    height: '70vh', // Card height is 70% of viewport height
    border: '2px solid transparent',
    '&.selected': {
      border: `2px solid ${theme.palette.primary.main}`, // Border when selected
    },
  },
  continueButton: {
    marginTop: theme.spacing(3),
  },
}));

export const PlanSelection = (props) => {
  const {login, username} = props.status;
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState({});
  const navigate = useNavigate();

  // Fetch available plans from the backend
  useEffect(() => {
    // Hard-coding Testing
    // setPlans([
    //   { id: 1, title: 'Easy', description: 'This is the basic plan.' },
    //   { id: 2, title: 'Medium', description: 'This is the standard plan.' },
    //   { id: 3, title: 'Hard', description: 'This is the premium plan.' },
    // ])
    const get_plans = async () => {
      const response = await fetch(`http://localhost:9897/get-plans?email=${username}`)

      const data = await response.json();
      console.log(data)
      console.log(data.result)
      setPlans(data.result);

    }

    get_plans();
    

  }, []);

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
  };

  const handleContinue = () => {
    if (selectedPlan !== null) {
      const chosenPlan = Object.values(plans).find(plan => plan.goal === selectedPlan);
      
      // Send chosen plan to the backend
      axios.post("/chosen-plan", {
        email: username, // Update email if necessary
        goal: chosenPlan.goal,
        duration: chosenPlan.duration,
        weeks: chosenPlan.weeks
      })
      .then((response) => {
        alert(`Plan chosen: ${chosenPlan.goal}`);
        navigate("/home")
      })
      .catch((error) => {
        console.error("Error selecting plan:", error);
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.cardContainer}>
        {Object.keys(plans).length > 0 && Object.values(plans).map((plan, index) => (
          <Grid item key={index}>
            <Card
              className={`${classes.card} ${selectedPlan === plan.goal ? 'selected' : ''}`}
              onClick={() => handleSelectPlan(plan.goal)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {plan.goal}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {plan.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.continueButton}
        disabled={selectedPlan === null}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};