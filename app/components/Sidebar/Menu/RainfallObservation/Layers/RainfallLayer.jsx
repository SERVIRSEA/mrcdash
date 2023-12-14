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

    const pointToLayer = (feature, latlng) => {
        const stationName = feature.properties.STATION_NA;
        const color = getColorByName(stationName);

        const pointStyle = {
            radius: 4,
            fillColor: '#fff',
            color: color,
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
                event.target.setStyle({
                    color: getColorByName(stationName), 
                });
            },
        });
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