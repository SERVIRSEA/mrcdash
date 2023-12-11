import React from 'react';
import { useAtom } from 'jotai';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ffgsCountry } from './state/FFGSAtom';

const CountrySelection = () => {
    const [country, setCountry] = useAtom(ffgsCountry);

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    return (
        <FormControl fullWidth style={{marginTop: '10px'}} size="small">
            {/* <InputLabel id="country-select-label">Country</InputLabel> */}
            <Select
                labelId="country-select-label"
                id="country-select"
                value={country}
                // label="Country"
                onChange={handleCountryChange}
            >   
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="KHM">Cambodia</MenuItem>
                <MenuItem value="LAO">Lao PDR</MenuItem>
                <MenuItem value="THA">Thailand</MenuItem>
                <MenuItem value="VNM">Vietnam</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CountrySelection;
