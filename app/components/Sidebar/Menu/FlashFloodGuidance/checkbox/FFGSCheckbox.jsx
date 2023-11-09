import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { FormControlLabel, RadioGroup, Radio, Checkbox, Box } from '@mui/material';
import { 
    ffgsParamSelection, 
    ffgsLayerVisibility
} from '../state/FFGSAtom';

export default function FFGSCheckbox() {
    const [param, setParam] = useAtom(ffgsParamSelection);
    const [visibility, setVisibility] = useAtom(ffgsLayerVisibility);

    const handleRadioChange = (event) => {
        setParam(event.target.value);
        // console.log(event.target.value)
    };

    const handleCheckboxChange = (event) => {
        setVisibility(event.target.checked);
    };

    return (
        <>
            <Box mt={3} display="flex" flexDirection="column" alignItems="left">
                <RadioGroup value={param} onChange={handleRadioChange} row>
                    <FormControlLabel value="FFG06" control={<Radio />} label="06Hrs" />
                    <FormControlLabel value="FFR12" control={<Radio />} label="12Hrs" />
                    <FormControlLabel value="FFR24" control={<Radio />} label="24Hrs" />
                </RadioGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={visibility}
                            onChange={handleCheckboxChange}
                            name="layerVisibility"
                            size="small"
                        />
                    }
                    label="Flash Flood Warning (Sub-province) "
                />
            </Box>
        </>
    );
}
