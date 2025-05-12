'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box, Typography, Avatar } from '@mui/material';
import { navigations } from '@/data/navigations';
import { motion } from 'framer-motion';
import { FiCompass } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const drawerWidth = 280;

const Sidebar = () => {

    const router = useRouter();
    const pathName = usePathname();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        router.push(navigations[index].url);
    };

    useEffect(() => {
        if(!selectedIndex) {
            const index = navigations.findIndex(item => item.url === pathName);
            setSelectedIndex(index);
        }
    }, [router]);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(8px)',
                    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                    '& .MuiListItemIcon-root': {
                        minWidth: '40px'
                    }
                },
            }}
        >
            <Toolbar sx={{ minHeight: '80px !important' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        paddingLeft: 2,
                        cursor: 'pointer'
                    }}
                    onClick={() => router.push('/')}
                >
                    <Box sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <FiCompass size={20} />
                    </Box>
                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        AnimeVerse
                    </Typography>
                </Box>
            </Toolbar>

            <Box sx={{ overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Main Navigation */}
                <List sx={{ flex: 1 }}>
                    {navigations.map((nav, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ListItem disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    selected={selectedIndex === index}
                                    onClick={() => handleListItemClick(index)}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        borderRadius: 1,
                                        mx: 1.5,
                                        my: 0.5,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(236, 72, 153, 0.1)',
                                            color: '#ec4899',
                                            '& .MuiListItemIcon-root': {
                                                color: '#ec4899'
                                            }
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'text.secondary' }}>
                                        {nav.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={nav.text}
                                        primaryTypographyProps={{
                                            fontWeight: 500,
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </motion.div>
                    ))}
                </List>
            </Box>

            {/* User Profile Section */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <motion.div whileHover={{ scale: 1.02 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1,
                        borderRadius: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                    }}>
                        <Avatar
                            alt="User"
                            src="/default-avatar.jpg"
                            sx={{
                                width: 36,
                                height: 36,
                                border: '2px solid rgba(236, 72, 153, 0.3)'
                            }}
                        />
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Anime Fan
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Premium Member
                            </Typography>
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
