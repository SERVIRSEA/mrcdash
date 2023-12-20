import CustomLegend from "./CustomLegend";

const rainfallLegendItems = [
    { color: '#e53935', label: 'Very Heavy Rain', hasBorder: false },
    { color: '#ffb74d', label: 'Heavy Rain', hasBorder: false },
    { color: '#ffa000', label: 'Moderate Rain', hasBorder: false },
    { color: '#1565c0', label: 'Light Rain', hasBorder: false },
    { color: 'darkgray', label: 'No Rain/NoData', hasBorder: false }, 
];
  
export default function RainfallLegend(){
    return (
        <>
            <CustomLegend title="Rainfall Observation" legendItems={rainfallLegendItems} />
        </>
    )
}