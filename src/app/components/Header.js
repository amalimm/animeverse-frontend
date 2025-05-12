'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Home } from '@mui/icons-material';

const Header = () => {

    const router = useRouter();

    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: '#ffffff',
                color: '#000000',
                borderBottom: '1px solid #e0e0e0'
            }}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => router.push('/')}>
                    <Home />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Anime Dashboard
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Welcome back!
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

