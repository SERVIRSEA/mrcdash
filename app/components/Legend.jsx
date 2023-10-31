import { useAtom } from "jotai"
import CDILegend from "./Legend/CDILegend"
import ISWFLegend from "./Legend/ISWFLegend"
import SPI1Legend from "./Legend/SPI1Legend"
import { 
    cdiLayerVisibilityAtom,
    iswfLayerVisibilityAtom,
    spi1LayerVisibilityAtom
} from "../state/atom"
import { Box } from "@mui/material"

export default function Legend() {
    const [cdiLegendVisible] = useAtom(cdiLayerVisibilityAtom);
    const [iswfLegendVisible] = useAtom(iswfLayerVisibilityAtom);
    const [spi1LegendVisible] = useAtom(spi1LayerVisibilityAtom);
  
    return (
        <div style={{ position: 'absolute', right: '10px', bottom: '25px', background: '#eee', zIndex: 600, maxHeight: '180px', overflow: 'auto' }}>
            {cdiLegendVisible && (
                <Box>
                    <CDILegend />
                </Box>
            )}
            {iswfLegendVisible && (
                <Box>
                    <ISWFLegend />
                </Box>
            )}
            {spi1LegendVisible && (
                <Box mt={(iswfLegendVisible) ? 6 : 0}>
                    <SPI1Legend />
                </Box>
            )}
        </div>
    );
  }