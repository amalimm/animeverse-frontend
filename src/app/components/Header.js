'use client';

import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Home, Notifications, Search, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Header = () => {
    const router = useRouter();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                color: '#000000',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                py: 1
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Left Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="home"
                            onClick={() => router.push('/')}
                            sx={{
                                color: 'primary.main',
                                backgroundColor: 'grey.200',
                                '&:hover': {
                                    backgroundColor: 'grey.300'
                                }
                            }}
                        >
                            <Home />
                        </IconButton>
                    </motion.div>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        AnimeVerse
                    </Typography>
                </Box>

                {/* Center Search - Hidden on mobile */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexGrow: 0.4,
                    maxWidth: 600
                }}>
                    <motion.div whileHover={{ scale: 1.01 }} style={{ width: '100%' }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            width: '100%'
                        }}>
                            <Search sx={{ color: 'text.secondary', mr: 1 }} />
                            <input
                                type="text"
                                placeholder="Search anime..."
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    outline: 'none',
                                    padding: '8px 0',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </Box>
                    </motion.div>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton color="inherit" sx={{ color: 'text.secondary' }}>
                            <Badge badgeContent={3} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <IconButton color="inherit" sx={{ color: 'text.secondary' }}>
                            <Favorite />
                        </IconButton>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Avatar
                            alt="User Avatar"
                            src="/default-avatar.jpg"
                            sx={{
                                width: 36,
                                height: 36,
                                cursor: 'pointer',
                                border: '2px solid rgba(236, 72, 153, 0.3)'
                            }}
                            onClick={() => router.push('/profile')}
                        />
                    </motion.div>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;