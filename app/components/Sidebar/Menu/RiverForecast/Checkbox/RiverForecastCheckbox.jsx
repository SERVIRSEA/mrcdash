import React from 'react'
import { useAtom } from 'jotai'
import CustomCheckbox from '@/app/components/Checkbox/CustomCheckbox'
import { rfVisibilityAtom } from '../state/RiverForecastAtom'

export default function RiverForecastCheckbox() {
    const [visible, setVisible] = useAtom(rfVisibilityAtom)
    
    return (
        <div>
            <CustomCheckbox 
                checked={visible} 
                onChange={(e) => setVisible(e.target.checked)}
                label="River Forecast"
                id="rf"
                sx={{ marginLeft: '10px'}}
            />
        </div>
    )
}
