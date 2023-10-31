import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { reservoirAtom } from '@/app/state/atom';
import { reservoirDataFetcher } from '@/app/components/Fetchers/Fetcher';

export default function ReservoirChart() {
    const [rid] = useAtom(reservoirAtom);
    const [inflow, setInflow] = useState([]);
    const [outflow, setOutflow] = useState([]);

    useEffect(() => {
        const fetchReservoirData = async () => {
            const params = {
                action: 'inflow',
                r_id: rid,
            };
            const inflowData = await reservoirDataFetcher(params);
            setInflow(inflowData);
        };

        fetchReservoirData();
    }, []);

    return <div>ReservoirChart</div>;
}
