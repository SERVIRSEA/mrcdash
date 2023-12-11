import React from 'react';
import { useAtom } from 'jotai';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ffgsHrs } from './state/FFGSAtom';

const HourSelection = () => {
    const [hour, setHour] = useAtom(ffgsHrs);

    const handleHourChange = (event) => {
        setHour(event.target.value);
    };

    return (
        <FormControl fullWidth size="small">
            {/* <InputLabel id="hour-select-label">Hour</InputLabel> */}
            <Select
                labelId="hour-select-label"
                id="hour-select"
                value={hour}
                // label="Hour"
                onChange={handleHourChange}
            >
                {Array.from({ length: 24 }, (_, i) => (
                    <MenuItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default HourSelection;
