import { Calendar, Text, HStack, VStack, Divider, Input, Button } from 'rsuite';
import { Radio, RadioGroup } from 'rsuite';
import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Box, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, TextField, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Timeline } from 'rsuite';
import CheckIcon from '@rsuite/icons/legacy/Check';
import TabPanel from '@mui/lab/TabPanel';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { NavBar } from './NavBar';

function renderCell() {

  return (
    <div style={{ position: 'relative'}}>
      <Text as="span" muted size="sm">✅</Text>
    </div>
  );
}

function getBackgroundClass(roll) {
    switch (roll) {
        case 'great':
            return 'bg-great';
        case 'good':
            return 'bg-good';
        case 'soso':
            return 'bg-soso';
        case 'bad':
            return 'bg-bad';
        case 'verybabd':
            return 'bg-verybad';
        default:
            return 'bg-default';  // fallback just in case
    }
}

export const Home = () => {
  
    const [date, setDate] = useState(new Date());
    const displayReflexion = () => {
        console.log('display reflexion');
    }

    return (
        <>
        <HStack
            divider={<Divider vertical style={{ height: 500 }} />}
            spacing={20} 
            wrap
            style={{ 
                width: '100%',
                height: '100vh',
                padding: 1,
                paddingTop: 40,
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <style>{`
                .bg-great {background-color: #32CD32;}
                .bg-good {background-color: #98FF98;}
                .bg-soso {background-color: #FDFD96;}
                .bg-bad {background-color: #FFC067;}  
                .bg-verybad {background-color: #FF6961;}
                .bg-default {background-color: white;}`
            }</style>
       
            <VStack>
                <Typography variant="h3" gutterBottom>Hey there, Marc!</Typography>
                <Typography variant='h6'>Sunday, September 29, 2024 </Typography>
                <Box 
                    sx={{ width: '100%' }}>
                    <LinearProgress 
                        variant="determinate" 
                        value={78}
                        color='success'
                        sx={{ height: 10, borderRadius: 5, bgcolor: 'green.300' }}
                    />
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end',
                            mt: 1  // Margin top to give space between the bar and text
                        }}
                    >
                        <Typography variant='body1'>78% achieved</Typography>
                    </Box>
                </Box>
                <Calendar
                    bordered
                    renderCell={renderCell}
                    cellClassName={() => getBackgroundClass()}
                    style={{ width: 600 }}
                    onChange={() => displayReflexion()}
                />
            </VStack>
            <VStack
                style={{
                    width: 600,
                    height: 700,
                    padding: 10,
                    // backgroundColor: 'blue',
                }}
            >
                <Reflexion date={date} />
            </VStack>
        </HStack>
        </>
    );

};

