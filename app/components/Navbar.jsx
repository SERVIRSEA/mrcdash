import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MrcLogo from '../../public/assets/images/logos/MRC-logo-white.svg';

function Navbar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" position="static" sx={{background: "#01579b"}}>
                {/* <Container maxWidth="xl" > */}
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, ml: 1, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div style={{marginTop:"5px"}}>
                            <Image m={5} src={MrcLogo} width={60} alt="MRC" />
                        </div>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ paddingLeft: '10px', flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
                        >
                            Flood and Drought Monitoring Dashboard
                        </Typography>
                    </Toolbar>
                {/* </Container> */}
            </AppBar>
        </Box> 
    );
}

export default Navbar;