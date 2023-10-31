import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { iswfLayerVisibilityAtom } from '@/app/state/atom'

export default function ISWFCheckbox() {
    const [visible, setVisible] = useAtom(iswfLayerVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="ISWF"
                id="iswf"
            />
        </div>
    )
}
