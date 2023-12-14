import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import axios from 'axios';
import L from 'leaflet';
import { rfDataAtom, rfVisibilityAtom, rfContentAtom } from '../state/RiverForecastAtom';

const RiverForecastLayer = () => {
    const [isVisible] = useAtom(rfVisibilityAtom);
    const [mapData, setMapData] = useAtom(rfDataAtom);
    const [contentData, setContentData] = useAtom(rfContentAtom);
    const [isContentDataReady, setIsContentDataReady] = useState(false);

    const getIncreaseDecreaseColor = (stationName) => {
        const stationData = contentData.find(entry => entry.station_name === stationName);
        if (stationData) {
            switch (stationData.increase_decrease) {
                case 'increase':
                    return 'green'; 
                case 'decrease':
                    return 'brown';
                case 'neutral':
                    return 'blue';
                default:
                    return '#000000'; // Black (default)
            }
        }
        return '#000000'; // Black (default)
    };

    useEffect(() => {
        fetch('/dash/assets/geojson/riverForecastStations.json')
            .then(response => response.json())
            .then(data => setMapData(data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, [contentData, setMapData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/dash/assets/data/weekly_trends.json');
                const responseData = response.data;
                const stationNames = mapData.features.map(feature => feature.properties.STATION_NA);
                const filteredData = responseData.filter(entry => stationNames.includes(entry.Name));
                const newData = filteredData.map(entry => ({
                    "station_name": entry.Name,
                    "increase_decrease": (entry.week2 > entry.week1) ? "increase" : (entry.week2 < entry.week1) ? "decrease" : "neutral"
                }));
                setContentData(newData);
                setIsContentDataReady(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (mapData && !isContentDataReady) {
            fetchData();
        }
    }, [mapData, isContentDataReady, setContentData]);

    const pointToLayer = (feature, latlng) => {
        if (!isContentDataReady) {
            return null; // Return null if content data is not ready
        }

        // Function to apply style based on colorData
        const stationName = feature.properties.STATION_NA;
        const increaseDecreaseColor = getIncreaseDecreaseColor(stationName);

        const pointStyle = {
            radius: 4,
            fillColor: '#fff',
            color: increaseDecreaseColor,
            weight: 4,
            opacity: 1,
            fillOpacity: 0.8,
        };

        return L.circleMarker(latlng, pointStyle);
    };

    const onEachFeature = (feature, layer) => {
        const stationName = feature.properties.STATION_NA;
        layer.bindTooltip(stationName);
        layer.on({
            mouseover: (event) => {
                event.target.setStyle({color: 'yellow'});
            },
            mouseout: (event) => {
                event.target.setStyle({color: getIncreaseDecreaseColor(stationName)});
            },
        });
    };

    return (
        <>
            {isVisible && mapData && isContentDataReady && (
                <GeoJSON
                    data={mapData.features}
                    pointToLayer={pointToLayer}
                    onEachFeature={onEachFeature}
                />
            )}
        </>
    );
};

export default RiverForecastLayer;
