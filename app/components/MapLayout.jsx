import React, { useState, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from "./Sidebar/Sidebar";
import { expandAtom } from '../state/atom';
import FullscreenControl from './FullScreenControl';
import dynamic from 'next/dynamic';
import ReservoirChart from './Sidebar/Menu/DroughtForecast/Charts/ReservoirChart';
import { sideNavContentWidthAtom, statTabValueAtom } from '@/app/state/atom';
import StatTabs from './Tabs/StatTabs';
import styled from '@emotion/styled';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const FullScreenContainer = styled('div')({
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
});

// Load the MapView component dynamically (client-side only)
const DynamicMapView = dynamic(() => import('./MapView'), {
    // A loading component, if needed
    loading: () => <p></p>,
    // This ensures it only tries to load on client side
    ssr: false
});

const expandContentAtom = atom(false);

export default function MapLayout() {
    const [sideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [isExpanded] = useAtom(expandAtom);
    const gridRef = useRef(null);
    const [selectedTabIndex] = useAtom(statTabValueAtom);
    
    const [isMapExpanded, setIsMapExpanded] = useAtom(expandAtom);
    const [isContentExpanded, setIsContentExpanded] = useAtom(expandContentAtom)
    
    // const scrollableContent = {
    //     overflowY: 'auto',   
    //     height: 'calc(100% - 40%)',
    // };

    const handleExpandMapClick = () => {
        setIsMapExpanded(true); // Expand the map sidebar
        setIsContentExpanded(false); // Ensure the content sidebar is not expanded
    };
    
    const handleExpandContentClick = () => {
        setIsContentExpanded(prev => !prev); // Toggle the isContentExpanded state
        // Optionally collapse the map panel when expanding the content
        if (isMapExpanded) {
          setIsMapExpanded(false);
        }
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
                <Grid container>
                    
                    <Grid item md={isMapExpanded ? 12 : isContentExpanded ? 0 : 6}>
                        <div id="map">
                            <DynamicMapView />
                        </div>
                    </Grid>
                    
                    <Grid item md={isContentExpanded ? 12 : isMapExpanded ? 0 : 6}>
                        {/* <button onClick={handleExpandContentClick}>Expand Content</button> */}
                        <Box display="flex" justifyContent="flex-end" sx={{ bgcolor: '#2E2E2E'}}>
                            {/* <button onClick={handleExpandContentClick}> */}
                                {
                                    isContentExpanded ? 
                                    <FullscreenExitIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={handleExpandContentClick} />
                :
                <FullscreenIcon style={{ fontSize: 40, color: "#FFD700", cursor: "pointer"}} onClick={handleExpandContentClick} />
                                }
                            {/* </button> */}
                        </Box>
                        <StatTabs />
                    </Grid>

                    {/* <Grid item md={isExpanded ? 12 : 6}>
                        <div id="map">
                            <DynamicMapView />
                        </div>
                    </Grid> */}
                    
                    {/* {!isExpanded && (
                    <>
                        <Grid item md={6}>
                            <FullScreenContainer ref={gridRef}>
                                <FullscreenControl targetRef={gridRef} />
                                <Grid item xs={12}>
                                    <StatTabs />
                                </Grid>
                            </FullScreenContainer>
                        </Grid>
                    </>)} */}
                </Grid>
            </Grid>
        </Grid>
    )
}