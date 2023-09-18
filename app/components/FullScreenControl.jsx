import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from "./Sidebar/Sidebar";
import { styled } from '@mui/system';

export default function FullscreenControl({ targetRef }){
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement && targetRef.current) {
            targetRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };
    return (
        <Box display="flex" justifyContent="flex-end">
            {
                isFullscreen ?
                <FullscreenExitIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={toggleFullScreen} />
                :
                <FullscreenIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={toggleFullScreen} />
            }
        </Box>
    )
}