import React, { Component } from 'react'
import { GeoJSON, LayersControl } from 'react-leaflet';
import mapData from '../../../public/assets/geojson/reservoirs_38.json'

export default class ReservoirsLayer extends Component {
    state = {};

    render() {
        const pointStyle = {
            radius: 6, 
            fillColor: '#000', 
            color: '#9ecae1', 
            weight: 6, 
            opacity: 1, 
            fillOpacity: 0.8,
        };
    
        const pointToLayer = (feature, latlng) => {
            return L.circleMarker(latlng, pointStyle);
        };

        const onEachFeature = (feature, layer) => {
            // Bind a tooltip to each feature
            const tooltipContent = `<strong>${feature.properties.NAME}</strong>`;
            layer.bindTooltip(tooltipContent);
            
            // Add hover events
            layer.on({
                mouseover: () => {
                    layer.setStyle({
                        radius: 6, 
                        fillColor: '#000', 
                        color: 'red', 
                        weight: 6, 
                        opacity: 1, 
                        fillOpacity: 0.8, 
                    });
                },
                mouseout: () => {
                    layer.setStyle(
                        pointStyle 
                    );
                },
            });
        };
    
        return (
            <LayersControl.Overlay checked name="Reservoirs">
                <GeoJSON
                    data={mapData.features} 
                    pointToLayer={pointToLayer} 
                    onEachFeature={onEachFeature}
                />
            </LayersControl.Overlay>
        );
    }
}


