import CustomLegend from "./CustomLegend";

const cdiLegendItems = [
    { color: '#c43c39', label: 'Exceptional', hasBorder: false },
    { color: '#f50522', label: 'Extreme', hasBorder: false },
    { color: '#e8718d', label: 'Severe', hasBorder: false },
    { color: '#e5db36', label: 'Moderate', hasBorder: false },
    { color: '#ffffff', label: 'Normal', hasBorder: true }, // Add hasBorder property
];
  

export default function CDILegend(){
    return (
        <>
            <CustomLegend title="CDI" legendItems={cdiLegendItems} />
        </>
    )
}