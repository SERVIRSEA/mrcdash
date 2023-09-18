import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { MapContainer, TileLayer, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { expandAtom } from '../state/atoms';
import Basemaps from './Basemaps';
import Legend from './Legend';
import DroughtLayers from './Sidebar/Menu/DroughtForecast/DroughtLayers';


export default function MapView(){
    const [isExpanded, setIsExpanded] = useAtom(expandAtom);
    const MyMap = () => {
        const map = useMap();
    
        useEffect(() => {
          map.invalidateSize();
        }, [map]);  // [map, isExpanded]
    
        return null;  
    };
    const url = 'http://localhost:8080/geoserver/dashboard/wms?'
    return(
        <MapContainer center={[16.09, 103.91]} zoom={5} style={{ width: '100%', height: 'calc(100vh - 150px)' }}>
            {/* <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            
            <LayersControl position="topright">
                <Basemaps />
                <DroughtLayers />
            </LayersControl>

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