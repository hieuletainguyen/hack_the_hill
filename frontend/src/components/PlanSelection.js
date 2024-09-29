import React, { useState, useEffect } from 'react'; 
import { Grid, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from './axios';
import { plans as samplePlans } from './helpers/SampleObjects';
import PlanItem from './PlanSelectionItem'; // Import the PlanItem component
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
    padding: theme.spacing(4),
  },
  cardContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  },
  continueButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
    width: '30%',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  title: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  description: {
    textAlign: 'center',
    maxWidth: '80%',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
  },
}));

export const PlanSelection = (props) => {
  const {login, username} = props.status;
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/get-plans", {
      params: {
        email: username, // Assuming username is available
      }
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      setPlans(data.result); // Assuming `data.result` contains the list of plans
    })
    .catch((error) => {
      console.error("Error fetching plans:", error);
    });
  }, [username]);
  
  

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
      <Typography variant="h4" className={classes.title}>
        Choose Your Quitting Plan
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Choose a plan that fits your journey to break a habit. The 
        <strong> Easy</strong> plan offers gradual change, 
        <strong> Medium</strong> provides a balanced approach, and 
        <strong> Hard</strong> is for those seeking immediate action.
      </Typography>
      
      <Grid container className={classes.cardContainer}>
        {plans.map((plan) => (
          <Grid item key={plan.id}>
            <PlanItem
              plan={plan}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
            />
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