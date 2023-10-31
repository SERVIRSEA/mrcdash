import { TileLayer, LayersControl } from 'react-leaflet';

export default function Basemaps(){
    const lightMap = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    const satelliteMap = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    const streetMap = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    const terrainMap = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}';
    const attribution = 'Tiles © Esri — Source: Esri, USGS, OSM and the GIS User Community';
    return(
        <>
            <LayersControl.BaseLayer checked name="MRC Basemap Version">
                <TileLayer url={lightMap} attribution={attribution} zIndex={0}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite Map">
                <TileLayer url={satelliteMap} attribution={attribution}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Street Map">
                <TileLayer url={streetMap} attribution={attribution}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Terrain Map">
                <TileLayer url={terrainMap} attribution={attribution}/>
            </LayersControl.BaseLayer>
        </>
    )
}