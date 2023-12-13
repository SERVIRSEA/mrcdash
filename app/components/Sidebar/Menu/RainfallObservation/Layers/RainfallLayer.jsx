import React, { useState, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import { rainfallDataAtom, rainfallVisibilityAtom } from '../state/RainfallAtom';

const RainfallLayer = () => {
    const [isVisible, setIsVisible] = useAtom(rainfallVisibilityAtom);
    const [mapData, setMapData] = useAtom(rainfallDataAtom);
    const [id, setID] = useState('');
    const [attribute, setAttribute] = useState([]);

    useEffect(() => {
        fetch('/dash/assets/geojson/stations.json')
            .then(response => response.json())
            .then(data => setMapData(data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, []); 

    // useEffect(() => {
    //     const fetchData = async () => {
            
    //         const params = {
    //             action: 'increase_decrease',
    //             r_id: 'all',
    //         };

    //         const data = await reservoirDataFetcher(params);
    //         // console.log(data)
    //         setSarea(data)
    //     };
    //     fetchData();
    // }, []);

    const pointStyle = {
        radius: 4, 
        fillColor: '#000', 
        color: '#9ecae1', 
        weight: 4, 
        opacity: 1, 
        fillOpacity: 0.8,
    };

    // const getIcon = (value) => {
    //     let iconUrl;
    //     if(value < 0){
    //         iconUrl = '/dash/assets/icon/brown.png';
    //     } else if (value > 0){
    //         iconUrl = '/dash/assets/icon/green.png';
    //     } else {
    //         iconUrl = '/dash/assets/icon/blue.png';
    //     }

    //     const iconOptions = {
    //         iconUrl: iconUrl,
    //         iconSize: [15, 22]
    //     };
        
    //     const customIcon = L.icon(iconOptions);
        
    //     return customIcon;
    // }

    // const getSareaValue = (id) => {
    //     const matchingSarea = sarea.find(item => item.ID === id);
    //     return matchingSarea ? matchingSarea.Value : 'N/A';
    // };

    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, pointStyle);
    };

    // const onEachFeature = (feature, layer) => {
    //     // Bind a tooltip to each feature
    //     const tooltipContent = `<strong>${feature.properties.NAME}</strong>`;
    //     layer.bindTooltip(tooltipContent);

    //     // Add hover events
    //     layer.on({
    //         // mouseover: () => {
    //         //     layer.setStyle({
    //         //         radius: 6, 
    //         //         fillColor: '#000', 
    //         //         color: 'red', 
    //         //         weight: 6, 
    //         //         opacity: 1, 
    //         //         fillOpacity: 0.8, 
    //         //     });
    //         // },
    //         // mouseout: () => {
    //         //     layer.setStyle(
    //         //         pointStyle 
    //         //     );
    //         // },
    //         click: () => {
    //             const reservoirId = feature.properties.ID;
    //             setRID(reservoirId);
    //             // console.log(reservoirId)
    //             setModalOpen(true);
    //         }
    //     });
    // };

    return (
        <>
            {isVisible && mapData && 
                <GeoJSON 
                    data={mapData.features} 
                    pointToLayer={pointToLayer} 
                    // onEachFeature={onEachFeature}
                />
            }
        </>
    )
}

export default RainfallLayer;