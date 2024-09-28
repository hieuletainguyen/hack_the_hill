import { Calendar, Text, Badge, HStack, VStack, Divider, Tag, Input, Button } from 'rsuite';
import { HolidayUtil } from 'lunar-typescript';
import { Radio, RadioGroup } from 'rsuite';
import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';

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
      <HolidayStatus date={date} />
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
            return 'bg-pistachio';
        case 8:
            return 'bg-parrot';
        case 9:
            return 'bg-neon';
        default:
            return 'bg-default';  // fallback just in case
    }
}

export const Home = () => {
  
    const feelings = ["super", "great", "good", "ok", "bad", "terrible"];
    const [date, setDate] = useState(new Date());

  return (
    <HStack 
        divider={<Divider vertical style={{ height: 500 }} />} 
        spacing={40} 
        wrap
    >
        <style>{`
            .bg-emerald {background-color: #50C878;}     /* Emerald Green */
            .bg-mint {background-color: #98FF98;}        /* Mint Green */
            .bg-jungle {background-color: #29AB87;}      /* Jungle Green */
            .bg-lime {background-color: #32CD32;}        /* Lime Green */
            .bg-olive {background-color: #808000;}       /* Olive Green */
            .bg-moss {background-color: #8A9A5B;}        /* Moss Green */
            .bg-pistachio {background-color: #93C572;}   /* Pistachio Green */
            .bg-parrot {background-color: #3CB371;}      /* Medium Sea Green */
            .bg-neon {background-color: white;}`
            }</style>

        
        <Calendar
            bordered
            renderCell={renderCell}
            cellClassName={() => getBackgroundClass()}
            style={{ width: 700 }}
            onChange={() => setDate(new Date())}
        />
        <Reflexion date={date} />
    </HStack>
  );
};


function Reflexion({ date }) {

    const [completed, setCompleted] = useState(false);
    const [option, setOption] = useState("A");

  return (
    <VStack spacing={10}>

        <RadioGroup 
            name="radio-group-inline-picker" 
            inline appearance="picker" 
            defaultValue={option}
            onChange={value => setOption(value)}
        >
            <Radio value="A">Challenge</Radio>
            <Radio value="B">Timeline</Radio>
        </RadioGroup>

        {/* if challenge not completed, ask to complete, if completed, ask for reflextion */}
        {!completed ? 
            <VStack
                spacing={10}
                style={{ width: 350 }}
            >
                <Text size="xxl">Today's Mission</Text>
                <Text size="xxl">Run 10K at a 6:00 min/km pace</Text>
                <Text wrap>To run a 10K at a 6:00 min/km pace, start with a proper warm-up, including light jogging and dynamic stretches. During the run, keep a steady pace, using a running app or watch to monitor your splits. Focus on consistent breathing and form, avoiding early fatigue by not starting too fast. Hydrate before the run, and use mental cues to stay focused, especially in the last kilometers. Finish with a cool-down and some light stretching.</Text>
                <Button
                    style={{color: "white", backgroundColor: "green"}}
                    onClick={() => setCompleted(true)}
                >
                    {completed ? "Complete" : "Completed"}
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



    </VStack>
  );
}

const HolidayStatus = ({ date }) => {
  const holiday = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const styles = {
    position: 'absolute',
    right: -6,
    top: -26,
    transform: 'scale(0.8)',
    padding: '0 2px'
  };
  const work = holiday?.isWork();
  return holiday ? (
    <Badge content={work ? '✅' : '❌'} color={work ? 'green' : 'red'} style={styles} />
  ) : null;
};