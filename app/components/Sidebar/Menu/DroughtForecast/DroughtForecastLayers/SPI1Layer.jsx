import React from 'react';
import { useAtom } from 'jotai';
import { WMSTileLayer } from 'react-leaflet';
import { spi1LayerVisibilityAtom } from '@/app/state/atom';

export default function SPI1Layer() {
    const [visibleSPI1Layer] = useAtom(spi1LayerVisibilityAtom);
    const url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/mrcdash/wms?`
    
    return ( 
        <>
            {visibleSPI1Layer && (
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'mrcdash:spi1_2023_08_20_forecast',
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
