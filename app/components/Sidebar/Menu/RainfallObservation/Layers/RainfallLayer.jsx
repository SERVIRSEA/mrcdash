import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import { rainfallDataAtom, rainfallVisibilityAtom, rainfallContentDataAtom } from '../state/RainfallAtom';

const RainfallLayer = () => {
    const [isVisible] = useAtom(rainfallVisibilityAtom);
    const [mapData, setMapData] = useAtom(rainfallDataAtom);
    const [rfData, setRFData] = useAtom(rainfallContentDataAtom);
    const [isLoading, setIsLoading] = useState(true);

    const getColorByName = (stationName) => {
        const station = rfData.find(item => item.Name === stationName);
    
        if (!station) {
            console.log(`Station '${stationName}' not found.`);
            return 'darkgray';
        }
    
        const rfValue = station.RF;
    
        const getColor = () => {
            if (rfValue > 90) return '#e53935';
            if (rfValue >= 36 && rfValue <= 90) return '#ffb74d';
            if (rfValue >= 11 && rfValue <= 35) return '#ffa000';
            if (rfValue >= 1 && rfValue <= 10) return '#1565c0';
            if (rfValue === 0 || isNaN(rfValue)) return 'darkgray';
            return 'darkgray';
        };
    
        return getColor();
    };

    useEffect(() => {
        fetch('/dash/assets/geojson/stations.json')
            .then(response => response.json())
            .then(data => setMapData(data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, [setMapData]); 

    useEffect(() => {
        fetch('/dash/assets/data/stationData.json')
        .then((response) => response.json())
        .then((data) => {
            setRFData(data);
            setIsLoading(false); // Set loading to false when data is fetched
            console.log(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [setRFData]);

    // const pointToLayer = (feature, latlng) => {
    //     const stationName = feature.properties.STATION_NA;
    //     const color = getColorByName(stationName);

    //     const pointStyle = {
    //         radius: 4,
    //         fillColor: '#fff',
    //         color: color,
    //         weight: 4,
    //         opacity: 1,
    //         fillOpacity: 0.8,
    //     };

    //     return L.circleMarker(latlng, pointStyle);
    // };

    const pointToLayer = (feature, latlng) => {
        const stationName = feature.properties.STATION_NA;
        const color = getColorByName(stationName);

        // Create a custom divIcon with an SVG marker and dynamic color
        const customDivIcon = L.divIcon({
            className: 'custom-svg-marker',
            iconSize: [24, 24],
            html: `<div style="color: ${color}">${createSvgMarker(color)}</div>`,
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
        // layer.on({
        //     mouseover: (event) => {
        //         event.target.setStyle({color: 'yellow'});
        //     },
        //     mouseout: (event) => {
        //         event.target.setStyle({
        //             color: getColorByName(stationName), 
        //         });
        //     },
        // });
    };

    return (
        <>
            {!isLoading && isVisible && mapData && 
                <GeoJSON 
                    data={mapData.features} 
                    pointToLayer={pointToLayer} 
                    onEachFeature={onEachFeature}
                />
            }
        </>
    );
};

export default RainfallLayer;