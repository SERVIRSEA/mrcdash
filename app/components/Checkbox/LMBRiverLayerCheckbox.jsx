import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from './CustomCheckbox'
import { lmbRiverLayerVisibilityAtom } from '@/app/state/atom'

export default function LMBRiverLayerCheckbox() {
    const [visible, setVisible] = useAtom(lmbRiverLayerVisibilityAtom)
    
    return (
        <CustomCheckbox 
            checked={visible} 
            onChange={(e) => setVisible(e.target.checked)}
            label="Main River"
            id="river"
        />
    )
}
