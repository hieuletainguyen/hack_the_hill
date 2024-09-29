import { Calendar, HStack, Divider, Tag, Text, VStack } from 'rsuite';
import Grid from '@mui/material/Grid';
import 'rsuite/dist/rsuite.min.css';

function DayView({ date }) {

    const lunar = new Date();
    const solar = new Date();
    const holiday = new Date();
  
    return (
      <VStack spacing={10}>
        <HStack>
          <Text size="xl">{new Date().toDateString()}</Text>
        </HStack>
        
        <HStack>
            <Text>How you felt on that day:</Text>
          <Tag as="span" color="green">😊</Tag>

          <HStack wrap style={{ maxWidth: 300 }}>
            {/* {lunar.getDayYi()?.map(t => (
              <Text key={t}>{t}</Text>
            ))} */}
          </HStack>
        </HStack>

        <HStack>
            <Text>Your Reflexion</Text>
          <Tag as="span" >My body hurt a bit after the run but i felt great!</Tag>
        </HStack>

      </VStack>
    );
  }

export default function Home () {

    return (
    <Grid
        container
        direction="column"
        sx={{ height: '100vh' }} // Full viewport height
    >

        {/* Second Row */}
        <HStack divider={<Divider vertical style={{ height: 400 }} />} spacing={40} wrap>
            <Calendar
                compact
                bordered
                // renderCell={renderCell}
                style={{ width: 340 }}
                // onChange={setDate}
            />
            <DayView date={new Date()} />
        </HStack>
      
    </Grid>
    )
};


