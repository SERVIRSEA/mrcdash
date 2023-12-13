import React, { useState, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import { rfDataAtom, rfVisibilityAtom } from '../state/RiverForecastAtom';

const RiverForecastLayer = () => {
    const [isVisible, setIsVisible] = useAtom(rfVisibilityAtom);
    const [mapData, setMapData] = useAtom(rfDataAtom);

    useEffect(() => {
        fetch('/dash/assets/geojson/riverForecastStations.json')
            .then(response => response.json())
            .then(data => setMapData(data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, []); 

    const pointStyle = {
        radius: 4, 
        fillColor: '#000', 
        color: '#9ecae1', 
        weight: 4, 
        opacity: 1, 
        fillOpacity: 0.8,
    };

    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, pointStyle);
    };

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

export default RiverForecastLayer;