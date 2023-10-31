import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Sidebar from "./Sidebar/Sidebar";
import { expandAtom } from '../state/atom';
import MapView from './MapView';
import FullscreenControl from './FullScreenControl';
import dynamic from 'next/dynamic';
import DatePanel from './DatePanel';
import ReservoirChart from './Sidebar/Menu/DroughtForecast/Charts/ReservoirChart';
import { sideNavContentWidthAtom, statTabValueAtom } from '@/app/state/atom';
import StatTabs from './Tabs/StatTabs';

const FullScreenContainer = styled('div')({
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
});

// Load the MapView component dynamically (client-side only)
const DynamicMapView = dynamic(() => import('./MapView'), {
    // A loading component, if needed
    loading: () => <p>Loading map...</p>,
    // This ensures it only tries to load on client side
    ssr: false
});


export default function MLayout() {
    const [sideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [isExpanded] = useAtom(expandAtom);
    const gridRef = useRef(null);
    const [selectedTabIndex] = useAtom(statTabValueAtom);

    return (
        <Grid container spacing={0}>
            <Grid item sx={{ width: sideNavWidth === '300px' ? '380px' : '80px', margin: 0 }}>
                <Sidebar />
            </Grid>
            <Grid item sx={{ flexGrow: 1, margin: 0 }}>
                <Grid>
                    <Box p={3} sx={{height: '75px', overflow: 'auto'}}>
                        Recent info
                    </Box>
                </Grid>
                <Grid container>
                    <Grid item md={isExpanded ? 12 : 6}>
                        
                        <div id="map">
                            <DynamicMapView />
                        </div>
                    </Grid>
                    {!isExpanded && (
                    <>
                        <Grid item md={6}>
                            <FullScreenContainer ref={gridRef}>
                                <Grid item xs={12} sx={{bgcolor: '#2E2E2E'}}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={11}>
                                            <StatTabs />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FullscreenControl targetRef={gridRef} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    {selectedTabIndex === 0 && <DatePanel />} 
                                    {selectedTabIndex === 1 && <></>} 
                                    {selectedTabIndex === 2 && <></>} 
                                    {selectedTabIndex === 3 && <></>} 
                                    {selectedTabIndex === 4 && <></>} 
                                    {selectedTabIndex === 5 && <></>} 
                                    {selectedTabIndex === 6 && <></>}
                                </Grid>
                            </FullScreenContainer>
                        </Grid>
                    </>)}
                </Grid>
            </Grid>
        </Grid>
    )
}