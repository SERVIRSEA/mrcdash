import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { rfContentAtom } from './state/RiverForecastAtom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaArrowUp, FaArrowDown, FaRegSquare } from 'react-icons/fa';

const RiverForecastContent = () => {
    const [data] = useAtom(rfContentAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if data is available
        if (data.length > 0) {
            setLoading(false);
        }
    }, [data]);

    return (
        <Box p={2} sx={{ overflow: 'auto', height: '65vh'}}>
            {loading ? (
                // Optional: You can show a loading indicator if needed
                <div>Loading...</div>
            ) : (
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Station Name</TableCell>
                                <TableCell>This Week&apos;s Trend</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.station_name}>
                                    <TableCell>{row.station_name}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        {row.increase_decrease === 'increase' && (
                                            <FaArrowUp size='1.25em' style={{ color: 'green' }} />
                                        )}
                                        {row.increase_decrease === 'decrease' && (
                                            <FaArrowDown size='1.25em' style={{ color: 'brown' }} />
                                        )}
                                        {row.increase_decrease === 'neutral' && (
                                            <FaRegSquare size='1.25em' style={{ color: 'blue' }} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default RiverForecastContent;
