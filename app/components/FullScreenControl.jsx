import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

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
        <Box display="flex" justifyContent="flex-end" sx={{ bgcolor: '#2E2E2E'}}>
            {
                isFullscreen ?
                <FullscreenExitIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={toggleFullScreen} />
                :
                <FullscreenIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={toggleFullScreen} />
            }
        </Box>
    )
}