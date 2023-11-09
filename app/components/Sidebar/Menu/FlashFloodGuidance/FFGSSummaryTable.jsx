import React, { useEffect, useState } from "react"
import { useAtom } from "jotai"
import Flag from 'react-flagkit';
import { Table, TableBody, TableRow, TableHead, TableCell } from "@mui/material"
import { 
    ffgsDate, 
    ffgsHrs,
    ffgs06HrsDataCache,
    ffgs12HrsDataCache,
    ffgs24HrsDataCache,
    ffgsEventDataCache
} from "./state/FFGSAtom"
import { FFGSFetcher } from "@/app/components/Fetchers/FFGSFetcher"
import countRecordsPerISO from "./utils/countRecordsPerISO"
import combineData from "./utils/combineData"
import CreateList from './CreateList';

const isos = ['KHM', 'LAO', 'THA', 'VNM'];

const iso3ToIso2 = {
    'VNM': 'VN',
    'KHM': 'KH',
    'THA': 'TH',
    'LAO': 'LA'
};

function FlagComponent({ countryCode }) {
    return <Flag country={countryCode} />;
}

export default function FFGSSummaryTable() {
    const [date] = useAtom(ffgsDate);
    const [hrs] = useAtom(ffgsHrs);
    const [eventData, setEventData] = useState({});
    const [data06HrsCache, setData06HrsCache] = useAtom(ffgs06HrsDataCache);
    const [data12HrsCache, setData12HrsCache] = useAtom(ffgs12HrsDataCache);
    const [data24HrsCache, setData24HrsCache] = useAtom(ffgs24HrsDataCache);
    // const [data6, setData6] = useState([]);

    const cacheKey = `${date}_${hrs}`;
    
    const centeredText = {
        textAlign: 'center',
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const params = { date:date, hrs:hrs };

            let eventData6, eventData12, eventData24;

            if(!data06HrsCache[cacheKey]) {
                const data6 = await FFGSFetcher('get-stat-6hrs', params);
                eventData6 = JSON.parse(data6);
                // setData6(eventData6);
                setData06HrsCache(prevCache => ({ ...prevCache, [cacheKey]: eventData6 }));
            } else {
                eventData6 = data06HrsCache[cacheKey];
                // setData6(eventData6);
            }

            if(!data12HrsCache[cacheKey]) {
                const data12 = await FFGSFetcher('get-stat-12hrs', params);
                eventData12 = JSON.parse(data12);
                setData12HrsCache(prevCache => ({ ...prevCache, [cacheKey]: eventData12 }));
            } else {
                eventData12 = data12HrsCache[cacheKey];
            }

            if(!data24HrsCache[cacheKey]) {
                const data24 = await FFGSFetcher('get-stat-24hrs', params);
                eventData24 = JSON.parse(data24);
                setData24HrsCache(prevCache => ({ ...prevCache, [cacheKey]: eventData24 }));
            } else {
                eventData24 = data24HrsCache[cacheKey];
            }

            const organizedData = combineData(
                countRecordsPerISO(eventData6, '6hrs'), 
                countRecordsPerISO(eventData12, '12hrs'), 
                countRecordsPerISO(eventData24, '24hrs')
            );
            setEventData(organizedData);
            // console.log(organizedData)
        }
        fetchData();
    }, [date, hrs]);
    

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={centeredText}>Country</TableCell>
                        <TableCell sx={centeredText}>Next 06 HRS <br></br>(No. Provinces)</TableCell>
                        <TableCell sx={centeredText}>Next 12 HRS <br></br>(No. Provinces)</TableCell>
                        <TableCell sx={centeredText}>Next 24 HRS <br></br>(No. Provinces)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isos.map(iso => (
                        <TableRow key={iso}>
                            <TableCell sx={centeredText}><FlagComponent countryCode={iso3ToIso2[iso]} /></TableCell>
                            {['6hrs', '12hrs', '24hrs'].map(hour => (
                                <TableCell key={hour} sx={centeredText}>
                                    {eventData[iso] && eventData[iso][hour] ? eventData[iso][hour] : 0}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* {data6 && <CreateList parsed_data={data6} param="6hrs" />} */}
        </>
    );
}