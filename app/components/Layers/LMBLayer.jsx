import React, { useState, useEffect } from 'react'
import { GeoJSON} from 'react-leaflet';
import { GeoserverFetcher } from '../Fetchers/GeoserverFetcher';
import { lmbLayerVisibilityAtom } from '@/app/state/atom';
import { useAtom } from 'jotai';

const LMBLayer = () => {
    const [data, setData] = useState(null);
    const [isVisible, setIsVisible] = useAtom(lmbLayerVisibilityAtom);

    const params = {
        service: 'WFS',
        version: '1.3.0',
        request: 'GetFeature',
        typeName: 'mrcdash:lmb', 
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
            fillColor: '#2E86C1',
            weight: 3,
            opacity: 0.5,
            color: '#000',
            fillOpacity: 0.0,
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

export default LMBLayer;