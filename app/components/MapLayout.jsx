import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
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


export default function MapLayout() {
    const [sideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [isExpanded] = useAtom(expandAtom);
    const gridRef = useRef(null);
    const [selectedTabIndex] = useAtom(statTabValueAtom);

    // const scrollableContent = {
    //     overflowY: 'auto',   
    //     height: 'calc(100% - 40%)',
    // };

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
                    <Grid item md={isExpanded ? 12 : 6}>
                        <div id="map">
                            <DynamicMapView />
                        </div>
                    </Grid>
                    {!isExpanded && (
                    <>
                        <Grid item md={6}>
                            <FullScreenContainer ref={gridRef}>
                                <FullscreenControl targetRef={gridRef} />
                                <Grid item xs={12}>
                                    <StatTabs />
                                </Grid>
                            </FullScreenContainer>
                        </Grid>
                    </>)}
                </Grid>
            </Grid>
        </Grid>
    )
}