import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DroughtGDPChart = () => {
    const droughtData = {
        "drought_levels": [
            {
                "level": "Extremely Dry",
                "GDP_MK": 64830399471
            },
            {
                "level": "Severely Dry",
                "GDP_MK": 33585360126
            },
            {
                "level": "Moderate Dry",
                "GDP_MK": 4137364258
            },
            {
                "level": "Normal",
                "GDP_MK": 4565641161
            }
        ]
    };

    const categories = [];
    const gdpValues = [];

    droughtData.drought_levels.forEach(entry => {
        categories.push(entry.level);
        gdpValues.push(entry.GDP_MK);
    });

    // Highcharts configuration
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estimated GDP Loss for Drought (SPI)',
            style: {
                fontSize: '14px'
            }
        },
        xAxis: {
            categories: categories,
            title: {
                text: 'Drought Levels'
            }
        },
        yAxis: {
            title: {
                text: 'GDP (in MK)'
            }
        },
        series: [{
            name: 'GDP',
            data: gdpValues,
            color: 'darkred'
        }],
        legend: false
    };

    useEffect(() => {
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
    }, []);

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DroughtGDPChart;
