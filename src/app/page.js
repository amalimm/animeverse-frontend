'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { motion } from 'framer-motion'
import { FiSearch, FiTrendingUp, FiHeart, FiAward, FiPlay } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Home() {
    const router = useRouter()

    const handleNavigate = () => {
        toast.success('Welcome to AnimeVerse!')
        router.push('/anime')
    }

    const features = [
        {
            icon: <FiSearch className="text-2xl text-pink-500" />,
            title: "Discover",
            description: "Find new anime with advanced search and recommendations"
        },
        {
            icon: <FiTrendingUp className="text-2xl text-purple-500" />,
            title: "Trending",
            description: "See what's popular in the anime community right now"
        },
        {
            icon: <FiHeart className="text-2xl text-red-500" />,
            title: "Favorites",
            description: "Save and organize your favorite shows"
        },
        {
            icon: <FiAward className="text-2xl text-amber-500" />,
            title: "Ratings",
            description: "View detailed ratings and reviews"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8 order-2 lg:order-1">
                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                                        AnimeVerse
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 max-w-lg">
                                    Your gateway to the vibrant world of anime. Discover, track, and fall in love with your next favorite show.
                                </p>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex gap-4 pt-2"
                            >
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-pink-600">10K+</div>
                                    <div className="text-sm text-gray-500">Anime Titles</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">1M+</div>
                                    <div className="text-sm text-gray-500">Community</div>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="pt-4"
                            >
                                <Button
                                    fullWidth
                                    size="large"
                                    onClick={handleNavigate}
                                    startIcon={<FiPlay />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #ec4899 0%, #8b5cf6 100%)',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        padding: '14px 0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)',
                                        textTransform: 'none',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #db2777 0%, #7c3aed 100%)',
                                            boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)'
                                        }
                                    }}
                                >
                                    Start Exploring
                                </Button>
                            </motion.div>
                            
                            {/* Footer Note */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-16 text-center text-gray-400 text-sm"
                            >
                                <p>Join millions of anime fans in our growing community</p>
                                <p className="mt-1">Powered by Next.js, Tailwind CSS, and MUI</p>
                            </motion.div>
                        </div>

                        {/* Right Column - Anime Illustration */}
                        <motion.div
                            initial={{ x: 50 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative order-1 lg:order-2"
                        >
                            <div className="relative w-full">
                                <div className="absolute -right-6 -top-6 w-full h-full rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100"></div>
                                <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                                    <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl flex flex-col items-center justify-center">
                                        <div className="text-center p-6">
                                            <div className="text-6xl mb-4">🌸</div>
                                            <h3 className="text-2xl font-bold text-gray-800">Your Anime Journey</h3>
                                            <p className="text-pink-500 mt-2">Awaits You</p>
                                        </div>

                                        <div className='p-6'>
                                            {/* Features */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="grid grid-cols-2 gap-4"
                                            >
                                                {features.map((feature, index) => (
                                                    <motion.div
                                                        key={index}
                                                        whileHover={{ y: -4 }}
                                                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="mb-2">{feature.icon}</div>
                                                        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                                                        <p className="text-sm text-gray-500">{feature.description}</p>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}