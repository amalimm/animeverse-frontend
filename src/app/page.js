'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'

export default function Home() {
    const router = useRouter()

    const handleNavigate = () => {
        router.push('/dashboard/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full text-center border border-white border-opacity-30"
            >
                <div className="mb-8">
                    <motion.h1 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl sm:text-6xl font-bold text-white mb-4"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-pink-400">
                            Anime Searcher
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg sm:text-xl text-white text-opacity-80 mb-8"
                    >
                        Discover your next favorite anime with our beautiful, intuitive dashboard.
                    </motion.p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleNavigate}
                        sx={{
                            background: 'linear-gradient(45deg, #f472b6 0%, #d946ef 100%)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            padding: '12px 32px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 14px rgba(216, 70, 239, 0.4)',
                            textTransform: 'none',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #d946ef 0%, #a855f7 100%)',
                                boxShadow: '0 6px 20px rgba(216, 70, 239, 0.6)'
                            }
                        }}
                    >
                        Explore Dashboard
                    </Button>
                </motion.div>

                <motion.div 
                    className="mt-12 text-white text-opacity-60 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Built with Next.js, Tailwind CSS, and MUI
                </motion.div>
            </motion.div>
        </div>
    )
}