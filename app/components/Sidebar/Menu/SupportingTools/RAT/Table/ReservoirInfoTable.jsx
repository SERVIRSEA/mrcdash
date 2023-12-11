import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import ReactCountryFlag from "react-country-flag";

const ReservoirInfoTable = ({ data }) => {
    
    if (!Array.isArray(data) || data.length === 0) {
        return <p>No data available</p>;
    }

    const headers = [
        // { header: 'Reservoir ID', key: 'ID' },
        { header: 'Name', key: 'NAME' },
        { header: 'Country', key: 'COUNTRY' },
        { header: 'Latitude', key: 'LATITUDE' },
        { header: 'Longitude', key: 'LONGITITUDE' },
        { header: 'Status', key: 'STATUS' },
        { header: 'Year', key: 'YEAR' },
        { header: 'Area (sq km)', key: 'AREA_SKM' },
        { header: 'Capacity (MCM)', key: 'CAP_MCM' },
        { header: 'Depth (m)', key: 'DEPTH_M' },
        { header: 'Catchment Area (sq km)', key: 'CATCH_SKM' },
        { header: 'Elevation (MASL)', key: 'ELEV_MASL' },
        { header: 'Dam Length (m)', key: 'DAM_LEN_M' },
    ];

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
        <>
            {data.map((reservoir, index) => (
                <TableContainer key={index} sx={{ maxWidth: 400, mb: 2 }}>
                    <Table size="small" aria-label="reservoir info table">
                        <TableBody>
                            {headers.map(({ header, key }) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row" sx={{fontWeight: "bold"}}>
                                        {header}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        :
                                    </TableCell>
                                    <TableCell align="right">
                                        {key === 'COUNTRY' ? (
                                            <ReactCountryFlag
                                                countryCode={getCountryCode(reservoir[key])}
                                                svg
                                                style={{
                                                    width: '2em',
                                                    height: '2em'
                                                }}
                                                title={reservoir[key]}
                                            />
                                        ) : (
                                            reservoir[key] !== null ? reservoir[key] : 'N/A'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
            <Box sx={{ maxWidth: 400, mb: 2 }}>
                <Typography variant="body2">
                    *Note: The above Latitude, Longitude, Status, Year and Capacity information of the reservoir was from MRC data sources and the rest data was collected from the Global Reservoir and Dam (GRanD) database.
                </Typography> 
            </Box>
        </>
    );
};

export default ReservoirInfoTable;
