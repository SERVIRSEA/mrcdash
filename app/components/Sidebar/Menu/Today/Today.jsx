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

export default function Today(){
    const [expandedPanel, setExpandedPanel] = useState(false);
    return (
        <Accordion
            expanded={expandedPanel === 'panel1'} 
            onChange={(event, isExpanded) => setExpandedPanel(isExpanded ? 'panel1' : false)}
            sx={{
                boxShadow: 'none', // Removes default shadow
                '&:before': {
                    height: '1px', // Removes the default top border
                },
                '&.Mui-expanded': {
                    margin: '0',
                }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    backgroundColor: expandedPanel === 'panel1' ? '#bbdefb' : 'transparent',
                    '&:hover': {
                        backgroundColor: expandedPanel === 'panel1' ? '#bbdefb' : 'none' 
                    },
                    '&.Mui-focusVisible': {
                        backgroundColor: 'transparent',
                        '& .MuiIconButton-root': {
                            color: 'inherit',  // reset color if it changes on focus
                        }
                    }
                }}
            >
                <Typography>TODAY</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Link href="#" underline="none">
                    <Typography variant="button" component="body2" sx={{color: "#000"}}>
                        TODAY&apos;S STATUS
                    </Typography>
                </Link>
            </AccordionDetails>
        </Accordion>
    )
}