import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MapContainer, TileLayer, LayerGroup, useMap, LayersControl, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { expandAtom } from '../state/atom';
import Basemaps from './Basemaps';
import Legend from './Legend';
import ReservoirsLayer from './Layers/ReservoirsLayer';
import DroughtForecastLayers from './Sidebar/Menu/DroughtForecast/DroughtForecastLayers/DroughtForecastLayers';
import CDILayer from './Sidebar/Menu/DroughtForecast/DroughtForecastLayers/CDILayer';
import CustomLayerControlButton from './Button/CustomLayerControlButton';
import { currentBasemapAtom } from '../state/atom';

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
                        // width: '20px',  
                        height: '130px',  
                        padding: 0,  
                        display: 'flex', 
                        alignItems: 'center',  
                        justifyContent: 'center', 
                        backgroundColor: '#F5F5F5', 
                        color: 'black',  
                        '&:hover': {
                            backgroundColor: '#E0E0E0' 
                        }
                    }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', }}>
                        {isExpanded ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                    </Box>
                </Button>
            </div> 
            <MyMap />
            <Legend />
        </MapContainer>
    )
}