import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faFlagCheckered, faChevronDown, faCalendarAlt, faList, faBook, faTasks, faRunning, faHeartbeat, faLeaf, faComments } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons

const useStyles = makeStyles((theme) => ({
  card: {
    width: '85%',
    margin: theme.spacing(3),
    borderRadius: '15px', // Rounded corners
    transition: 'all 0.3s ease-in-out',
    border: `2px solid transparent`,
    '&:hover': {
      transform: 'scale(1.03)', // Slight scaling on hover
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)', // Soft shadow on hover
      borderColor: theme.palette.primary.main, // Highlighted border on hover
    },
    '&.selected': {
      borderColor: theme.palette.primary.main, // Highlight border if selected
    },
  },
  easyBackground: {
    background: 'linear-gradient(135deg, #E0F7FA, #B2EBF2)', // Light cyan gradient for Easy
  },
  mediumBackground: {
    background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)', // Light orange gradient for Medium
  },
  hardBackground: {
    background: 'linear-gradient(135deg, #FFEBEE, #FFCDD2)', // Light red gradient for Hard
  },
  cardHeader: {
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    fontSize: '1.4rem',
    marginLeft: theme.spacing(1),
  },
  planDetails: {
    padding: theme.spacing(0.2),
    backgroundColor: '#f9f9f9',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  accordionSummary: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  trophiesContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
  },
  sectionContent: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  topicsSubtitle: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5),
    opacity: 0.8, // Opaque subtitle
    fontStyle: 'italic',
  },
  goalDuration: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main, // Strong color for goal and duration
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
}));

const PlanItem = ({ plan, selectedPlan, handleSelectPlan }) => {
  const classes = useStyles();

  // Helper function to determine the number of trophies based on the plan title
  const getTrophiesCount = (title) => {
    if (title === 'Easy') return 1;
    if (title === 'Medium') return 2;
    if (title === 'Hard') return 3;
    return 1; // Default to 1 if not matching any of the expected titles
  };

  const renderTrophies = () => {
    const count = getTrophiesCount(plan.title);
    return [...Array(count)].map((_, index) => (
      <FontAwesomeIcon key={index} icon={faTrophy} className={classes.icon} />
    ));
  };

  // Helper function to assign icons to each week based on its focus or content
  const getWeekIcon = (focus) => {
    if (focus.toLowerCase().includes('nutrition')) return faLeaf;
    if (focus.toLowerCase().includes('support')) return faComments;
    if (focus.toLowerCase().includes('healthy') || focus.toLowerCase().includes('physical')) return faHeartbeat;
    if (focus.toLowerCase().includes('quit date')) return faCalendarAlt;
    if (focus.toLowerCase().includes('gradual')) return faRunning;
    return faList; // Default icon
  };

  // Assign background class based on plan title
  const getBackgroundClass = () => {
    if (plan.title === 'Easy') return classes.easyBackground;
    if (plan.title === 'Medium') return classes.mediumBackground;
    if (plan.title === 'Hard') return classes.hardBackground;
    return ''; // Default case
  };

  return (
    <Card
      className={`${selectedPlan === plan.id ? 'selected' : ''}`}
      onClick={() => handleSelectPlan(plan.id)}
    >
      <CardActionArea>
        <CardContent className={`${classes.card} ${getBackgroundClass()}`}>
          <div className={classes.trophiesContainer}>
            {renderTrophies()}
            <Typography variant="h5" component="div" className={classes.cardHeader}>
              {plan.title}
            </Typography>
          </div>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {plan.description}
          </Typography>

          {plan.planDetails && (
            <>
              <Typography variant="subtitle1" className={classes.goalDuration}>
                <FontAwesomeIcon icon={faFlagCheckered} className={classes.icon} />
                Goal: {plan.planDetails.goal}
              </Typography>
              <Typography variant="subtitle2" className={classes.goalDuration}>
                <FontAwesomeIcon icon={faCalendarAlt} className={classes.icon} />
                Duration: {plan.planDetails.duration}
              </Typography>

              {/* Render individual week Accordions */}
              {plan.planDetails.weeks.map((week, index) => (
                <div key={index}>
                  {/* Week Title and Focus with Week Icon */}
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    <FontAwesomeIcon icon={getWeekIcon(week.focus)} className={classes.icon} />
                    Week {week.week}: {week.focus}
                  </Typography>

                  {/* Topics as Subtitle (outside collapsible) */}
                  <Typography variant="subtitle2" className={classes.topicsSubtitle}>
                    {week.topics.join(', ')}
                  </Typography>

                  {/* Collapsible Details */}
                  <Accordion className={classes.planDetails}>
                    <AccordionSummary
                      expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                      aria-controls={`panel${index + 1}-content`}
                      id={`panel${index + 1}-header`}
                      className={classes.accordionSummary} 
                    >
                      <Typography >More Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      <div className={classes.sectionTitle}>
                        <FontAwesomeIcon icon={faBook} className={classes.icon} />
                        Resources
                      </div>
                      <Typography variant="body2" className={classes.sectionContent}>
                        {week.resources.join(', ')}
                      </Typography>

                      <div className={classes.sectionTitle}>
                        <FontAwesomeIcon icon={faTasks} className={classes.icon} />
                        Projects
                      </div>
                      <Typography variant="body2" className={classes.sectionContent}>
                        {week.projects.join(', ')}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {index < plan.planDetails.weeks.length - 1 && <Divider className={classes.divider} />}
                </div>
              ))}
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlanItem;
