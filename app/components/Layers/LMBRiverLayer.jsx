import React, { useState, useEffect } from 'react'
import { GeoJSON} from 'react-leaflet';
import { GeoserverFetcher } from '../Fetchers/GeoserverFetcher';
import { lmbRiverLayerVisibilityAtom } from '@/app/state/atom';
import { useAtom } from 'jotai';

const LMBRiverLayer = () => {
    const [data, setData] = useState(null);
    const [isVisible, setIsVisible] = useAtom(lmbRiverLayerVisibilityAtom);

    const params = {
        service: 'WFS',
        version: '1.3.0',
        request: 'GetFeature',
        typeName: 'mrcdash:river_lmb', 
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
            fillColor: '#9999ff',
            weight: 2,
            opacity: 1,
            color: 'blue',
            fillOpacity: 0.8,
        };
    };

    return (
        <>
            {isVisible && data && 
                <GeoJSON 
                    data={data} 
                    style={defaultStyle} 
                />
            }
        </>
    )
}

export default LMBRiverLayer