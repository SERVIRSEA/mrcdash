import React from 'react';
import { atom, useAtom } from 'jotai';
import IconButton from '@mui/material/IconButton';
import LayersIcon from '@mui/icons-material/Layers';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { currentBasemapAtom } from '@/app/state/atom';
import LMBLayerCheckbox from '../Checkbox/LMBLayerCheckbox';
import LMBRiverLayerCheckbox from '../Checkbox/LMBRiverLayerCheckbox';
import LMBSubProvLayerCheckbox from '../Checkbox/LMBSubProvLayerCheckbox';

const atm = atom(0);
const visAtom = atom(false);

export default function CustomLayerControlButton() {
    const [isVisible, setIsVisible] = useAtom(visAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(atm); 
    const [, setCurrentBasemap] = useAtom(currentBasemapAtom);

    const baseMaps = [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
    ];

    const handleButtonClick = (index, event) => {
        event.stopPropagation();
        setSelectedIndex(index);
        setCurrentBasemap(baseMaps[index]);
    };

    const containerStyle = {
        position: 'absolute',
        right: '10px',
        top: '10px',
        zIndex: 600,
        maxHeight: '220px',
        overflowY: 'auto',
        transition: '0.3s',
        backgroundColor: isVisible ? 'white' : 'transparent',
        padding: isVisible ? '10px' : '0',
        borderRadius: '5px',
        width: isVisible ? '200px' : 'auto'
    };

    const buttonStyle = {
        width: '100%',
        marginBottom: '8px',
        transition: '0.3s',
        '&:hover': {
            transform: 'scale(1.05)'
        },
        '&:last-child': {
            marginBottom: '0'
        }
    };

    return (
        <div 
            style={containerStyle}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={(event) => event.stopPropagation()}
        >
            {isVisible ? (
                <>
                    <div>
                        <Accordion 
                            sx={{ 
                                boxShadow: 'none', 
                                '&:before': { display: 'none' }, 
                                '&:not(:last-child)': { marginBottom: 0 },
                                '&.MuiAccordion-root': {
                                  margin: 0, 
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    padding: 0, 
                                    minHeight: '0 !important',
                                    '&.Mui-expanded': {
                                      margin: '0 !important' 
                                    },
                                    '& .MuiAccordionSummary-content': {
                                      margin: '0 !important', 
                                    },
                                    '& .MuiAccordionSummary-expandIconWrapper': {
                                      margin: '0 !important', 
                                    }
                                }}
                            >
                                <Typography>Basemaps</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: 1 }}>
                                <Button 
                                    style={buttonStyle}
                                    variant={selectedIndex === 0 ? "contained" : "outlined"}
                                    color="primary" 
                                    onClick={(event) => handleButtonClick(0, event)}
                                >
                                    MRC Basemap
                                </Button>
                                <Button 
                                    style={buttonStyle}
                                    variant={selectedIndex === 1 ? "contained" : "outlined"}
                                    color="primary" 
                                    onClick={(event) => handleButtonClick(1, event)}
                                >
                                    Satellite Map
                                </Button>
                                <Button 
                                    style={buttonStyle}
                                    variant={selectedIndex === 2 ? "contained" : "outlined"}
                                    color="primary" 
                                    onClick={(event) => handleButtonClick(2, event)}
                                >
                                    Street Map
                                </Button>
                                <Button 
                                    style={buttonStyle}
                                    variant={selectedIndex === 3 ? "contained" : "outlined"}
                                    color="primary" 
                                    onClick={(event) => handleButtonClick(3, event)}
                                >
                                    Terrain Map
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion 
                            sx={{ 
                                paddingTop: '10px',
                                boxShadow: 'none', 
                                '&:before': { display: 'none' }, 
                                '&:not(:last-child)': { marginBottom: 0 },
                                '&.MuiAccordion-root': {
                                  margin: 0, 
                                }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{
                                    padding: 0, 
                                    minHeight: '0 !important',
                                    '&.Mui-expanded': {
                                      margin: '0 !important' 
                                    },
                                    '& .MuiAccordionSummary-content': {
                                      margin: '0 !important', 
                                    },
                                    '& .MuiAccordionSummary-expandIconWrapper': {
                                      margin: '0 !important', 
                                    }
                                }}
                            >
                                <Typography>Overlays</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: 1 }}>
                                <LMBLayerCheckbox />
                                <LMBRiverLayerCheckbox />
                                <br></br>
                                <LMBSubProvLayerCheckbox />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <Button 
                        style={buttonStyle}
                        variant={selectedIndex === 0 ? "contained" : "outlined"}
                        color="primary" 
                        onClick={(event) => handleButtonClick(0, event)}
                    >
                        MRC Basemap
                    </Button>
                    <Button 
                        style={buttonStyle}
                        variant={selectedIndex === 1 ? "contained" : "outlined"}
                        color="primary" 
                        onClick={(event) => handleButtonClick(1, event)}
                    >
                        Satellite Map
                    </Button>
                    <Button 
                        style={buttonStyle}
                        variant={selectedIndex === 2 ? "contained" : "outlined"}
                        color="primary" 
                        onClick={(event) => handleButtonClick(2, event)}
                    >
                        Street Map
                    </Button>
                    <Button 
                        style={buttonStyle}
                        variant={selectedIndex === 3 ? "contained" : "outlined"}
                        color="primary" 
                        onClick={(event) => handleButtonClick(3, event)}
                    >
                        Terrain Map
                    </Button> */}
                </>
            ) : (
                <IconButton 
                    color="info"
                    sx={{
                        border: '2px solid currentColor',
                        borderRadius: '50%'
                    }}
                    onClick={(event) => event.stopPropagation()}
                >
                    <LayersIcon />
                </IconButton>
            )}
        </div>
    );
}
