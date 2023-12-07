import React, {useState} from 'react';
import { useAtom } from 'jotai';
import { Box, Modal, IconButton, Typography, Grid, Paper, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ReservoirChart from './RAT/Charts/ReservoirChart';
import CustomAccordion from '@/app/components/Accordion/CustomAccordion';
import RATCheckbox from './RAT/Checkbox/RATCheckbox';

const MyList = () => {
    const [expandedPanel1, setExpandedPanel1] = useState(true);
    const [expandedPanel2, setExpandedPanel2] = useState(false);
    const [expandedPanel3, setExpandedPanel3] = useState(false);

    const handleChangePanel1 = () => {
        setExpandedPanel1(!expandedPanel1);
    };

    const handleChangePanel2 = () => {
        setExpandedPanel2(!expandedPanel2);
    };

    const handleChangePanel3 = () => {
        setExpandedPanel3(!expandedPanel3);
    };

    const handleListItemClick = (event, index, url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <CustomAccordion 
                expanded={expandedPanel1}
                onChange={handleChangePanel1}
                title={<Typography>RAT-Mekong</Typography>}
            >
                <RATCheckbox />
                <List sx={{ paddingLeft: "20px", paddingTop: '5px' }}>
                    <ListItemButton
                        // selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2, 'https://dev-ratmekong-servir.adpc.net/')}
                        sx={{border: 1}}
                    >
                        <ListItemText 
                            primary="View more details on the RAT-Mekong Tool"
                            primaryTypographyProps={{ style: { fontSize: '12px' } }}
                        />
                    </ListItemButton>
                </List>
            </CustomAccordion>
            <CustomAccordion 
                expanded={expandedPanel2}
                onChange={handleChangePanel2}
                title={<Typography>Rainstorm Tracker</Typography>}
            >
                <List sx={{ paddingLeft: "20px", paddingTop: '5px' }}>
                    <ListItemButton
                        sx={{border: 1}}
                        onClick={(event) => handleListItemClick(event, 0, 'https://rainstorms-servir.adpc.net/')}
                    >
                        <ListItemText 
                            primary="View more details on the Rainstorm Tracker Tool"
                            primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                        />
                    </ListItemButton>
                </List>
            </CustomAccordion>
            <CustomAccordion 
                expanded={expandedPanel3}
                onChange={handleChangePanel3}
                title={<Typography>Mekong X-Ray</Typography>}
            >
                <List sx={{ paddingLeft: "20px", paddingTop: '5px' }}>
                    <ListItemButton
                        sx={{border: 1}}
                        onClick={(event) => handleListItemClick(event, 1, 'https://xray-servir.adpc.net/home')}
                    >
                        <ListItemText 
                            primary="View more details on the Mekong X-Ray Tool"
                            primaryTypographyProps={{ style: { fontSize: '12px' } }}
                        />
                    </ListItemButton>
                </List>
            </CustomAccordion>
            {/* <List sx={{ fontSize: '12px' }}>
                <ListItemButton
                    // selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0, 'https://rainstorms-servir.adpc.net/')}
                >
                    <ListItemText 
                        primary="Rainstorm Tracker"
                        primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                    />
                </ListItemButton>
                <ListItemButton
                    // selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1, 'https://xray-servir.adpc.net/home')}
                >
                    <ListItemText 
                        primary="Mekong X-Ray"
                        primaryTypographyProps={{ style: { fontSize: '12px' } }}
                    />
                </ListItemButton>
            </List> */}
        </>
    );
};

export default MyList;
