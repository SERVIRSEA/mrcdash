import React, { useEffect, useState } from 'react';
import RainfallChart from './Charts/RainfallChart';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

function RainfallContent() {
  const [rainfallData, setRainfallData] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [totalEvents, setTotalEvents] = useState(0);

  // Fetch the rainfall data (replace with your API endpoint or data source)
  useEffect(() => {
    // Replace with your API endpoint or data source
    fetch('/dash/assets/data/stationData.json')
      .then((response) => response.json())
      .then((data) => {
        setRainfallData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to categorize rainfall
  const categorizeRainfall = (rf) => {
    if (rf > 90) {
      return 'Very Heavy Rain';
    } else if (rf >= 36 && rf <= 90) {
      return 'Heavy Rain';
    } else if (rf >= 11 && rf <= 35) {
      return 'Moderate Rain';
    } else if (rf >= 1 && rf <= 10) {
      return 'Light Rain';
    } else if (rf === 0 || isNaN(rf)) {
      return 'No Rain';
    } else {
      return 'Unknown'; // You can handle other cases as needed
    }
  };
  // Process the data to count rainfall categories
  useEffect(() => {
    const counts = {};

    // Categorize rainfall and count occurrences
    rainfallData.forEach((record) => {
      const category = categorizeRainfall(record.RF);
      counts[category] = (counts[category] || 0) + 1;
    });

    // console.log(counts)

    // Update the state with category counts
    setCategoryCounts(counts);

    // Calculate total events
    const total = Object.values(counts).reduce((acc, count) => acc + count, 0);
    setTotalEvents(total);
  }, [rainfallData, setCategoryCounts, setTotalEvents]);

  const gridItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box p={2} sx={{ overflow: 'auto', height: '65vh'}}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        Very Heavy Rain
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '0px' }}>
                        90+ mm
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["Very Heavy Rain"]}
                    totalEvents={totalEvents}
                    eventColor="#e53935"
                    totalEventsColor="#ef9a9a"
                    style={{marginTop: 0, paddingTop:0}}
                />
            </Grid>

            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        Heavy Rain
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center' }}>
                        36 - 90 mm
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["Heavy Rain"]}
                    totalEvents={totalEvents}
                    eventColor="#ffb74d"
                    totalEventsColor="#ffe0b2"
                />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        Moderate Rain
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center' }}>
                        15 - 35 mm
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["Moderate Rain"]}
                    totalEvents={totalEvents}
                    eventColor="#ffa000"
                    totalEventsColor="#ffe082"
                />
            </Grid>

            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        Light Rain
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center' }}>
                        1 - 10 mm
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["Light Rain"]}
                    totalEvents={totalEvents}
                    eventColor="#1565c0"
                    totalEventsColor="#90caf9"
                />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        No Rain
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '0px' }}>
                        0 mm
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["No Rain"]}
                    totalEvents={totalEvents}
                    eventColor="#bdbdbd"
                    totalEventsColor="#eeeeee"
                />
            </Grid>

            <Grid item xs={6}>
                <div style={gridItemStyle}>
                    <Typography variant="h6">
                        No Data
                    </Typography>
                    <Typography variant="body2" style={{ textAlign: 'center' }}>
                        
                    </Typography>
                </div>
                <RainfallChart
                    key={0}
                    count={categoryCounts["Unknown"]}
                    totalEvents={totalEvents}
                    eventColor="#bdbdbd"
                    totalEventsColor="#eeeeee"
                />
            </Grid>
        </Grid>
    </Box>
  );
}

export default RainfallContent;