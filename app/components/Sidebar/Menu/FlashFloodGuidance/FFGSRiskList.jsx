import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
    ffgs06HrsDataCache,
    ffgs12HrsDataCache,
    ffgs24HrsDataCache,
    ffgsDate,
    ffgsHrs
} from './state/FFGSAtom';
import { Button, Box } from '@mui/material';
import CreateList from './CreateList';
import { ffgsParamSelection } from './state/FFGSAtom';

export default function FFGSRiskList() {
    const [date] = useAtom(ffgsDate);
    const [hrs] = useAtom(ffgsHrs);
    const [data6] = useAtom(ffgs06HrsDataCache);
    const [data12] = useAtom(ffgs12HrsDataCache);
    const [data24] = useAtom(ffgs24HrsDataCache);
    const [filteredData, setFilteredData] = useState([]);
    const [activeButton, setActiveButton] = useState(0);
    // const [param, setParam] = useState('6hrs');
    const [param, setParam] = useAtom(ffgsParamSelection);

    const cacheKey = `${date}_${hrs}`;

    useEffect(() => {
        updateFilteredData(activeButton);
    }, [data6, data12, data24, cacheKey, activeButton]);

    const updateFilteredData = (index) => {
        let selectedData;
        if (index === 0) selectedData = data6[cacheKey];
        else if (index === 1) selectedData = data12[cacheKey];
        else if (index === 2) selectedData = data24[cacheKey];
        setFilteredData(selectedData);
    }

    const handleClick = (index)=> {
        setActiveButton(index);
        if (index === 0) setParam('FFG06');
        else if (index === 1) setParam('FFR12');
        else if (index === 2) setParam('FFR24');
    }

    return (
        <>
            <Box mt={3} display="flex" justifyContent="center" alignItems="center">
                {['06Hrs', '12 Hrs', '24Hrs'].map((label, index) => (
                    <Button
                        key={index}
                        onClick={() => handleClick(index)}
                        sx={{
                            borderRadius: 0,
                            borderBottom: activeButton === index ? '2px solid blue' : 'none',
                            color: activeButton === index ? 'blue' : 'black',
                            marginRight: index < 2 ? 2 : 0,
                            '&:hover': {
                            color: activeButton === index ? 'black' : 'blue',
                            },
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
            {filteredData && <CreateList parsed_data={filteredData} selectedParam={param} />}
        </>
    );
}