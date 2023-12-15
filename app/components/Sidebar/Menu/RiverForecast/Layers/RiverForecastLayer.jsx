import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import axios from 'axios';
import L from 'leaflet';
import { rfDataAtom, rfVisibilityAtom, rfContentAtom, selectedStationAtom } from '../state/RiverForecastAtom';

const RiverForecastLayer = () => {
    const [isVisible] = useAtom(rfVisibilityAtom);
    const [mapData, setMapData] = useAtom(rfDataAtom);
    const [contentData, setContentData] = useAtom(rfContentAtom);
    const [isContentDataReady, setIsContentDataReady] = useState(false);
    const [, setStation] = useAtom(selectedStationAtom)

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

        const stationName = feature.properties.STATION_NA;
        const increaseDecreaseColor = getIncreaseDecreaseColor(stationName);

        // Create a custom divIcon with an SVG marker and dynamic color
        const customDivIcon = L.divIcon({
            className: 'custom-svg-marker',
            iconSize: [24, 24],
            html: `<div style="color: ${increaseDecreaseColor}">${createSvgMarker(increaseDecreaseColor)}</div>`,
        });

        // Use the custom divIcon for the marker
        const pointStyle = {
            icon: customDivIcon,
        };

        return L.marker(latlng, pointStyle);
    };

    const createSvgMarker = (fillColor) => {
        // Customize your SVG marker here
        return `
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" fill="${fillColor}"/>
        </svg>
        `;
    };

    const onEachFeature = (feature, layer) => {
        const stationName = feature.properties.STATION_NA;
        layer.bindTooltip(stationName);
        layer.on({
            mouseover: () => {
                setStation(stationName);
            },
            mouseout: () => {
                setStation(null);
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
