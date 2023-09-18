import { Box, List, ListItem, Button, Typography } from "@mui/material";

export default function Legend(){
    return(
        <div 
            style={{
                position: 'absolute',
                left: '10px',
                bottom: '7%',
                background: '#eee',
                zIndex: 600,
                maxHeight: '180px',
                overflowY: 'auto'
            }}
        >
            <Box p={2} overflowY="auto" sx={{ maxHeight: '160px' }}>
                <List>
                    <ListItem disablePadding sx={{ paddingTop: 0, paddingBottom: 0 }}>
                        <Box display="flex" alignItems="center" width="100%" justifyContent="start">
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: '#ffc400', 
                                    height: "20px", 
                                    borderRadius: 0, 
                                    cursor: 'crosshair', 
                                    '&:hover': {
                                        backgroundColor: '#ffc400',  
                                    }
                                }}
                            ></Button>
                            <Typography variant="body1" pl={2}>
                                Moderate
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem disablePadding sx={{ paddingTop: 1, paddingBottom: 0 }}>
                        <Box display="flex" alignItems="center" width="100%" justifyContent="start">
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: '#b28900', 
                                    height: "20px", 
                                    borderRadius: 0, 
                                    cursor: 'crosshair', 
                                    '&:hover': {
                                        backgroundColor: '#b28900',  
                                    }
                                }}
                            ></Button>
                            <Typography variant="body1" pl={2}>
                                Severe
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem disablePadding sx={{ paddingTop: 1, paddingBottom: 0 }}>
                        <Box display="flex" alignItems="center" width="100%" justifyContent="start">
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: '#b22a00', 
                                    height: "20px", 
                                    borderRadius: 0, 
                                    cursor: 'crosshair', 
                                    '&:hover': {
                                        backgroundColor: '#b22a00',  
                                    }
                                }}
                            ></Button>
                            <Typography variant="body1" pl={2}>
                                Extreme
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem disablePadding sx={{ paddingTop: 1, paddingBottom: 0 }}>
                        <Box display="flex" alignItems="center" width="100%" justifyContent="start">
                            <Button 
                                variant="outlined" 
                                sx={{
                                    borderColor: 'black', 
                                    height: "20px", 
                                    borderRadius: 0, 
                                    cursor: 'crosshair', 
                                    '&:hover': {
                                        borderColor: 'black',  
                                    }
                                }}
                            ></Button>
                            <Typography variant="body1" pl={2}>
                                Normal
                            </Typography>
                        </Box>
                    </ListItem>
                </List>
            </Box>
        </div>
    )
}