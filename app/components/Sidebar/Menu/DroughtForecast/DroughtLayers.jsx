import { WMSTileLayer, LayersControl } from 'react-leaflet';

 export default function DroughtLayers() {
    const url = 'http://localhost:8080/geoserver/dashboard/wms?'
    return (
        <>
            <LayersControl.Overlay checked name="smdi_8day_2023-12-19">
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'dashboard:smdi_8day_2023-12-19',
                        format: 'image/png',
                        transparent: true,
                        version: '1.1.0'
                    }}
                />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="spi1_8day_2023-12-19">
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'dashboard:spi1_8day_2023-12-19',
                        format: 'image/png',
                        transparent: true,
                        version: '1.1.0'
                    }}
                />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="sri1_8day_2023-12-19">
                <WMSTileLayer
                    url={url}
                    params={{
                        layers: 'dashboard:sri1_8day_2023-12-19',
                        format: 'image/png',
                        transparent: true,
                        version: '1.1.0'
                    }}
                />
            </LayersControl.Overlay>
        </>
    )
 }