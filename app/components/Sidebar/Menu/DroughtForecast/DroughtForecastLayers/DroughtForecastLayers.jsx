import CDILayer from "./CDILayer"
import ISWFLayer from "./ISWFLayer"
import SPI1Layer from "./SPI1Layer"

export default function DroughtForecastLayers() {
    return (
        <>
            <CDILayer />
            <ISWFLayer />
            <SPI1Layer />
        </>
    )
}
