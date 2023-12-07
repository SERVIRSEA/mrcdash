import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Box, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { Modal } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { inflowDataAtom, outflowDataAtom } from '@/app/state/atom';
import { reservoirDataFetcher } from '@/app/components/Fetchers/Fetcher';
import ReservoirChart from '../Charts/ReservoirChart';

const ReservoirModal = ({ open, onClose, reservoirId }) => {
    const [inflow, setInflow] = useAtom(inflowDataAtom);
    const [outflow, setOutflow] = useAtom(outflowDataAtom);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 800,
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };

    useEffect(() => {
        // console.log(reservoirId)
        if (reservoirId){
            const fetchInflowData = async () => {
                
                const params = {
                    action: 'inflow',
                    r_id: reservoirId,
                };

                const fetchData = await reservoirDataFetcher(params);
                const parsedData = JSON.parse(fetchData);
                const series_inflow = parsedData.map(function(d) {
                    return [new Date(d.date).getTime(), d.inflow];
                });
                setInflow(series_inflow);
            };

            const fetchOutflowData = async () => {
                
                const params = {
                    action: 'outflow',
                    r_id: reservoirId,
                };

                const fetchData = await reservoirDataFetcher(params);
                const parsedData = JSON.parse(fetchData);
                const series_outflow = parsedData.map(function(d) {
                    return [new Date(d.date).getTime(), d.outflow];
                });
                setOutflow(series_outflow);
            };
            fetchInflowData();
            fetchOutflowData();
        }
    }, []);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="reservoir-modal-title"
            aria-describedby="reservoir-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {reservoirId && inflow && outflow ? (
                    <ReservoirChart 
                        series_inflow = {inflow}
                        series_outflow = {outflow}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', 
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ReservoirModal;
