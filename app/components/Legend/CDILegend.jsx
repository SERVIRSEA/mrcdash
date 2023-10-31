import CustomLegend from "./CustomLegend";

const cdiLegendItems = [
    { color: '#c43c39', label: 'Exceptional', hasBorder: false },
    { color: '#f50522', label: 'Extreme', hasBorder: false },
    { color: '#e8718d', label: 'Severe', hasBorder: false },
    { color: '#e5db36', label: 'Moderate', hasBorder: false },
    { color: '#ffffff', label: 'Normal', hasBorder: true }, // Add hasBorder property
];
  

export default function CDILegend(){
    return (
        <>
            <CustomLegend title="CDI" legendItems={cdiLegendItems} />
        </>
    )
}
// import { Box, List, ListItem, Button, Typography } from "@mui/material";

// export default function CDILegend(){
//     return( 
//         <Box p={2} overflowY="auto" sx={{ maxHeight: '160px' }}>
//             <Typography pl={0} pb={0} sx={{fontWeight: 'bold'}}>CDI</Typography>
//             <List>
//                 <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
//                     <Box display="flex" alignItems="center" width="100%" justifyContent="start">
//                         <div
//                         style={{
//                             backgroundColor: '#c43c39',
//                             height: '16px',
//                             width: '16px',
//                             borderRadius: '0',
//                             marginRight: '10px', 
//                         }}
//                         ></div>
//                         <Typography variant="body1" pl={2}>
//                             Exceptional
//                         </Typography>
//                     </Box>
//                 </ListItem>
//                 <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
//                     <Box display="flex" alignItems="center" width="100%" justifyContent="start">
//                         <div
//                         style={{
//                             backgroundColor: '#f50522',
//                             height: '16px',
//                             width: '16px',
//                             borderRadius: '0',
//                             marginRight: '10px', 
//                         }}
//                         ></div>
//                         <Typography variant="body1" pl={2}>
//                             Extreme
//                         </Typography>
//                     </Box>
//                 </ListItem>
//                 <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
//                     <Box display="flex" alignItems="center" width="100%" justifyContent="start">
//                         <div
//                         style={{
//                             backgroundColor: '#e8718d',
//                             height: '16px',
//                             width: '16px',
//                             borderRadius: '0',
//                             marginRight: '10px', 
//                         }}
//                         ></div>
//                         <Typography variant="body1" pl={2}>
//                             Severe
//                         </Typography>
//                     </Box>
//                 </ListItem>
//                 <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
//                     <Box display="flex" alignItems="center" width="100%" justifyContent="start">
//                         <div
//                         style={{
//                             backgroundColor: '#e5db36',
//                             height: '16px',
//                             width: '16px',
//                             borderRadius: '0',
//                             marginRight: '10px', 
//                         }}
//                         ></div>
//                         <Typography variant="body1" pl={2}>
//                             Moderate
//                         </Typography>
//                     </Box>
//                 </ListItem>
//                 <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
//                     <Box display="flex" alignItems="center" width="100%" justifyContent="start">
//                         <div
//                         style={{
//                             border: '1px solid black',
//                             height: '16px',
//                             width: '16px',
//                             borderRadius: '0',
//                             marginRight: '10px', 
//                         }}
//                         ></div>
//                         <Typography variant="body1" pl={2}>
//                             Normal
//                         </Typography>
//                     </Box>
//                 </ListItem>
//             </List>
//         </Box> 
//     )
// }