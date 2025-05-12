'use client'

import DataGrid from "@/app/components/DataGrid";
import { loading } from "@/app/components/Loading";
import { useAnime } from "@/app/hooks/useAnime";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SummaryPage() {

    const router = useRouter();
    const { index } = useAnime();

    const [datas, setDatas] = useState([]);
    const [pagination, setPagination] = useState({
        last_visible_page: 0,
        has_next_page: false,
        current_page: 1,
        items: {
            count: 0,
            total: 0,
            per_page: 10
        }
    });

    const [filterQ, setFilterQ] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterScore, setFilterScore] = useState(null);
    const [filterGenres, setFilterGenres] = useState(null);
    const [filterOrderBy, setFilterOrderBy] = useState('popularity');
    const [filterSort, setFilterSort] = useState('desc');

    const fetchData = async () => {
        const data = await index({
            rowPerPage: pagination.items.per_page,
            currentPage: pagination.current_page,
            page: pagination.current_page,
            // unapproved: false,
            q: filterQ,
            type: filterType,
            score: filterScore,
            min_score: '',
            max_score: '',
            status: '',
            rating: '',
            sfw: true,
            genres: filterGenres,
            genres_exclude: '',
            order_by: filterOrderBy,
            sort: filterSort,
            start_date: '',
            end_date: ''
        });
        setDatas(data?.data || []);
        setPagination(data?.pagination || pagination);
    };

    const handleSelectedData = (id) => {
        router.push(`/anime/${id}`);
    };

    const debouncedFetchData = useMemo(() =>
        debounce(() => {
            fetchData()
        }, 500), [filterQ]
    );

    useEffect(() => {
        loading.show();
        fetchData();
        loading.hide();
    }, [pagination.current_page, pagination.items.per_page, filterType]);

    useEffect(() => {
        debouncedFetchData()
        return () => {
            debouncedFetchData.cancel()
        }
    }, [debouncedFetchData])


    if (datas.length === 0) {
        return (
            <div className="text-center p-4">
                <h2 className="text-2xl font-bold">No data available</h2>
                <p>Try searching for anime or checking your internet connection.</p>
            </div>
        );
    }

    return (
        <DataGrid
            datas={datas}
            pagination={pagination}
            onPageChange={(page) => {
                setPagination(prev => ({ ...prev, current_page: page }))
            }}
            onRowsPerPageChange={(perPage) => {
                setPagination(prev => ({ ...prev, items: { ...prev.items, per_page: perPage }, current_page: 1 }))
            }}
            filters={{
                q: filterQ,
                type: filterType,
                // score: filterScore,
                // genres: filterGenres,
                // order_by: filterOrderBy,
                // sort: filterSort
            }}
            onFilterChange={(newFilters) => {
                setFilterQ(newFilters.q)
                setFilterType(newFilters.type)
                // setFilterScore(newFilters.score)
                // setFilterGenres(newFilters.genres)
                // setFilterOrderBy(newFilters.order_by)
                // setFilterSort(newFilters.sort)
                // setPagination(prev => ({ ...prev, current_page: 1 }))
            }}
            onSelectedData={(data) => {
                handleSelectedData(data)
            }}
        />
    );
}

