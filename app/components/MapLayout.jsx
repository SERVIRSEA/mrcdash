import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Sidebar from "./Sidebar/Sidebar";
import { expandAtom } from '../state/atoms';
import MapView from './MapView';
import FullscreenControl from './FullScreenControl';
import dynamic from 'next/dynamic';

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

export default function MapLayout(){
    const [isExpanded] = useAtom(expandAtom);
    const gridRef = useRef(null);
    return(
        <Grid container sx={{ height: 'calc(100vh - 75px)' }}>
            <Grid xs={3} md={3} lg={3}>
                <Sidebar />
            </Grid>
            <Grid xs={9} md={9} lg={9}>
                <Grid>
                    <Box p={3} sx={{height: '75px', overflow: 'auto'}}>
                        Recent info
                    </Box>
                </Grid>
                <Grid container>
                    <Grid md={isExpanded ? 12 : 6}>
                        {/* <MapView /> */}
                        <div id="map">
                            <DynamicMapView />
                        </div>
                    </Grid>
                    {!isExpanded && (
                    <>
                        <Grid md={6}>
                            <FullScreenContainer ref={gridRef}>
                                <Grid xs={12} sx={{bgcolor: '#2E2E2E'}}>
                                    <FullscreenControl targetRef={gridRef}/>
                                </Grid>
                                <Grid xs={12}>
                                    Some text here
                                </Grid>
                            </FullScreenContainer>
                        </Grid>
                    </>)}
                </Grid>
            </Grid>
        </Grid>
    )
}