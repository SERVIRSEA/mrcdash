import React from "react";
import { Typography } from "@mui/material";
import CustomAccordion from "@/app/components/Accordion/CustomAccordion";
import DroughtForecastLayersControlPanel from "./DroughtForecastLayersControlPanel";

export default function DroughtForecast() {
    const [expandedPanel1, setExpandedPanel1] = React.useState(false);
    const [expandedPanel2, setExpandedPanel2] = React.useState(false);
    const [expandedPanel3, setExpandedPanel3] = React.useState(false);

    const handleChangePanel1 = () => {
        setExpandedPanel1(!expandedPanel1);
    };

    const handleChangePanel2 = () => {
        setExpandedPanel2(!expandedPanel2);
    };

    const handleChangePanel3 = () => {
        setExpandedPanel3(!expandedPanel3);
    };

    return (
        <div>
            <CustomAccordion 
                expanded={expandedPanel1}
                onChange={handleChangePanel1}
                title={<Typography>Drought Forecast</Typography>}
            >
                <DroughtForecastLayersControlPanel />
            </CustomAccordion>

            <CustomAccordion 
                expanded={expandedPanel2}
                onChange={handleChangePanel2}
                title={<Typography>Drought Monitoring</Typography>}
            >
                <Typography></Typography>
            </CustomAccordion>

            <CustomAccordion 
                expanded={expandedPanel3}
                onChange={handleChangePanel3}
                title={<Typography>Bulletin</Typography>}
            >
                <Typography></Typography>
            </CustomAccordion>
        </div>
    );
}



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';

// const Accordion = styled((props) => (
//     <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//     border: '0',
//     backgroundColor: '#f5f5f5',
//     '&:not(:last-child)': {
//         borderBottom: 0,
//     },
//     '&:before': {
//         display: 'none',
//     },
// }));


// const AccordionSummary = styled((props) => (
//     <MuiAccordionSummary
//         expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//         {...props}
//     />
// ))(({ theme }) => ({
//     // backgroundColor:
//     //     theme.palette.mode === 'dark'
//     //     ? 'rgba(255, 255, 255, .05)'
//     //     : 'rgba(0, 0, 0, .03)',
//     backgroundColor: 'none',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//     // padding: theme.spacing(2),
//     // borderTop: '1px solid rgba(0, 0, 0, .125)',
//     padding: theme.spacing(2),
//     borderTop: '0',
//     backgroundColor: '#f5f5f5',
// }));

// export default function DroughtForecast() {
//     const [expanded, setExpanded] = React.useState('panel1');

//     const handleChange = (panel) => (event, newExpanded) => {
//         setExpanded(newExpanded ? panel : false);
//     };

//     return (
//         <div>
//             <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//                 <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
//                 <Typography>Drought Forcast</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                 <Typography>
                    
//                 </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//                 <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
//                 <Typography>Drought Monitoring</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                 <Typography>
                    
//                 </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//                 <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
//                 <Typography>Bulletin</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                 <Typography>
                    
//                 </Typography>
//                 </AccordionDetails>
//             </Accordion>
//         </div>
//     );
// }