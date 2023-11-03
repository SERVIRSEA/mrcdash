import * as React from 'react';
import { useAtom } from 'jotai';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { statTabValueAtom } from '@/app/state/atom';
import AddIcon from '@mui/icons-material/Add';

export default function StatTabs() {
  const [value, setValue] = useAtom(statTabValueAtom);

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
    <Box 
      sx={{ 
        maxWidth: {
            xs: '100%',     
            sm: 250,        
            md: 450,        
            lg: 450,       
            xl: 700,  
            xxl: 900
        }, 
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
            color: 'white', // Changing the color of the scroll buttons to white
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
  );
}