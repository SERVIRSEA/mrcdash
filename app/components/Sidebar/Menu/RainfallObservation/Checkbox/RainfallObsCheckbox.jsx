import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { rainfallVisibilityAtom } from '../state/RainfallAtom'

export default function RainfallObsCheckbox() {
    const [visible, setVisible] = useAtom(rainfallVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="Rainfall Observation"
                id="RainfallObs"
                sx={{ marginLeft: '10px'}}
            />
        </div>
    )
}
