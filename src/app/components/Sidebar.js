'use client';

import { useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { navigations } from '@/data/navigations';
import toast from 'react-hot-toast';

const drawerWidth = 240;

const Sidebar = () => {
    const router = useRouter();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#f9fafb',
                    borderRight: '1px solid #e0e0e0'
                },
            }}
        >
            <Toolbar />
            <List>
                {navigations.map((nav, index) => (
                    <ListItem key={index} disablePadding>
                        {/* <ListItemButton onClick={() => toast(nav.url)}> */}
                        <ListItemButton onClick={() => router.push(nav.url)}>
                            <ListItemIcon>{nav.icon}</ListItemIcon>
                            <ListItemText primary={nav.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;

