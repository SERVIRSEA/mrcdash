import React, { useState, useEffect } from 'react'
import { GeoJSON } from 'react-leaflet';
import { useAtom } from 'jotai';
import { GeoserverFetcher } from '../Fetchers/GeoserverFetcher';
import { lmbSubProvLayerVisibilityAtom, subProvinceDataAtom } from '@/app/state/atom';

const LMBSubProvinceLayer = () => {
    const [data, setData] = useAtom(subProvinceDataAtom);
    const [isVisible, setIsVisible] = useAtom(lmbSubProvLayerVisibilityAtom);

    const params = {
        service: 'WFS',
        version: '1.3.0',
        request: 'GetFeature',
        typeName: 'mrcdash:subprovince_lmb', 
        outputFormat: 'application/json',  
    };
    
    useEffect(() => {
        const endpoint = 'mrcdash/wfs'
        const fetchLMBData = async () => {
            const fetchedData = await GeoserverFetcher(params, endpoint);
            setData(fetchedData);
            // console.log(fetchedData)
        };
        fetchLMBData();   
    }, []); 

    const defaultStyle = () => {
        return {
            color: '#1f2021',
            weight: 1,
            fillOpacity: 0.0,
            fillColor: '#ffcc33',
        };
    };

    const highlightFeature = (e) => {
        const layer = e.target;
        layer.setStyle({
            weight: 3,
            color: '#ff0000', // Red color for the boundary
            fillOpacity: 0.7
        });
    };

    const resetHighlight = (e) => {
        const layer = e.target;
        layer.setStyle(defaultStyle());
    };
    
    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            const tooltipContent = `District: ${feature.properties.NAME_2}<br>Province: ${feature.properties.NAME_1}`;
            layer.bindTooltip(tooltipContent);
        }
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    };

    return (
        <>
            {isVisible && data && 
                <GeoJSON 
                    data={data} 
                    style={defaultStyle} 
                    onEachFeature={onEachFeature}
                />
            }
        </>
    )
}

export default LMBSubProvinceLayer;