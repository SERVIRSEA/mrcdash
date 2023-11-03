import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
    ffgs06HrsDataCache,
    ffgsDate,
    ffgsHrs
} from './state/FFGSAtom';
import CreateList from './CreateList';

export default function FFGSRiskList() {
    const [date] = useAtom(ffgsDate);
    const [hrs] = useAtom(ffgsHrs);
    const [data6] = useAtom(ffgs06HrsDataCache);
    const [filteredData, setFilteredData] = useState([]);

    const cacheKey = `${date}_${hrs}`;

    useEffect(() => {
        const selectedData = data6[cacheKey];
        setFilteredData(selectedData);
    }, [data6, cacheKey]);

    return (
        <>
            {filteredData && <CreateList parsed_data={filteredData} param="6hrs" />}
        </>
    );
}