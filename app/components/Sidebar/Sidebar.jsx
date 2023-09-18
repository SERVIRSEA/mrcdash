import Today from "./Menu/Today/Today"
import RiverForecast from "./Menu/RiverForecast/RiverForecast"
import FlashFloodGuidance from "./Menu/FlashFloodGuidance/FlashFloodGuidance"
import DroughtForecast from "./Menu/DroughtForecast/DroughtForecast"
import MediumLongRangeForecast from "./Menu/MediumLongRangeForecast/MediumLongRangeForecast"
import RainfallObservation from "./Menu/RainfallObservation/RainfallObservation"
import SupportingTools from "./Menu/SupportingTools/SupportingTools"
import { Box } from "@mui/material"

export default function Sidebar(){
    return (
        <Box p={3} sx={{ maxHeight: 'calc(100vh - 75px)', overflowY: 'auto', width: '100%' }}>
            <Today />
            <RiverForecast />
            <FlashFloodGuidance />
            <DroughtForecast />
            <MediumLongRangeForecast />
            <RainfallObservation />
            <SupportingTools />
        </Box>
    )
}