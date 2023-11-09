import React, { useEffect, useState, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';
import { subProvinceDataAtom } from '@/app/state/atom';
import { useAtom } from 'jotai';
import L from 'leaflet'; 
import { Modal, Box, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import RiskDetails from '../RiskDetails';

const GenerateSubProvinceMap = ({ param, parsedData, isVisible }) => {
    const [subProvinceData] = useAtom(subProvinceDataAtom);
    const [modalOpen, setModalOpen] = useState(false);
    const [popupData, setPopupData] = useState(null);

    const getAlertValueById = (param, fid) => {
        const filtered = parsedData.find(item => item.ID_2 === fid);
        
        switch (param) {
            case "FFG06":
                return filtered ? filtered.Alert_6Hrs : null;
            case "FFR12":
                return filtered ? filtered.Risk_12Hrs : null;
            case "FFR24":
                return filtered ? filtered.Risk_24Hrs : null;
            default:
                return null;  
        }
    };

    const getColorbyCategory = (cat) => {
        switch(cat) {
            case 'Low':
                return 'yellow';
            case 'Moderate':
                return 'orange';
            case 'High':
                return 'red';
            default:
                return 'none';
                // return '#000';
        }
    };

    const defineStyle = (param, feature) => {
        const fid = feature.properties.ID_2;
        const cat = getAlertValueById(param, fid);
        const color = getColorbyCategory(cat);
        let defaultStyle = { color: "#000", weight: 1, opacity: 1, fillOpacity: 1 };

        if (color === 'none') {
            return { ...defaultStyle, fillOpacity: 0, opacity: 0 }; // this will make the feature invisible
        }

        return color ? {...defaultStyle, fillColor: color} : defaultStyle; 
    };

    const onEachFeature = (feature, layer) => {
        // Then, conditionally add new tooltips based on the new param and style
        const fid = feature.properties.ID_2;
        const cat = getAlertValueById(param, fid);
        const color = getColorbyCategory(cat);

        if (color !== 'none') {
            layer.bindTooltip(`<h6 class="fw-bold p-2">${feature.properties.NAME_2}, ${feature.properties.NAME_1},<br>${feature.properties.NAME_0}</h6>`);
        }
    
        layer.on({
            click: (e) => onSubProvinceClick(e, feature)
        });
    };

    const onSubProvinceClick = (e, feature) => {
        const fid = feature.properties.ID_2;
        const filteredData = parsedData.filter(item => item.ID_2 === fid);
        const entry = filteredData[0];
        setPopupData(entry);
        setModalOpen(true);
        // console.log(entry)
        // e.target.bindPopup(`<h6 class="fw-bold p-2">${feature.properties.NAME_2}, ${feature.properties.NAME_1},<br>${feature.properties.NAME_0}</h6>`);
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

    if (!isVisible || !subProvinceData) {
        return null; 
    }

    return (
        <>
            <GeoJSON
                key={param}
                data={subProvinceData}
                style={(feature) => defineStyle(param, feature)}
                onEachFeature={onEachFeature}
            />
            {/* isVisible && subProvinceData && (
            <GeoJSON
                key={param}
                data={subProvinceData}
                style={(feature) => defineStyle(param, feature)}
                onEachFeature={onEachFeature}
            />) */}
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
        </>
    );
};

export default GenerateSubProvinceMap;