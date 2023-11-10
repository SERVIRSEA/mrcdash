import { useAtom } from "jotai";
import CustomLegend from "./CustomLegend";
import { Typography } from "@mui/material";

const ffgsLegendItems = [
    { color: 'yellow', label: 'Low Risk', hasBorder: false },
    { color: 'orange', label: 'Moderate Risk', hasBorder: false },
    { color: 'red', label: 'High Risk', hasBorder: false },
];
  

export default function FFGSLegend(){
    return (
        <>  
            <Typography 
                pt={2}
                pb={0}
                pl={2}
                pr={2}
                sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '12px', 
                }}
            >
                Flash Flood Warning <br></br>(Sub-province)
            </Typography>
            <CustomLegend title="" legendItems={ffgsLegendItems} showTitle={false} />
        </>
    )
}