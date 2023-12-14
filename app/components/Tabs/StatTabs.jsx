import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { statTabValueAtom } from '@/app/state/atom';
import AddIcon from '@mui/icons-material/Add';
import FFGSContent from '../Sidebar/Menu/FlashFloodGuidance/FFGSContent';
import ReservoirTable from '../Sidebar/Menu/SupportingTools/RAT/Table/ReservoirTable';
import RainfallContent from '../Sidebar/Menu/RainfallObservation/RainfallContent';
import RiverForecastContent from '../Sidebar/Menu/RiverForecast/RiverForecastContent';

export default function StatTabs() {
  const [value, setValue] = useAtom(statTabValueAtom);
  // const [value, setValue] = useState(2);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsData = [
    { label: 'TODAY', icon: AddIcon }, 
    { label: 'RIVER FORECAST', icon: AddIcon },
    { label: 'FLASH FLOOD GUIDANCE', icon: AddIcon },
    { label: 'DROUGHT FORECAST', icon: AddIcon }, 
    { label: 'MEDIUM & LONG RANGE FORECAST', icon: AddIcon },
    { label: 'RAINFALL OBSERVATION', icon: AddIcon },
    { label: 'SUPPORTING TOOLS', icon: AddIcon }
  ];

  return (
    <>
    <Box 
      sx={{ 
        bgcolor: '#2E2E2E'
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          '& .MuiTabs-scrollButtons': {
            color: 'white', 
          },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={<tab.icon />} 
            sx={{ 
              color: value === index ? '#FFD700 !important' : 'white'  
            }}
          />
        ))}
      </Tabs>
    </Box>
      <Box>
        {value === 0 && <></>} 
        {value === 1 && <RiverForecastContent />}
        {value === 2 && <FFGSContent />}
        {value === 3 && <></>}
        {value === 4 && <></>}
        {value === 5 && <RainfallContent />}
        {value === 6 && <ReservoirTable />}
      </Box>
    </>
  );
}