import CustomLegend from "./CustomLegend";

const iswfLegendItems = [
    { color: "#ca0020", label: "Extremely dry", hasBorder: false },
    { color: "#f1987a", label: "Severely dry", hasBorder: false },
    { color: "#f6d1c1", label: "Moderate dry", hasBorder: false },
    { color: "#ffffff", label: "Near Normal", hasBorder: true },
    { color: "#87bfdb", label: "Moderate wet", hasBorder: false },
    { color: "#5ca5cd", label: "Very wet", hasBorder: false },
    { color: "#0571b0", label: "Extremely wet", hasBorder: false },
];
  

export default function ISWFLegend() {
    return(
        <div style={{ display: "flex", flexDirection: "row" }}>
            <CustomLegend title="ISWF" legendItems={iswfLegendItems} />
        </div>
    );
}