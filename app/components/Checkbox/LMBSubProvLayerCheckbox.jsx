import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from './CustomCheckbox'
import { lmbSubProvLayerVisibilityAtom } from '@/app/state/atom'

export default function LMBSubProvLayerCheckbox() {
    const [visible, setVisible] = useAtom(lmbSubProvLayerVisibilityAtom)
    
    return (
        <CustomCheckbox 
            checked={visible} 
            onChange={(e) => setVisible(e.target.checked)}
            label="Sub-province"
            id="subprov"
        />
    )
}
