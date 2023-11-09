import React from 'react';
import { Card, CardContent, Typography, Table, TableRow, TableCell, Grid, TableBody, TableHead } from '@mui/material';

export default function RiskDetails({ entry }) {
    
    // console.log(entry);

    const isoToCountryMap = {
        "THA": "Thailand",
        "VNM": "Vietnam",
        "KHM": "Cambodia",
        "LAO": "Laos"
    };

    if (!entry) {
        return null;
    }

    const totalMale = entry.M1 + entry.M2 + entry.M3;
    const totalFemale = entry.F1 + entry.F2 + entry.F3;
    const totalPop = totalMale + totalFemale;
    const country = isoToCountryMap[entry.ISO] || "---";

    return (
        <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
            <CardContent>
                <Typography variant="body1" component="div" sx={{fontWeight: 'bold'}}>
                    Risk Level: {entry.Alert_6Hrs}
                </Typography>
                <Table size='small'>
                    <TableBody>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{country}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Province</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{entry.NAME_1 || '---'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Sub-province</TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{entry.NAME_2 || '---'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Typography variant="body1" component="div" pt={3} sx={{fontWeight: 'bold'}}>
                    Social Vulnerability
                </Typography>
                <Typography variant="body2" component="div">
                    Population Exposed
                </Typography>
                <Grid container spacing={2} pt={3}>
                    <Grid item xs={3}>
                        <img src="http://203.146.112.243/static/img/pop.png" width={70} alt="pop" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 'bold'}}>
                            Total Population <br /> 
                            <span style={{ color: '#2196f3', fontSize: '1.5rem' }}>{totalPop}</span>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} pt={3}>
                    <Grid item xs={3}>
                        <img src="http://203.146.112.243/static/img/female.png" width={70} alt="female-pop" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 'bold'}}>
                            Female Population <br /> 
                            <span style={{ color: '#9c27b0', fontSize: '1.25rem' }}>{totalFemale}</span>
                        </Typography>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Age</TableCell>
                                    <TableCell align="center" colSpan={2}>Population</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>0-15</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.F1 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>15-65</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.F2 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> {"> 65"}</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.F3 || '---'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Grid container spacing={2} pt={3}>
                    <Grid item xs={3}>
                        <img src="http://203.146.112.243/static/img/male.png" width={70} alt="male-pop" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" component="div" sx={{fontWeight: 'bold'}}>
                            Male Population <br /> 
                            <span style={{ color: '#2979ff', fontSize: '1.25rem' }}>{totalMale}</span>
                        </Typography>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Age</TableCell>
                                    <TableCell align="center" colSpan={2}>Population</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>0-15</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.M1 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>15-65</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.M2 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> {"> 65"}</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.M3 || '---'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Typography variant="body1" component="div" pt={3} sx={{ fontWeight: 'bold'}}>
                    Physical Vulnerability
                </Typography>
                <Typography variant="body2" component="div">
                    TOTAL ROAD
                </Typography>
                <Grid container spacing={2} pt={3}>
                    <Grid item xs={3}>
                        <img src="http://203.146.112.243/static/img/road.png" width={70} alt="road" />
                    </Grid>
                    <Grid item xs={9}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Road Type</TableCell>
                                    <TableCell align="center" colSpan={2}>Length (KM)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Highways</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.RTP1 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Primary</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.RTP2 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Secondary</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.RTP3 || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tertiary</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.RTP4 || '---'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
                <Typography variant="body2" component="div" pt={3} pb={0} mb={0}>
                    TOTAL HOSPITAL
                </Typography>
                <Grid container spacing={2} pt={3} pb={0} mb={0}>
                    <Grid item xs={3} mt={0}>
                        <img src="http://203.146.112.243/static/img/hospital.png" width={70} alt="hospital" />
                    </Grid>
                    <Grid item xs={9} mt={2}>
                        {entry.Hospital || '---'}
                        <br /> Hospital
                    </Grid>
                </Grid>
                <Typography variant="body1" component="div" pt={3} sx={{ fontWeight: 'bold'}}>
                    Economic Vulnerability
                </Typography>
                <Grid container spacing={2} pt={3}>
                    <Grid item xs={3}>
                        <img src="http://203.146.112.243/static/img/gdp.jpg" width={70} alt="economic vulverability" />
                    </Grid>
                    <Grid item xs={9}>
                        <Table size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>
                                        Economic Losses (USD)
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>GDP</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.GDP || '---'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Crop Lands</TableCell>
                                    <TableCell>:</TableCell>
                                    <TableCell>{entry.crop_sqm || '---'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Typography variant="caption" color="textSecondary">
                            *GDP = Gross Domestic Product
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
