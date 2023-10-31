import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { cdiLayerVisibilityAtom } from '@/app/state/atom'

export default function CDICheckbox() {
    const [visible, setVisible] = useAtom(cdiLayerVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="CDI"
                id="cdi"
            />
        </div>
    )
}
