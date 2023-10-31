import React from 'react';
import { useAtom } from 'jotai';
import { WMSTileLayer } from 'react-leaflet';
import { cdiLayerVisibilityAtom } from '@/app/state/atom';

export default function CDILayer() {
    const [visibleCDILayer] = useAtom(cdiLayerVisibilityAtom);
    const url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/mrcdash/wms?`
    
    return ( 
        <>
            {visibleCDILayer && (
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'mrcdash:cdi_2023_08_20_forecast',
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
