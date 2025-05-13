'use client';

import { useEffect, useState } from 'react';
import { useAnime } from '@/app/hooks/useAnime';
import { loading } from '@/app/components/Loading';
import { FiStar, FiUsers, FiAward, FiCalendar, FiClock, FiTv, FiPlay, FiHeart, FiShare2, FiChevronLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AnimeDetailPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); const { show } = useAnime();

    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);

    const fetchAnimeDetail = async () => {
        loading.show();
        try {
            const data = await show(id);
            setAnime(data.data);
        } catch (err) {
            setError('Failed to fetch anime details');
        } finally {
            loading.hide();
        }
    };

    useEffect(() => {
        if (id) fetchAnimeDetail();
    }, [id]);

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                <h2 className="text-xl font-bold">{error}</h2>
            </div>
        );
    }

    if (!anime) return null;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6">
            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
                {/* Header with Cover Image */}
                <div
                    className={`relative h-48 md:h-64 ${!anime.images?.jpg?.large_image_url
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-white'
                        }`}
                >
                    {anime.images?.jpg?.large_image_url && (
                        <img
                            src={anime.images.jpg.large_image_url}
                            alt={anime.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{anime.title}</h1>
                        <p className="text-gray-200">{anime.title_japanese}</p>
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Poster and Stats */}
                    <div className="lg:col-span-1">
                        <div className="flex flex-col items-center">
                            <img
                                src={anime.images?.jpg?.large_image_url || '/fallback.jpg'}
                                alt={anime.title}
                                className="w-48 h-64 md:w-56 md:h-80 rounded-xl shadow-lg object-cover border-4 border-white"
                            />

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 w-full mt-6">
                                <StatCard
                                    icon={<FiStar className="text-yellow-500" />}
                                    label="Score"
                                    value={anime.score ? `${anime.score} (${anime.scored_by?.toLocaleString() || 0} users)` : 'N/A'}
                                />
                                <StatCard
                                    icon={<FiAward className="text-purple-500" />}
                                    label="Ranked"
                                    value={anime.rank ? `#${anime.rank}` : 'N/A'}
                                />
                                <StatCard
                                    icon={<FiUsers className="text-blue-500" />}
                                    label="Popularity"
                                    value={anime.popularity ? `#${anime.popularity}` : 'N/A'}
                                />
                                <StatCard
                                    icon={<FiUsers className="text-green-500" />}
                                    label="Members"
                                    value={anime.members?.toLocaleString() || 'N/A'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Synopsis */}
                        <div>
                            <h2 className="text-xl font-bold mb-3 text-gray-800">Synopsis</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {anime.synopsis || 'No synopsis available.'}
                            </p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem
                                icon={<FiTv />}
                                label="Type"
                                value={anime.type || 'Unknown'}
                            />
                            <InfoItem
                                icon={<FiCalendar />}
                                label="Aired"
                                value={anime.aired?.string || 'Unknown'}
                            />
                            <InfoItem
                                icon={<FiClock />}
                                label="Duration"
                                value={anime.duration || 'Unknown'}
                            />
                            <InfoItem
                                icon={<FiStar />}
                                label="Rating"
                                value={anime.rating || 'Unknown'}
                            />
                            <InfoItem
                                label="Episodes"
                                value={anime.episodes || 'Unknown'}
                            />
                            <InfoItem
                                label="Status"
                                value={anime.status || 'Unknown'}
                            />
                            <InfoItem
                                label="Source"
                                value={anime.source || 'Unknown'}
                            />
                            <InfoItem
                                label="Studios"
                                value={anime.studios?.map(s => s.name).join(', ') || 'Unknown'}
                            />
                        </div>

                        {/* Genres */}
                        {anime.genres?.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.genres.map(genre => (
                                        <span
                                            key={genre.mal_id}
                                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Watch Now Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 flex flex-col sm:flex-row gap-4"
                        >
                            {/* Back Button */}
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.push('/anime')}
                                className="flex items-center justify-center min-w-[100px] gap-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:cursor-pointer text-purple-500"
                            >
                                <FiChevronLeft className="text-lg" />
                                Back
                            </motion.button>

                            {/* Main Watch Button */}
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                href={anime.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl px-6 py-3 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <FiPlay className="text-lg" />
                                Watch Now
                            </motion.a>

                            {/* Secondary Buttons */}
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:cursor-pointer"
                                    aria-label="Add to favorites"
                                >
                                    <FiHeart className="text-pink-500" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:cursor-pointer"
                                    aria-label="Share"
                                >
                                    <FiShare2 className="text-blue-500" />
                                </motion.button>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.div>

            {/* Alternative Titles */}
            {anime.title_synonyms?.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 bg-white rounded-2xl shadow-lg p-6"
                >
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Alternative Titles</h2>
                    <ul className="space-y-1 text-gray-600">
                        {anime.title_synonyms.map((title, index) => (
                            <li key={index}>• {title}</li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-gray-50 rounded-lg p-3 text-center"
        >
            <div className="flex justify-center text-2xl mb-1">{icon}</div>
            <div className="font-bold text-gray-800">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </motion.div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            {icon && <div className="text-gray-500 mt-1">{icon}</div>}
            <div>
                <div className="font-semibold text-gray-700">{label}</div>
                <div className="text-gray-600">{value}</div>
            </div>
        </div>
    );
}