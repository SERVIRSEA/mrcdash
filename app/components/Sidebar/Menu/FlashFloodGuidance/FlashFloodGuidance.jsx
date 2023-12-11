import CustomCalendar from "./DatePanel"
import FFGSCheckbox from "./checkbox/FFGSCheckbox"
import HourSelection from "./HourSelection"
import CountrySelection from "./CountrySelection"
import { Typography } from "@mui/material"

export default function FlashFloodGuidance(){  
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
        </>
    )
}