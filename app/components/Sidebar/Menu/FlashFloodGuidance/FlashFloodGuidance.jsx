import CustomCalendar from "./DatePanel"
import FFGSCheckbox from "./checkbox/FFGSCheckbox"
import HourSelection from "./HourSelection"
import CountrySelection from "./CountrySelection"
import { Typography } from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function FlashFloodGuidance(){  
    const handleListItemClick = (event, index, url) => {
        window.open(url, '_blank');
    };
    return (
        <>  
            <Typography pt={2} variant="body2">
                Select Date
            </Typography>
            <CustomCalendar />
            <Typography pt={1} pb={2} variant="body2">
                Select Hour
            </Typography>
            <HourSelection />
            
            <Typography pt={2} variant="body2">
                Select country
            </Typography>
            <CountrySelection/>
            <FFGSCheckbox />
            
            <List sx={{ paddingLeft: "0px", paddingTop: '5px' }}>
                <ListItemButton
                    onClick={(event) => handleListItemClick(event, 0, 'http://203.146.112.243/bulletin/')}
                    sx={{border: 1}}
                >
                    <ListItemText 
                        primary="Generate Bulletin"
                        primaryTypographyProps={{ style: { fontSize: '12px' } }}
                    />
                </ListItemButton>
            </List>
        </>
    )
}