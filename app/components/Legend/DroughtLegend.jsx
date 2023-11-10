import React from 'react'
import { useAtom } from 'jotai'
import CDILegend from './CDILegend'
import ISWFLegend from './ISWFLegend'
import SPI1Legend from './SPI1Legend'
import { 
    cdiLayerVisibilityAtom,
    iswfLayerVisibilityAtom,
    spi1LayerVisibilityAtom
} from '@/app/state/atom'

const DroughtLegend = () => {
    const [cdiLegendVisible] = useAtom(cdiLayerVisibilityAtom);
    const [iswfLegendVisible] = useAtom(iswfLayerVisibilityAtom);
    const [spi1LegendVisible] = useAtom(spi1LayerVisibilityAtom);
  
    return (
        <>
            {cdiLegendVisible && (
                <CDILegend />
            )}
            {iswfLegendVisible && (
                <ISWFLegend />
            )}
            {spi1LegendVisible && (
                <SPI1Legend />
            )}
        </>
    );
}

export default DroughtLegend;