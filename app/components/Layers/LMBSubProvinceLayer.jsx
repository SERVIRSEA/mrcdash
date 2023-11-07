import React, { useState, useEffect } from 'react'
import { GeoJSON, Tooltip } from 'react-leaflet';
import { GeoserverFetcher } from '../Fetchers/GeoserverFetcher';
import { lmbSubProvLayerVisibilityAtom } from '@/app/state/atom';
import { useAtom } from 'jotai';

const LMBSubProvinceLayer = () => {
    const [data, setData] = useState(null);
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
    
    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            const tooltipContent = `District: ${feature.properties.NAME_2}<br>Province: ${feature.properties.NAME_1}`;
            layer.bindTooltip(tooltipContent);
        }
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