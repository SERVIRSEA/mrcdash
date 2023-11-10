import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";

const LegendItem = ({ color, label, hasBorder }) => (
  <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
    <Box display="flex" alignItems="center" width="100%" justifyContent="start">
      <div
        className="legend-color"
        style={{ 
          backgroundColor: color, 
          width: "14px", 
          height: "14px", 
          marginRight: "10px" ,
          border: hasBorder ? "1px solid black" : "none",
        }}
      ></div>
      <Typography variant="body2" pl={0} sx={{fontSize: "12px"}}>
        {label}
      </Typography>
    </Box>
  </ListItem>
);

const CustomLegend = ({ title, legendItems, showTitle = true }) => (
  <Box pt={1} pl={2} pr={2} pb={1}
    sx={{ 
      maxHeight: '160px', 
      maxWidth: '200px',
      '&:not(:last-child)': { 
        mb: 0,
        mt:0,
        pt: 0, 
        pb: 0
      } 
    }}
  >
    {showTitle && (
      <Typography 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '12px', 
          maxWidth: '100%', 
          wordBreak: 'break-all', 
          whiteSpace: 'normal',
          display: 'inline-block'
        }}
      >
        {title}
      </Typography>
    )}
    <List sx={{ mb: 0 }}>
      {legendItems.map((item, index) => (
        <LegendItem key={index} {...item} />
      ))}
    </List>
  </Box>
);

export default CustomLegend;
