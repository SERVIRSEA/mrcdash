import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SupportingTools from "./Menu/SupportingTools/SupportingTools"
import { sideNavContentWidthAtom } from '@/app/state/atom';
import DroughtForecast from './Menu/DroughtForecast/DroughtForecast';
import DatePanel from '../DatePanel';
import FlashFloodGuidance from './Menu/FlashFloodGuidance/FlashFloodGuidance';
import { activeMenuAtom, statTabValueAtom } from '@/app/state/atom';
import { cdiLayerVisibilityAtom } from '@/app/state/atom';
import { ffgsLayerVisibility } from './Menu/FlashFloodGuidance/state/FFGSAtom';
import { reservoirVisibilityAtom } from '@/app/state/atom';
import RainfallObservation from './Menu/RainfallObservation/RainfallObservation';
import { rainfallVisibilityAtom } from './Menu/RainfallObservation/state/RainfallAtom';
import RiverForecast from './Menu/RiverForecast/RiverForecast';
import { rfVisibilityAtom } from './Menu/RiverForecast/state/RiverForecastAtom';


const menuTitleAtom = atom("")
const activeTabAtom = atom("block");
const activeAtom = atom(2);
const activeTabPanelAtom = atom(2);

function Sidebar(){
    const [sideNavWidth, setSideNavWidth] = useAtom(sideNavContentWidthAtom)
    const [sideNav, setActiveSideNav] = useAtom(activeTabAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeAtom);
    const [navContent, setActiveNavContent] = useAtom(activeTabPanelAtom);
    const [menuTitle, setMenuTitle] = useAtom(menuTitleAtom);
    const [, setLegend] = useAtom(activeMenuAtom);
    const [, setCDILayerVisibility] = useAtom(cdiLayerVisibilityAtom);
    const [, setFFGSLayerVisibility] = useAtom(ffgsLayerVisibility);
    const [, setReservoirVisibility] = useAtom(reservoirVisibilityAtom);
    const [, setActiveStat] = useAtom(statTabValueAtom);
    const [, setRainfallObsVisibility] = useAtom(rainfallVisibilityAtom);
    const [, setRFVisibility] = useAtom(rfVisibilityAtom)

    useEffect(()=>{
        const menuTitles = ["TODAY", "RIVER FORECAST", "FLASH FLOOD GUIDANCE", "DROUGHT FORECAST", "MEDIUM & LONG RANGE FORECAST", "RAINFALL OBSERVATION", "SUPPORTING TOOLS"];
        setMenuTitle(menuTitles[selectedIndex] || '');
        setLegend(selectedIndex);
    }, [selectedIndex, setLegend, setMenuTitle])
    
    
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
        fontSize: '12px',
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
        setLegend(index);
        setActiveStat(index);

        if (index == 1){
            setRFVisibility(true);
        }else if (index == 2 ){
            setFFGSLayerVisibility(true);
        } else if ( index ==  3 ){
            setCDILayerVisibility(true);
        } else if (index == 5){
            setRainfallObsVisibility(true);
        } else if ( index == 6 ) {
            setReservoirVisibility(true);
        }
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
                        <RiverForecast />
                    </div>
                );
            case 2:
                return (
                    <div style={menuContentStyle}>
                        <FlashFloodGuidance />
                    </div>
                );
            case 3:
                return (
                    <div style={menuContentStyle}>
                        <DatePanel />
                        <DroughtForecast />
                    </div>
                );
            case 4:
                return (
                    <div style={menuContentStyle}>
                        
                    </div>
                );
            case 5:
                return (
                    <div style={menuContentStyle}>
                        <RainfallObservation />
                    </div>
                );
            case 6:
                return (
                    <div style={menuContentStyle}>
                        <SupportingTools />
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