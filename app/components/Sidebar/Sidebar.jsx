import React from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SupportingTools from "./Menu/SupportingTools/SupportingTools"
import { sideNavContentWidthAtom } from '@/app/state/atom';
import DroughtForecast from './Menu/DroughtForecast/DroughtForecast';

const menuTitleAtom = atom("TODAY")
const activeTabAtom = atom("block");
const activeAtom = atom(0);
const activeTabPanelAtom = atom(0);

function Sidebar(){
    const [sideNavWidth, setSideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [sideNav, setActiveSideNav] = useAtom(activeTabAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeAtom);
    const [navContent, setActiveNavContent] = useAtom(activeTabPanelAtom);
    const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom)
    
    const sidebarStyle = {
        background: "#333",
        color: "#fff",
        width: '80px',
        height: "calc(100% - 15px)",
        position: 'fixed',
        zIndex: 999,
    };

    const closeIconStyle = {
        paddingRight: '10px',
        textAlign: 'right',
    };

    const listItemButtonStyle = {
        justifyContent: "center",
        paddingBottom: '0px',
    };

    const menuItemStyle = {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 0,
    };

    const paragraphStyle = {
        textAlign: 'center',
        fontSize: '10px',
        padding: '0px',
    };

    const contentContainerStyle = {
        background: "#f5f5f5",
        color: "#000",
        width: sideNavWidth,
        height: "calc(100% - 15px)",
        position: 'fixed',
        marginLeft: '80px',
        zIndex: 999,
        display: sideNavWidth === '0px' ? 'none' : 'block'
    };

    const titleStyle = {
        textAlign: 'left',
        fontSize: '16px',
        margin: 0,
        paddingLeft: '10px',
    };

    const closeAndTitleContainerStyle = {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingRight: '10px',
        borderBottom: '1px solid #000'
    };

    const menuContentStyle = {
        padding: '10px'
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setActiveSideNav('block');
        setActiveNavContent(index);
        setSideNavWidth('300px');
        const menuTitles = ["TODAY", "RIVER FORECAST", "FLASH FLOOD GUIDANCE", "DROUGHT FORECAST", "MEDIUM & LONG RANGE FORECAST", "RAINFALL OBSERVATION", "SUPPORTING TOOLS"];
        setMenuTitle(menuTitles[index] || '');
    };

    const handleCloseClick = () => {
        setActiveSideNav(!sideNav);
        setSideNavWidth('0px');
    };

    const contentBelowTitle = () => {
        switch (navContent) {
            case 0:
                return (
                    <div style={menuContentStyle}>
                        
                    </div>
                );
            case 1:
                return (
                    <div style={menuContentStyle}>
                        
                    </div>
                );
            case 2:
                return (
                    <div style={menuContentStyle}>
                        {/* Content for index 2 */}
                    </div>
                );
            case 3:
                return (
                    <div style={menuContentStyle}>
                        <DroughtForecast />
                    </div>
                );

            default:
                return null;
        }
    };
    
    return(
        <>
            <div style={sidebarStyle} >
                <List component="nav" sx={{ mt:0, pt:0 }} aria-label="items">
                    <ListItemButton 
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={} width={30} alt="Biophysicial Monitoring" /> */}
                            <p style={paragraphStyle}>Today</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={ForestMontIcon} width={30} alt="Forest Monitoring" /> */}
                            <p style={paragraphStyle}>River<br />Forecast</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={CropMontIcon} width={30} alt="Crop Monitoring" /> */}
                            <p style={paragraphStyle}>FlashFlood<br />Guidance</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={ForestAlertIcon} width={30} alt="Forest Alert" /> */}
                            <p style={paragraphStyle}>Drought <br /> Forecast</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={FireHotspotIcon} width={30} alt="Fire Hotspot" /> */}
                            <p style={paragraphStyle}>Medium & Long <br /> Range Forecast</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={BasemapLayerIcon} width={30} alt="Map Layers" /> */}
                            <p style={paragraphStyle}>Rainfall <br />Observation</p>
                        </div>
                    </ListItemButton>
                    <ListItemButton
                        sx={listItemButtonStyle}
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6)}
                    >
                        <div style={menuItemStyle}>
                            {/* <Image src={ReportIcon} width={30} alt="Reporting" /> */}
                            <p style={paragraphStyle}>Supporting Tools</p>
                        </div>
                    </ListItemButton>
                </List>
            </div>
            <div style={contentContainerStyle}>
                <div style={closeAndTitleContainerStyle}>
                    <h3 style={titleStyle}>{menuTitle}</h3>
                    <div onClick={handleCloseClick} style={closeIconStyle}>
                        {/* <Tooltip title="Close"><FirstPageIcon style={{ marginTop: '10px', fontSize: '30px', cursor: 'pointer' }} /></Tooltip> */}
                        <FirstPageIcon style={{ marginTop: '10px', fontSize: '30px', cursor: 'pointer' }} />
                    </div>  
                </div>
                {contentBelowTitle()}
            </div> 
        </>
    )
}

export default Sidebar;