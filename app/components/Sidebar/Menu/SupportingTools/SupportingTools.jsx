import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const MyList = () => {
    // const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index, url) => {
        // setSelectedIndex(index);
        window.open(url, '_blank');
    };

    return (
        <List sx={{ fontSize: '12px' }}>
            <ListItemButton
                // selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0, 'https://rainstorms-servir.adpc.net/')}
            >
                <ListItemText 
                    primary="Rainstorm Tracker"
                    primaryTypographyProps={{ style: { fontSize: '12px' } }} 
                />
            </ListItemButton>
            <ListItemButton
                // selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1, 'https://xray-servir.adpc.net/home')}
            >
                <ListItemText 
                    primary="Mekong X-Ray"
                    primaryTypographyProps={{ style: { fontSize: '12px' } }}
                />
            </ListItemButton>
            <ListItemButton
                // selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2, 'https://dev-ratmekong-servir.adpc.net/')}
            >
                <ListItemText 
                    primary="RAT-Mekong"
                    primaryTypographyProps={{ style: { fontSize: '12px' } }}
                />
            </ListItemButton>
        </List>
    );
};

export default MyList;
