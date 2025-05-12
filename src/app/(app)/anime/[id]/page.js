'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { loading } from '@/app/components/Loading'; // Adjust the import path if needed
import { useAnime } from '@/app/hooks/useAnime';

export default function AnimeDetailPage() {
    const params = useParams();
    const { id } = params;

    const { show } = useAnime();

    const [anime, setAnime] = useState(null);
    const [error, setError] = useState(null);

    const fetchAnimeDetail = async () => {
        loading.show();
        try {
            const response = await show(id);
            setAnime(response.data.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load anime details.');
        } finally {
            loading.hide();
        }
    };

    useEffect(() => {
        if (id) {
            fetchAnimeDetail();
        }
    }, [id]);

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                <h2 className="text-xl font-bold">{error}</h2>
            </div>
        );
    }

    if (!anime) return null; // loading is shown via overlay

    return (
        <div className="max-w-4xl mx-auto p-6 text-black">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={anime.images?.jpg?.large_image_url || '/fallback.jpg'}
                    alt={anime.title}
                    className="w-full md:w-64 rounded-xl shadow-lg"
                />
                <div>
                    <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
                    <p className="mb-4 text-gray-700">{anime.synopsis || 'No description available.'}</p>
                    <p><strong>Score:</strong> {anime.score ?? 'N/A'}</p>
                    <p><strong>Status:</strong> {anime.status ?? 'Unknown'}</p>
                    <p><strong>Episodes:</strong> {anime.episodes ?? 'Unknown'}</p>
                    <p><strong>Rating:</strong> {anime.rating ?? 'Unknown'}</p>
                </div>
            </div>
        </div>
    );
}
