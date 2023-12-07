import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { reservoirVisibilityAtom } from '@/app/state/atom'

export default function RATCheckbox() {
    const [visible, setVisible] = useAtom(reservoirVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="RAT"
                id="RAT"
                sx={{ marginLeft: '10px'}}
            />
        </div>
    )
}
