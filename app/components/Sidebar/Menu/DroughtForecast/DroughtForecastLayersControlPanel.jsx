import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CDICheckbox from './DroughtForecastLayers/CDICheckbox'
import ISWFCheckbox from './DroughtForecastLayers/ISWFCheckbox';
import SPI1Checkbox from './DroughtForecastLayers/SPI1Checkbox';

export default function DroughtForecastLayersControlPanel() {
    return (
        <> 
            <List pt={0} mt={0}>
                <ListItem sx={{pt:0, pb:0}}>
                    <CDICheckbox />
                </ListItem>
                <ListItem sx={{pt:0, pb:0}}>
                    <ISWFCheckbox />
                </ListItem>
                <ListItem sx={{pt:0, pb:0}}>
                    <SPI1Checkbox />
                </ListItem>
            </List>
        </>
    )
}
