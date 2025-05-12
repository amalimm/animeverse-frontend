'use client'

import DataGrid from "@/app/components/DataGrid";
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
            per_page: 10
        }
    });

    const [filterScore, setFilterScore] = useState(null);
    const [filterGenres, setFilterGenres] = useState(null);
    const [filterOrderBy, setFilterOrderBy] = useState('popularity');
    const [filterSort, setFilterSort] = useState('desc');

    const fetchData = async () => {
        loading.show();
        const data = await index({
            rowPerPage: pagination.items.per_page,
            currentPage: pagination.current_page,
            score: filterScore,
            genres: filterGenres,
            order_by: filterOrderBy,
            sort: filterSort
        });
        setDatas(data?.data || []);
        setPagination(data?.pagination || pagination);
        loading.hide();
    };

    const handleChangePage = (newPage) => {
        setPagination((prev) => ({
            ...prev,
            current_page: newPage,
        }));
    };

    const handleChangeRowsPerPage = (newPerPage) => {
        setPagination((prev) => ({
            ...prev,
            items: {
                ...prev.items,
                per_page: newPerPage
            }
        }));
    };

    useEffect(() => {
        fetchData();
    }, [pagination.current_page, pagination.items.per_page, filterScore, filterGenres, filterOrderBy, filterSort]);

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
            data={datas}
            pagination={pagination}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            // onFilterChange={(newFilters) => {
            //     setFilterScore(newFilters.score);
            //     setFilterGenres(newFilters.genres);
            //     setFilterOrderBy(newFilters.order_by);
            //     setFilterSort(newFilters.sort);
            // }}
        />
    );
}

