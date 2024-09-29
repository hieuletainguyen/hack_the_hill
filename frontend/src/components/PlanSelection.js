import React, { useState, useEffect } from 'react'; 
import { Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from '../axios';
import { plans as samplePlans } from './helpers/SampleObjects';
import PlanItem from './PlanSelectionItem'; // Import the PlanItem component

const useStyles = makeStyles((theme) => ({
  root: {

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  cardContainer: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
}));

export const PlanSelection = () => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);

  // Fetch available plans from the backend
  useEffect(() => {

    // For testing purposes
    setPlans(samplePlans)


    // axios.get("/get-plans", {
    //   params: {
    //     email: 'user@example.com', // Update email if necessary
    //     request: 'plan_selection'
    //   }
    // })
    // .then((response) => {
    //   setPlans(response.data.plans); // Assuming response.data.plans contains the list of plans
    // })
    // .catch((error) => {
    //   console.error("Error fetching plans:", error);
    // });
    }, []);

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
  };

  const handleContinue = () => {
    if (selectedPlan !== null) {
      const chosenPlan = plans.find(plan => plan.id === selectedPlan);
      axios.post("/chosen-plan", {
        email: 'user@example.com',
        plan: chosenPlan.title,
        request: 'plan_selection'
      })
      .then((response) => {
        alert(`Plan chosen: ${chosenPlan.title}`);
      })
      .catch((error) => {
        console.error("Error selecting plan:", error);
      });
    }
  };

  return (
    <div className={classes.root}>
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