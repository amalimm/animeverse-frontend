'use client'

import DataGrid from "@/app/components/DataGrid";
import { loading } from "@/app/components/Loading";
import { useAnime } from "@/app/hooks/useAnime";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AnimePage() {

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

    const [filterQ, setFilterQ] = useState(null);
    const [filterType, setFilterType] = useState(null);
    const [filterOrderBy, setFilterOrderBy] = useState(null);
    const [filterSort, setFilterSort] = useState(null);
    const [filterRating, setFilterRating] = useState(null);

    const fetchData = async () => {
        loading.show();
        const data = await index({
            rowPerPage: pagination.items.per_page,
            currentPage: pagination.current_page,
            page: pagination.current_page,
            q: filterQ,
            type: filterType,
            rating: filterRating,
            order_by: filterOrderBy,
            sort: filterSort,
        });
        setDatas(data?.data || []);
        setPagination(data?.pagination || pagination);
        loading.hide();
    };

    const handleSelectedData = (id) => {
        router.push(`/anime/view?id=${id}`);
    };

    const debouncedFetchData = useMemo(() =>
        debounce(() => {
            fetchData()
        }, 500), [filterQ]
    );

    useEffect(() => {
        fetchData();
    }, [pagination.current_page, pagination.items.per_page, filterType, filterOrderBy, filterSort, filterRating]);

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
                rating: filterRating,
                order_by: filterOrderBy,
                sort: filterSort
            }}
            onFilterChange={(newFilters) => {
                setFilterQ(newFilters.q)
                setFilterType(newFilters.type)
                setFilterRating(newFilters.rating)
                setFilterOrderBy(newFilters.order_by)
                setFilterSort(newFilters.sort)
            }}
            onSelectedData={(data) => {
                handleSelectedData(data)
            }}
        />
    );
}

