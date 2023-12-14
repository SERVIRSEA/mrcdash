import React, { useState, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import { reservoirDataAtom, reservoirVisibilityAtom } from '@/app/state/atom';
import ReservoirModal from '../Modal/ReservoirModal';
import { Box, Typography, Grid, Paper, Tooltip } from '@mui/material';
import { Modal } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { reservoirDataFetcher } from '@/app/components/Fetchers/Fetcher';

const ReservoirLayer = () => {
    const [isVisible, setIsVisible] = useAtom(reservoirVisibilityAtom);
    const [mapData, setMapData] = useAtom(reservoirDataAtom);
    const [rid, setRID] = useState('');
    const [sarea, setSarea] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetch('/dash/assets/geojson/reservoirs_38.json')
            .then(response => response.json())
            .then(data => setMapData(data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, [setMapData]); 

    useEffect(() => {
        const fetchData = async () => {
            
            const params = {
                action: 'increase_decrease',
                r_id: 'all',
            };

            const data = await reservoirDataFetcher(params);
            // console.log(data)
            setSarea(data)
        };
        fetchData();
    }, [setSarea]);

    const pointStyle = {
        radius: 6, 
        fillColor: '#000', 
        color: '#9ecae1', 
        weight: 6, 
        opacity: 1, 
        fillOpacity: 0.8,
    };

    const getIcon = (value) => {
        let iconUrl;
        if(value < 0){
            iconUrl = '/dash/assets/icon/brown.png';
        } else if (value > 0){
            iconUrl = '/dash/assets/icon/green.png';
        } else {
            iconUrl = '/dash/assets/icon/blue.png';
        }

        const iconOptions = {
            iconUrl: iconUrl,
            iconSize: [15, 22]
        };
        
        const customIcon = L.icon(iconOptions);
        
        return customIcon;
    }

    const getSareaValue = (id) => {
        const matchingSarea = sarea.find(item => item.ID === id);
        return matchingSarea ? matchingSarea.Value : 'N/A';
    };

    const pointToLayer = (feature, latlng) => {
        // console.log(feature)
        const id = feature.properties.ID;
        const value = getSareaValue(id);
        const customIcon = getIcon(value);
        // return L.circleMarker(latlng, pointStyle);
        return L.marker(latlng, { icon: customIcon });
    };

    const onEachFeature = (feature, layer) => {
        // Bind a tooltip to each feature
        const tooltipContent = `<strong>${feature.properties.NAME}</strong>`;
        layer.bindTooltip(tooltipContent);

        // Add hover events
        layer.on({
            // mouseover: () => {
            //     layer.setStyle({
            //         radius: 6, 
            //         fillColor: '#000', 
            //         color: 'red', 
            //         weight: 6, 
            //         opacity: 1, 
            //         fillOpacity: 0.8, 
            //     });
            // },
            // mouseout: () => {
            //     layer.setStyle(
            //         pointStyle 
            //     );
            // },
            click: () => {
                const reservoirId = feature.properties.ID;
                setRID(reservoirId);
                // console.log(reservoirId)
                setModalOpen(true);
            }
        });
    };

    return (
        <>
            {isVisible && mapData && 
                <GeoJSON 
                    data={mapData.features} 
                    pointToLayer={pointToLayer} 
                    onEachFeature={onEachFeature}
                />
            }
            {rid ? (<ReservoirModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                reservoirId={rid}
            />):(
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
        </>
    )
}

export default ReservoirLayer;