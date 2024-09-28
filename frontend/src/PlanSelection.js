import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActionArea } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%', // Takes 70% of the width
    display: 'flex',
    justifyContent: 'space-around', // Space around the cards
  },
  card: {
    width: '100%', // Each card takes 30% of the container width
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

export const PlanSelection = () => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, title: 'Easy', description: 'This is the basic plan.' },
    { id: 2, title: 'Medium', description: 'This is the standard plan.' },
    { id: 3, title: 'Hard', description: 'This is the premium plan.' },
  ];

  const handleSelectPlan = (id) => {
    setSelectedPlan(id);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.cardContainer}>
        {plans.map((plan) => (
          <Grid item key={plan.id}>
            <Card
              className={`${classes.card} ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {plan.title}
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
        onClick={() => alert(`Selected Plan: ${plans.find(plan => plan.id === selectedPlan).title}`)}
      >
        Continue
      </Button>
    </div>
  );
};