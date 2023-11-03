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
            </CustomAccordion>

            <CustomAccordion 
                expanded={expandedPanel3}
                onChange={handleChangePanel3}
                title={<Typography>Bulletin</Typography>}
            >
            </CustomAccordion>
        </div>
    );
}