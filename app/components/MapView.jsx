import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MapContainer, TileLayer, LayerGroup, useMap, LayersControl, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { expandAtom } from '../state/atom';
import Legend from './Legend';
import ReservoirsLayer from './Layers/ReservoirsLayer';
import DroughtForecastLayers from './Sidebar/Menu/DroughtForecast/DroughtForecastLayers/DroughtForecastLayers';
import CustomLayerControlButton from './Button/CustomLayerControlButton';
import { currentBasemapAtom } from '../state/atom';
import LMBLayer from './Layers/LMBLayer';
import LMBRiverLayer from './Layers/LMBRiverLayer';
import LMBSubProvinceLayer from './Layers/LMBSubProvinceLayer';
import FFGSMap from './Sidebar/Menu/FlashFloodGuidance/maps/FFGSMap';

export default function MapView(){
    
    const [isExpanded, setIsExpanded] = useAtom(expandAtom);
    const [currentBasemap] = useAtom(currentBasemapAtom);

    const MyMap = () => {
        const map = useMap();
    
        useEffect(() => {
          map.invalidateSize();
        }, [map]);  
    
        return null;  
    };
    
    const mapStyle = {
        width: '100%', 
        height: 'calc(100vh - 150px)',
    }

    const attribution = 'Tiles © Esri — Source: Esri, USGS, OSM and the GIS User Community';
    return(
        <MapContainer center={[16.09, 103.91]} zoom={5} zoomControl={true} style={mapStyle}>
             <TileLayer url={currentBasemap} attribution={attribution} />
            {/* <ZoomControl position="topleft" /> */}
            <CustomLayerControlButton />
            
            <DroughtForecastLayers />
            <LMBLayer />
            <LMBRiverLayer />
            <LMBSubProvinceLayer />
            <FFGSMap />
            <div 
                style={{
                    position: 'absolute',
                    top: '40%',
                    right: '5px',
                    zIndex: 400 
                }}
            >
                <Button 
                    variant="contained" 
                    size="small"
                    sx={{ 
                        color: '#fff',
                        width: '40px',
                        minWidth: '0', 
                        height: '80px',  
                        padding: 0,  
                        display: 'flex', 
                        alignItems: 'center',  
                        justifyContent: 'center', 
                        backgroundColor: '#F5F5F5', 
                        color: 'black',  
                        '&:hover': {
                            backgroundColor: '#E0E0E0' 
                        },
                        // '&.MuiButton-root': {
                        //     width: '10px !important',
                        // },
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', }}>
                        {isExpanded ? <ArrowBackIosNewIcon  sx={{ fontSize: '14px' }} /> : <ArrowForwardIosIcon  sx={{ fontSize: '14px' }} />}
                    </Box>
                </Button>
            </div> 
            <MyMap />
            <Legend />
        </MapContainer>
    )
}