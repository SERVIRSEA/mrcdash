import React from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    AccordionDetails 
} from './CustomAccordionStyles';


const CustomAccordion = ({ title, children, ...props }) => (
    <Accordion {...props}>
        <AccordionSummary sx={{ '& .MuiTypography-root': { fontSize: '12px' }}}>{title}</AccordionSummary>
        <AccordionDetails sx={{'& .MuiTypography-root': { padding: 0, margin: 0 }}}>{children}</AccordionDetails>
    </Accordion>
);

export default CustomAccordion;
