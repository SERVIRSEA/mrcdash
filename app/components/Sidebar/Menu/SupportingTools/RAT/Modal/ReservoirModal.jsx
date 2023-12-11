import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Tabs, Tab } from '@mui/material';
import { Box, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { Modal } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { infoDataAtom, inflowDataAtom, outflowDataAtom } from '@/app/state/atom';
import { reservoirDataFetcher } from '@/app/components/Fetchers/Fetcher';
import ReservoirChart from '../Charts/ReservoirChart';
import ReservoirInfoTable from '../Table/ReservoirInfoTable';

const ReservoirModal = ({ open, onClose, reservoirId }) => {
    const [info, setInfo] = useAtom(infoDataAtom)
    const [inflow, setInflow] = useAtom(inflowDataAtom);
    const [outflow, setOutflow] = useAtom(outflowDataAtom);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };

    useEffect(() => {
        // console.log(reservoirId)
        if (reservoirId){
            const fetchInfoData = async () => {
                
                const params = {
                    action: 'get-reservoir-info',
                    r_id: reservoirId,
                };

                const data = await reservoirDataFetcher(params);
                const parsedData = JSON.parse(data);
                setInfo(parsedData);
            };

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
            fetchInfoData();
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
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab label="About" />
                    <Tab label="Inflow/Outflow" />
                </Tabs>
                <Box mt={2}>
                    {activeTab === 0 && (
                        reservoirId && info ? (
                            <ReservoirInfoTable data={info} />
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
                        )
                    )}

                    {activeTab === 1 && (
                        
                        reservoirId && inflow && outflow ? (
                            
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
                        )
                        
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default ReservoirModal;
