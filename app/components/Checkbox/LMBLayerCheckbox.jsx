import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from './CustomCheckbox'
import { lmbLayerVisibilityAtom } from '@/app/state/atom'

export default function LMBLayerCheckbox() {
    const [visible, setVisible] = useAtom(lmbLayerVisibilityAtom)
    
    return (
        <CustomCheckbox 
            checked={visible} 
            onChange={(e) => setVisible(e.target.checked)}
            label="Lower Mekong Basin"
            id="lmb"
        />
    )
}
