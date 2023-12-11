import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import ReactCountryFlag from "react-country-flag";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { reservoirDataAtom } from '@/app/state/atom';
import { reservoirDataFetcher } from '@/app/components/Fetchers/Fetcher';
import { FaArrowUp, FaArrowDown, FaRegSquare } from 'react-icons/fa';
import ReservoirModal from '../Modal/ReservoirModal';
import CircularProgress from '@mui/material/CircularProgress';


const ReservoirTable = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [data] = useAtom(reservoirDataAtom);
    const [sarea, setSarea] = useState([]);
    const [rid, setRID] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            
            const params = {
                action: 'increase_decrease',
                r_id: 'all',
            };

            const data = await reservoirDataFetcher(params);
            // console.log(data)
            setSarea(data)
        };
        fetchData();
    }, []);
    
    const userDefinedOrder = ['China', 'Laos', 'Thailand', 'Cambodia', 'Vietnam'];

    // Function to get the index of a country in the user-defined order
    const getOrderIndex = (countryName) => {
        const index = userDefinedOrder.indexOf(countryName);
        return index === -1 ? userDefinedOrder.length : index;
    };

    // Sort the features array based on the user-defined order
    const sortedFeatures = [...data.features].sort((a, b) => {
        return getOrderIndex(a.properties.COUNTRY) - getOrderIndex(b.properties.COUNTRY);
    });

    // Map the sorted data to rows
    const rows = sortedFeatures.map(feature => ({
        name: feature.properties.NAME,
        country: feature.properties.COUNTRY,
        id: feature.properties.ID
    }));

    const getSareaValue = (id) => {
        const matchingSarea = sarea.find(item => item.ID === id);
        return matchingSarea ? matchingSarea.Value : 'N/A';
    };

    const renderValueIcon = (value) => {
        const iconSize = '1.25em';
        if (value < 0) {
            return <FaArrowDown size={iconSize} style={{ color: 'brown' }} />;
        } else if (value > 0) {
            return <FaArrowUp size={iconSize} style={{ color: 'green' }} />;
        } else {
            return <FaRegSquare size={iconSize} style={{ color: 'blue' }} />;
        }
    };

    // Handler for row click
    const handleRowClick = (id) => {
        // console.log("Clicked row ID:", id);
        setRID(id);
        setModalOpen(true);
    };

    function getCountryCode(countryName) {
        // Map the country name to its ISO code. Implement this mapping.
        const countryCodes = {
            "Cambodia": "KH",
            "China": "CN",
            "Laos": "LA",
            "Thailand": "TH",
            "Vietnam": "VN"
        };

        return countryCodes[countryName];
    }

    return (
        <Box p={2} sx={{ overflow: 'auto', height: '65vh'}}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 'bold'}}>Country</TableCell>
                            <TableCell align="center" sx={{ fontSize: "14px", fontWeight: 'bold'}}>Increase/Decrease</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow 
                                key={index} 
                                onClick={() => handleRowClick(row.id)}
                                style={{ cursor: 'pointer'}} 
                            >
                                <TableCell component="th" scope="row">
                                    <span
                                        onMouseEnter={() => setHoveredRow(row.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        style={{
                                            color: hoveredRow === row.id ? 'red' : 'inherit',
                                            fontWeight: hoveredRow === row.id ? 'bold' : 'normal',
                                        }}
                                    >
                                        {row.name}
                                    </span>
                                </TableCell>
                                <TableCell align="center">
                                    <ReactCountryFlag 
                                        countryCode={getCountryCode(row.country)}  
                                        svg 
                                        style={{ width: '2em', height: '2em' }}
                                        title={row.country}
                                    />
                                </TableCell>
                                <TableCell align="center">{renderValueIcon(getSareaValue(row.id))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {rid ? (<ReservoirModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                reservoirId={rid}
            />):(
                <></>
            )}
        </Box>
    );
};

export default ReservoirTable;
