import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from "./Sidebar/Sidebar";
import dynamic from 'next/dynamic';
import { sideNavContentWidthAtom, statTabValueAtom } from '@/app/state/atom';
import StatTabs from './Tabs/StatTabs';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { expandAtom, expandContentAtom } from '@/app/state/atom';

// Load the MapView component dynamically (client-side only)
const DynamicMapView = dynamic(() => import('./MapView'), {
    // A loading component, if needed
    loading: () => <p></p>,
    // This ensures it only tries to load on client side
    ssr: false
});

export default function MapLayout() {
    const [sideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [isMapExpanded, setIsMapExpanded] = useAtom(expandAtom);
    const [isContentExpanded, setIsContentExpanded] = useAtom(expandContentAtom)
    
    const handleExpandContentClick = () => {
        setIsContentExpanded(prev => !prev);
        setIsMapExpanded(false);
        // if (isMapExpanded) {
        //   setIsMapExpanded(false);
        // }
    };

    return (
        <Grid container spacing={0}>
            <Grid item sx={{ width: sideNavWidth === '300px' ? '380px' : '80px', margin: 0 }}>
                <Sidebar />
            </Grid>
            <Grid item sx={{ width: sideNavWidth === '300px' ? 'calc(100% - 380px)' : 'calc(100% - 80px)', margin: 0 }}>
                <Grid>
                    <Box p={3} sx={{height: '75px', overflow: 'auto'}}>
                        Recent info
                    </Box>
                </Grid>
                <Grid container spacing={0}>
                <Grid item md={isMapExpanded ? 12 : 6} style={{ display: isContentExpanded ? 'none' : 'block' }}>
                    <div id="map">
                        <DynamicMapView />
                    </div>
                </Grid>
                    
                    <Grid item md={isContentExpanded ? 12 : isMapExpanded ? 0 : 6}>
                        
                        <Box display="flex" justifyContent="flex-end" sx={{ bgcolor: '#2E2E2E'}}>
                            {
                                isContentExpanded ? 
                                <FullscreenExitIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={handleExpandContentClick} />
                                :
                                <FullscreenIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={handleExpandContentClick} />
                            }
                        </Box>
                        <StatTabs />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}