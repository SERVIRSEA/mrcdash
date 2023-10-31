import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

const LegendItem = ({ color, label, hasBorder }) => (
  <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
    <Box display="flex" alignItems="center" width="100%" justifyContent="start">
      <div
        className="legend-color"
        style={{ 
          backgroundColor: color, 
          width: "16px", 
          height: "16px", 
          marginRight: "10px" ,
          border: hasBorder ? "1px solid black" : "none",
        }}
      ></div>
      <Typography variant="body1" pl={2}>
        {label}
      </Typography>
    </Box>
  </ListItem>
);

const CustomLegend = ({ title, legendItems }) => (
  <Box p={2} sx={{ maxHeight: '160px' }}>
    <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
    <List>
      {legendItems.map((item, index) => (
        <LegendItem key={index} {...item} />
      ))}
    </List>
  </Box>
);

export default CustomLegend;
