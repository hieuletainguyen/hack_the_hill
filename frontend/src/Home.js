import { Calendar, Text, HStack, VStack, Divider, Input, Button } from 'rsuite';
import { Radio, RadioGroup } from 'rsuite';
import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Timeline } from 'rsuite';
import CheckIcon from '@rsuite/icons/legacy/Check';
import TabPanel from '@mui/lab/TabPanel';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { NavBar } from './components/NavBar';

function renderCell(date) {

  return (
    <div 
        style={{ 
            position: 'relative',
        }}
    >
      <Text as="span" muted size="sm">
        5km
      </Text>
    </div>
  );
}

function getBackgroundClass() {
    const roll = Math.floor(Math.random() * 9) + 1;
    switch (roll) {
        case 1:
            return 'bg-emerald';
        case 2:
            return 'bg-mint';
        case 3:
            return 'bg-jungle';
        case 4:
            return 'bg-lime';
        case 5:
            return 'bg-olive';
        case 6:
            return 'bg-moss';
        case 7:
            return 'bg-red';
        case 8:
            return 'bg-parrot';
        case 9:
            return 'bg-neon';
        default:
            return 'bg-default';  // fallback just in case
    }
}

export const Home = () => {
  
    const [date, setDate] = useState(new Date());

    return (
        <>
        <NavBar/>
        <HStack
            divider={<Divider vertical style={{ height: 500 }} />} 
            spacing={20} 
            wrap
            style={{ 
                width: '100%',
                height: '100vh',
                padding: 5,
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <style>{`
                .bg-emerald {background-color: #50C878;}     /* Emerald Green */
                .bg-mint {background-color: #98FF98;}        /* Mint Green */
                .bg-lime {background-color: #32CD32;}        /* Lime Green */
                .bg-olive {background-color: #808000;}       /* Olive Green */
                .bg-moss {background-color: #8A9A5B;}        /* Moss Green */
                .bg-pistachio {background-color: #93C572;}   /* Pistachio Green */
                .bg-parrot {background-color: #3CB371;}      /* Medium Sea Green */
                .bg-red {background-color: #FF474D;}         /* Red */
                .bg-neon {background-color: white;}`
            }</style>
       
            <VStack>
                <Calendar
                    bordered
                    renderCell={renderCell}
                    cellClassName={() => getBackgroundClass()}
                    style={{ width: 600 }}
                    onChange={() => setDate(new Date())}
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

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <VStack spacing={10}>

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Daily Mission" value="1" />
            <Tab label="Timeline" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            {/* if challenge not completed, ask to complete, if completed, ask for reflextion */}
            {!completed ?
                <VStack
                    spacing={10}
                    style={{ width: 400 }}
                >
                    <Text size="xxl">Run 10K at a 6:00 min/km pace</Text>
                    <Text wrap>To run a 10K at a 6:00 min/km pace, start with a proper warm-up, including light jogging and dynamic stretches. During the run, keep a steady pace, using a running app or watch to monitor your splits. Focus on consistent breathing and form, avoiding early fatigue by not starting too fast. Hydrate before the run, and use mental cues to stay focused, especially in the last kilometers. Finish with a cool-down and some light stretching.</Text>
                    <Button
                        style={{color: "white", backgroundColor: "green", width: '100%'}}
                        onClick={() => setCompleted(true)}
                    >
                        {!completed ? "Complete" : "Completed"}
                    </Button>
                </VStack>
                :
            <>
                <VStack
                    spacing={10}
                    style={{ width: 350 }}
                >
                    <Text size="xxl">Take a moment to self-reflect on your accomplishment...</Text>
                    <Input 
                        as="textarea" 
                        rows={5} placeholder="How did today's challenge feel?" 
                        style={{ width: 400, height: 300 }}
                    />
                </VStack>

                <VStack>
                    <Text>What emotions are you feeling?</Text>
                    <RadioGroup name="radio-group-inline-picker" inline appearance="picker" defaultValue="A">
                        <Radio value="A">😁</Radio>
                        <Radio value="B">😊</Radio>
                        <Radio value="C">😐</Radio>
                        <Radio value="D">😩</Radio>
                    </RadioGroup>
                </VStack>

                <Button
                    style={{color: "white", backgroundColor: "green"}}
                    onClick={() => setCompleted(false)}
                >
                    Finish your reflection
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
                <p>Sick</p>
                <p>You were sick, and that is okay!</p>
                </Timeline.Item>
                <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                <p>March 3, 14:20</p>
                <p>10 km run at 6:00 min/km pace</p>
                <p>You completed the challenge with ease!</p>
                </Timeline.Item>
                <Timeline.Item dot={<CheckIcon style={{ background: '#15b215', color: '#fff' }} />}>
                <p>March 3, 17:50</p>
                <p>End of Challenge</p>
                <p>Celebrate your achievements and be proud of yourself!</p>
                </Timeline.Item>
            </Timeline>
            </VStack>
        </TabPanel>
      </TabContext>
    </Box>

    </VStack>
  );
}