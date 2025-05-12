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
            per_page: 25
        }
    });

    const [filterRowPerPage, setFilterRowPerPage] = useState(pagination.items.per_page);
    const [filterScore, setFilterScore] = useState(null);
    const [filterGenres, setFilterGenres] = useState(null);
    const [filterOrderBy, setFilterOrderBy] = useState('popularity');
    const [filterSort, setFilterSort] = useState('desc');

    const fetchData = async () => {
        const data = await index({
            rowPerPage: filterRowPerPage,
            currentPage: pagination.current_page,
            score: filterScore,
            genres: filterGenres,
            order_by: filterOrderBy,
            sort: filterSort
        });
        setDatas(data?.data || []);
        setPagination(data?.pagination || pagination);
    };

    const handleChangePage = (event, newPage) => {
        setPagination((prev) => ({
            ...prev,
            current_page: newPage + 1,
        }));
    };

    const handleChangeRowsPerPage = (event) => {
        setPagination((prev) => ({
            ...prev,
            items: { ...prev.items, per_page: parseInt(event.target.value, 10) },
            current_page: 1,
        }));
    };

    useEffect(() => {
        fetchData();
    }, [filterRowPerPage, filterScore, filterGenres, filterOrderBy, filterSort]);

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
            onPageChange={(newPage) => fetchData(newPage)}
            onRowsPerPageChange={(newPerPage) => setFilterRowPerPage(newPerPage)}
            // onFilterChange={(newFilters) => {
            //     setFilterScore(newFilters.score);
            //     setFilterGenres(newFilters.genres);
            //     setFilterOrderBy(newFilters.order_by);
            //     setFilterSort(newFilters.sort);
            // }}
        />
    );
}

