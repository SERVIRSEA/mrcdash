import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
    ffgs06HrsDataCache, 
    ffgs12HrsDataCache, 
    ffgs24HrsDataCache, 
    ffgsDate, 
    ffgsHrs,
    ffgsParamSelection,
    ffgsLayerVisibility,
} from '../state/FFGSAtom';
import GenerateSubProvinceMap from './GenerateSubProvinceMap';

export default function FFGSMap() {
    const [param] = useAtom(ffgsParamSelection);
    const [date] = useAtom(ffgsDate);
    const [hrs] = useAtom(ffgsHrs);
    const [data6] = useAtom(ffgs06HrsDataCache);
    const [data12] = useAtom(ffgs12HrsDataCache);
    const [data24] = useAtom(ffgs24HrsDataCache);
    const [isVisible] = useAtom(ffgsLayerVisibility);
    const [data, setData] = useState({});

    const cacheKey = `${date}_${hrs}`;

    useEffect(() => {
        if (param == "FFG06"){
            setData(data6[cacheKey]);
        } else if(param == "FFR12"){
            setData(data12[cacheKey]);
        }  else if(param == "FFR24"){
            setData(data24[cacheKey]);
        }
    }, [data6, data12, data24, cacheKey, param]);

    return (
        <>  
            {data && <GenerateSubProvinceMap param={param} parsedData={data} isVisible={isVisible} />}
        </>
    );
}
