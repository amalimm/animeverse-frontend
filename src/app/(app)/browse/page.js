'use client'

import { loading } from "@/app/components/Loading";
import { useAnime } from "@/app/hooks/useAnime";
import { useEffect, useState } from "react";

export default function SummaryPage() {

    const { index } = useAnime();

    const [datas, setDatas] = useState([]);
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState({
        last_visible_page: 0,
        has_next_page: false,
        current_page: 1,
        items: {
            count: 0,
            total: 0,
            per_page: 25
        }
    });

    const fetchData = async () => {
        loading.show();
        const data = await index();
        setDatas(data?.data || []);
        setPagination(data?.pagination || pagination);
        loading.hide();
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (datas.length === 0) {
        return (
            <div className="text-center p-4">
                <h2 className="text-2xl font-bold">No data available</h2>
                <p>Try searching for anime or checking your internet connection.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {datas.map((data, index) => (
                <div key={data.mal_id || index} className="bg-white p-4 rounded-lg shadow-md">
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={data.images?.jpg?.image_url}
                            alt={data.title}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                    </a>
                    <h2 className="text-lg font-bold">{data.title}</h2>
                    <p>{data.description || "No description available"}</p>
                    <p>Score: {data.score || "N/A"}</p>
                </div>
            ))}
        </div>
    );
}

