import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function RainfallChart({ count, totalEvents, eventColor, totalEventsColor }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && count !== undefined) {
            const chart = chartRef.current.chart;
    
            chart.tooltip.options.formatter = function () {
                return `<b>${count}</b> of <b>${totalEvents}</b> stations (${((count / totalEvents) * 100).toFixed(1)}%)`;
            };
    
            const chartCenterX = chart.plotWidth / 2;
            const chartCenterY = chart.plotHeight / 2;

            const countText = `<tspan x="${chartCenterX + 2}" y="${chartCenterY + 18}" style="font-size: 20px; text-align: center;">${count}</tspan>`;
    
            const textElement = chart.renderer
                .text(countText, chartCenterX, chartCenterY)
                .attr({
                    zIndex: 1,
                })
                .css({
                    color: '#000',
                })
                .add();
    
            const textBBox = textElement.getBBox();
            textElement.attr({
                x: chartCenterX - textBBox.width / 2.2,
                y: chartCenterY - textBBox.height / 2,
            });
        }
    }, [count, totalEvents]);

    const options = {
        chart: {
            type: 'pie',
            // spacingTop: 0, 
            // spacingBottom: 0,
            height: 150, 
            width: 150,
            // margin: [0, 0, 0, 0],
        },
        title: false,
        plotOptions: {
            pie: {
                innerSize: '60%',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: false,
            },
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} events)',
        },
        colors: [eventColor, totalEventsColor, 'transparent'], 
        series: [
            {
                // name: 'Category',
                data: [
                    {
                        y: count,
                        color: eventColor,
                    },
                    {
                        y: totalEvents,
                        color: totalEventsColor,
                    },
                ],
                center: ['50%', '50%'],
                size: '100%',
                // dataLabels: {
                //     enabled: false,
                // },
            },
        ],
        legend: false,
        exporting: {
            enabled: false, 
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />;
}

export default RainfallChart;
