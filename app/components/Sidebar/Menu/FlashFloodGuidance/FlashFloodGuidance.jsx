import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function FlashFloodGuidance(){
    const [expandedPanel, setExpandedPanel] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <Accordion
            expanded={expandedPanel === 'panel2'} 
            onChange={(event, isExpanded) => setExpandedPanel(isExpanded ? 'panel2' : false)}
            sx={{
                boxShadow: 'none', 
                '&:before': {
                    height: '1px',
                },
                '&.Mui-expanded': {
                    margin: '0',
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel1a-header"
                sx={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: expandedPanel === 'panel2' ? '#bbdefb' : 'transparent',
                    '&:hover': {
                        backgroundColor: expandedPanel === 'panel2' ? '#bbdefb' : 'none' 
                    }
                }}
            >
                <Typography>FLASH FLOOD GUIDANCE</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemText primary="MRC FFGS Products for LMB" />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemText primary="Bulletin" />
                    </ListItemButton>
                </List>
            </AccordionDetails>
        </Accordion>
    )
}