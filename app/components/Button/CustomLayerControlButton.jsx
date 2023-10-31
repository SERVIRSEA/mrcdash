import React from 'react';
import { atom, useAtom } from 'jotai';
import IconButton from '@mui/material/IconButton';
import LayersIcon from '@mui/icons-material/Layers';
import Button from '@mui/material/Button';
import { currentBasemapAtom } from '@/app/state/atom';

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
