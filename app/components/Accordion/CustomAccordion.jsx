import React from 'react';
import { 
    Accordion, 
    AccordionSummary, 
    AccordionDetails 
} from './CustomAccordionStyles';


const CustomAccordion = ({ title, children, ...props }) => (
    <Accordion {...props}>
        <AccordionSummary>{title}</AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
);

export default CustomAccordion;
