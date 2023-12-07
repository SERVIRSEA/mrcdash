import React, {useState, useEffect} from 'react';
import { useAtom } from 'jotai';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Exporting from 'highcharts/modules/exporting';
import ExportData from 'highcharts/modules/export-data';
if (typeof Highcharts === 'object') {
    Exporting(Highcharts);
    ExportData(Highcharts);
}

const ReservoirChart = ({ series_inflow, series_outflow }) => {
    const options = {
        chart: {
            zoomType: "xy",
            panning: true,
            panKey: "shift",
            style: {
                color: "#000000",
            },
        },
        title: false,
        xAxis: {
            type: 'datetime',
            title: {
                text: "Year",
                style: {
                    // font: "16px bold Times New Roman, sans-serif",
                    color: "#000000",
                },
            },
            labels: {
                style: {
                    // font: "16px Times New Roman, sans-serif",
                    color: "#000000",
                },
            },
        },
        yAxis: [
            {
                title: {
                    text: "Inflow/Outflow (m3/s)",
                    style: {
                        color: "#000000",
                    },
                },
                labels: {
                    // format: "{value:.0f}",
                    style: {
                        // font: "16px Times New Roman, sans-serif",
                        color: "#000000",
                    },
                },
                minTickInterval: 0.01,
                // ... other yAxis options
            }
        ],
        tooltip: {
            xDateFormat: "%d-%m-%Y",
            crosshairs: true,
            shared: true,
        },
        legend: { enabled: true },
        series: [
            {
                name: 'Inflow(m3/s)',
                type: 'line',
                data: series_inflow,
                color: "darkblue",
                // states: states
            },
            {
                name: 'Outflow(m3/s)',
                type: 'line',
                data: series_outflow,
                color: "green",
                // states: states
            },
        ],
        exporting: {
            enabled: true,  // this will enable the exporting functionality
            buttons: {
              contextButton: {
                menuItems: [
                    'viewFullscreen',
                    'separator',
                    'downloadPNG',
                    'downloadJPEG',
                    'downloadPDF',
                    'downloadSVG',
                    'separator',  // A separator line between images and data export
                    'downloadCSV',
                    'downloadXLS'
                ]
              }
            }
        }
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ReservoirChart;