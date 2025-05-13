'use client'

import DataGridEntry from "@/app/components/DataGridEntry";
import { loading } from "@/app/components/Loading";
import { useRecommmendation } from "@/app/hooks/useRecommendation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecommendationPage() {

    const router = useRouter();
    const { index } = useRecommmendation();

    const [datas, setDatas] = useState([]);
    const [pagination, setPagination] = useState({
        last_visible_page: 0,
        has_next_page: false,
        current_page: 1,
    });

    const fetchData = async () => {
        loading.show();
        if (!pagination.has_next_page) {
            const data = await index({
                currentPage: pagination.current_page,
            });
            setDatas(data?.data || []);
            setPagination(data?.pagination || pagination);
        };
        loading.hide();
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current_page]);

    if (datas.length === 0) {
        return (
            <div className="text-center p-4">
                <h2 className="text-2xl font-bold">No recommendations available</h2>
                <p>Try searching for anime or checking your internet connection.</p>
            </div>
        );
    }

    return (
        <DataGridEntry
            datas={datas}
            pagination={pagination}
            onPageChange={(page) => {
                setPagination(prev => ({ ...prev, current_page: page }))
            }}
            onSelectedData={(id) => router.push(`/anime/view?id=${id}`)}
            has_next_page={!pagination.has_next_page}
        />
    );
}

