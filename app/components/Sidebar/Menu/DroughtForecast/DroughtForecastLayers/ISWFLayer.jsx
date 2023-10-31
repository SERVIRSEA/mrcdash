import React from 'react';
import { useAtom } from 'jotai';
import { WMSTileLayer } from 'react-leaflet';
import { iswfLayerVisibilityAtom } from '@/app/state/atom';

export default function ISWFLayer() {
    const [visibleISWFLayer] = useAtom(iswfLayerVisibilityAtom);
    const url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/mrcdash/wms?`
    
    return ( 
        <>
            {visibleISWFLayer && (
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'mrcdash:iswf_2023_08_20_forecast',
                        format: 'image/png',
                        transparent: true,
                        version: '1.1.0',
                        tiled: true,
                    }}
                />
            )}
        </>
    );
}
