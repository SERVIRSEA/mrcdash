"use client"
import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MrcLogo from '../../public/assets/images/logos/MRC-logo-white.svg';

const drawerWidth = 240;

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MRC Dashboard
            </Typography>
            <Divider />
            {/* <List>  
                <ListItem sx={{display:'flex', justifyContent:'center'}}>
                    <Link className="navbar-menu-item" href="/" underline="none" sx={{ color: '#000', textAlign: 'center' }}>Home</Link>
                </ListItem>  
                <ListItem sx={{display:'flex', justifyContent:'center'}}>
                    <Link className="navbar-menu-item" href="/about" underline="none" sx={{ color: '#000', textAlign: 'center' }}>About</Link>
                </ListItem>  
                <ListItem sx={{display:'flex', justifyContent:'center'}}>
                    <Link className="navbar-menu-item" href="/mapviewer" underline="none" sx={{ color: '#000', textAlign: 'center' }}>Mapviewer</Link>
                </ListItem>  
            </List> */}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" position="static" sx={{background: "#01579b"}}>
                <Container disableGutters >
                    <Toolbar sx={{p: 0, m: 0}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
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
                        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button sx={{ color: '#fff' }}>
                              <Link className="navbar-menu-item" href="/" underline="none" sx={{ color: '#fff' }}>Home</Link>
                            </Button>
                            <Button sx={{ color: '#fff' }}>
                              <Link className="navbar-menu-item" href="/about" underline="none" sx={{ color: '#fff' }}>About</Link>
                            </Button>
                            <Button sx={{ color: '#fff' }}>
                              <Link className="navbar-menu-item" href="/mapviewer" underline="none" sx={{ color: '#fff' }}>Map</Link>
                            </Button>
                        </Box> */}
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                {drawer}
                </Drawer>
            </Box>  
        </Box> 
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;