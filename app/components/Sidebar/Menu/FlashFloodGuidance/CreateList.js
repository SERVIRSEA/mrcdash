import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box, Typography, Grid, Paper, Tooltip } from '@mui/material';
import RiskDetails from './RiskDetails';
import { Modal } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export default function CreateList({ parsed_data, selectedParam }) {
    // console.log(parsed_data)
    const [modalOpen, setModalOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);
    // const [selectedEntry, setSelectedEntry] = useState(null);

    const paramToHrs = {
        "FFG06": '6hrs',
        "FFR12": '12hrs',
        "FFR24": '24hrs'
    }

    const param = paramToHrs[selectedParam];

    const sortOrder = {
        "High": 1,
        "Moderate": 2,
        "Low": 3
    };

    const alertColors = {
        "High": "#FF0000",
        "Moderate": "#FFA500",
        "Low": "#FFFF00"
    };

    const propToSortBy = param === "6hrs" ? "Alert_6Hrs" :
                    param === "12hrs" ? "Risk_12Hrs" :
                    param === "24hrs" ? "Risk_24Hrs" : "ISO";


    const sortedData = [...parsed_data].sort((a, b) => {
        // Primary sorting by the selected property
        if (sortOrder[a[propToSortBy]] !== sortOrder[b[propToSortBy]]) {
            return sortOrder[a[propToSortBy]] - sortOrder[b[propToSortBy]];
        }
        
        // Secondary sorting by ISO
        return a.ISO.localeCompare(b.ISO);
    });

    const displayDetail = (entry) => {
        // setSelectedEntry(entry);
        setPopupData(entry);
        setModalOpen(true);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 600,
        // width: 600,
        maxHeight: '60vh', 
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };

    const getRiskType = (entry) => {
        if (param === "6hrs") {
            return entry.Alert_6Hrs;
        } else if (param === "12hrs") {
            return entry.Risk_12Hrs;
        } else if (param === "24hrs") {
            return entry.Risk_24Hrs;
        }
        return "Unknown";
    };

    // Check if parsed_data is either not available or is empty
    if (!parsed_data || parsed_data.length === 0) {
        return <Typography align="center" variant="body1" pt={3}>No risk available</Typography>;
    }

    return (
        <Grid container spacing={3} mt={3} direction="column">
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {sortedData.map((entry, index) => (
                        <Grid item xs={6} key={index}>
                            <Tooltip title={`Click to view details`} placement="top">
                                <Paper elevation={0} sx={{ marginBottom: 1, padding: 1, cursor: 'pointer' }} onClick={() => displayDetail(entry)}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={3}>
                                            <Box width={30} height={30} borderRadius="50%" bgcolor={alertColors[getRiskType(entry)]}></Box>
                                        </Grid>
                                        <Grid item xs={9}>
                                            <Typography variant="body2" fontWeight="bold">
                                                {getRiskType(entry)} Risk
                                            </Typography>
                                            <Typography variant="body2">
                                                Country: <span>{entry.ISO}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Tooltip>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <Box>
                    <RiskDetails entry={selectedEntry} />
                </Box>
            </Grid> */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={() => setModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {popupData ? (
                        <RiskDetails entry={popupData}/>
                        ) : (
                        <Box
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', // Adjust the height as needed
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            </Modal>
        </Grid>
    );
}