function Reflexion({ date }) {

    const [completed, setCompleted] = useState(false);
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
    });
  
    // Function to handle the dialog open
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // Function to handle the dialog close
    const handleClose = () => {
      setOpen(false);
    };
  
    // Function to handle form data changes
    const handleChange2 = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Function to handle form submission
    const submitReflection = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // Add form submission logic here
      handleClose(); // Close the dialog after submission
    };

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <VStack 
        spacing={10}
        style={{ 
            padding: 10,
            borderRadius: 10,
            border: '1px solid #e0e0e0',
            // backgroundColor: 'blue',
        }}
    >

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Mission" value="1" />
            <Tab label="Journal" value="2" />
            <Tab label="Emotions" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {/* if challenge not completed, ask to complete, if completed, ask for reflextion */}
            {!completed ?
                <VStack
                    spacing={10}
                    style={{ width: 400 }}
                >
                    <Text size="xxl">For Today...</Text>
                    <Text size="xl">Run 10K at a 6:00 min/km pace</Text>
                    <Text wrap>To run a 10K at a 6:00 min/km pace, start with a proper warm-up, including light jogging and dynamic stretches. During the run, keep a steady pace, using a running app or watch to monitor your splits. Focus on consistent breathing and form, avoiding early fatigue by not starting too fast. </Text>

                    <Text size="xxl">Things to keep in mind...</Text>
                    <Text wrap>Hydrate before the run, and use mental cues to stay focused, especially in the last kilometers. Finish with a cool-down and some light stretching.</Text>
                    <Button
                        style={{
                            color: "white", 
                            backgroundColor: "green", 
                            width: '100%',
                            size: 'xxl'
                        }}
                        onClick={() => {
                            setCompleted(true)
                            handleClickOpen()
                        }}
                    >
                        {completed ? "Complete" : "Completed"}
                    </Button>
                </VStack>
                :
            <>
                <Button
                    style={{color: "white", backgroundColor: "green"}}
                    onClick={() => setCompleted(false)}
                >
                    You have completed today's challenge!
                </Button>
            </>
            }
        </TabPanel>
        <TabPanel value="2">
            <VStack
                spacing={10}
                style={{ width: 400 }}
            >
            <Timeline className="custom-timeline">
                <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                    <p>March 1, 11:34</p>
                    <p>Start of the Challenge</p>
                    <p>Great job on starting! it is never easy to start something new</p>
                </Timeline.Item>
                <Timeline.Item dot={<WarningRoundIcon style={{ background: 'white', color: 'red' }} />}>
                    <p>March 1, 11:34</p>
                    <p>😔</p>
                    <p>You were sick, and that is okay!</p>
                </Timeline.Item>
                <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                    <p>March 3, 14:20</p>
                    <p>😊</p>
                    <p>Started off a bit rough but I ended the run very strong!</p>
                </Timeline.Item>
                <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                    <p>March 5</p>
                    <p>End of Challenge</p>
                    <p>Celebrate your achievements and be proud of yourself!</p>
                </Timeline.Item>
            </Timeline>
            </VStack>
        </TabPanel>
        
        <TabPanel value="3">
            <VStack
                spacing={10}
                style={{ width: 400 }}
            >
                <Text size="xxl">How are you feeling today?</Text>
                <RadioGroup name="radioList" inline>
                    <Radio value="great">Great</Radio>
                    <Radio value="good">Good</Radio>
                    <Radio value="soso">So-so</Radio>
                    <Radio value="bad">Bad</Radio>
                    <Radio value="verybad">Very Bad</Radio>
                </RadioGroup>
                <Input 
                    as="textarea" 
                    rows={5} placeholder="Why do you feel this way?" 
                    style={{ width: 400, height: 300 }}
                />
            </VStack>
        </TabPanel>

      </TabContext>
    </Box>

    <Dialog 
        open={open} 
        onClose={handleClose}
    >
        <DialogTitle>How did you feel about the challenge today? Take a moment to reflect...</DialogTitle>

        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                multiline
                rows={4}
                name="name"
                placeholder="Type something here"
                fullWidth // Ensures the TextField takes the full width
                variant="outlined"
                value={formData.name}
                onChange={handleChange2}
            />
            <DialogTitle style={{ width: '100%', padding: 0 }}>
                How would you describe your mood?
            </DialogTitle>

            <ButtonGroup
                size="large"
                variant="outlined"
                aria-label="emoji button group"
                style={{ width: '100%', justifyContent: 'space-between' }}
            >
            <Button value="A" style={{ flexGrow: 1, flexDirection: 'column', fontSize: '2rem', marginLeft: 5, marginRight: 5, paddingTop: 20, paddingBottom: 20 }}>
                😁
                <span style={{ fontSize: '1rem' }}>Happy</span>
            </Button>
            <Button value="B" style={{ flexGrow: 1, flexDirection: 'column', fontSize: '2rem', marginLeft: 5, marginRight: 5, paddingTop: 20, paddingBottom: 20 }}>
                😊
                <span style={{ fontSize: '1rem' }}>Content</span>
            </Button>
            <Button value="C" style={{ flexGrow: 1, flexDirection: 'column', fontSize: '2rem', marginLeft: 5, marginRight: 5, paddingTop: 20, paddingBottom: 20 }}>
                😐
                <span style={{ fontSize: '1rem' }}>Neutral</span>
            </Button>
            <Button value="D" style={{ flexGrow: 1, flexDirection: 'column', fontSize: '2rem', marginLeft: 5, marginRight: 5, paddingTop: 20, paddingBottom: 20 }}>
                😩
                <span style={{ fontSize: '1rem' }}>Sad</span>
            </Button>
            </ButtonGroup>
            
        </DialogContent>

        <DialogActions>
          <Button onClick={submitReflection} color="primary" variant="contained">
            Save my reflection
          </Button>
        </DialogActions>

    </Dialog>

    </VStack>
  );
}