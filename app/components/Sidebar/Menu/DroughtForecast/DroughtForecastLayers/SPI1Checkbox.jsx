import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { spi1LayerVisibilityAtom } from '@/app/state/atom'

export default function SPI1Checkbox() {
    const [visible, setVisible] = useAtom(spi1LayerVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="SPI1"
                id="spi1"
            />
        </div>
    )
}
