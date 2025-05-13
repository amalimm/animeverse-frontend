'use client'

import React from 'react'
import {
    TablePagination,
    Tooltip,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box
} from '@mui/material'

const animeTypes = [
    'tv',
    'movie',
    'ova',
    'special',
    'ona',
    'music',
    'cm',
    'pv',
    'tv_special'
];

const orderByOptions = [
    'mal_id',
    'title',
    'start_date',
    'end_date',
    'episodes',
    'score',
    'scored_by',
    'rank',
    'popularity',
    'members',
    'favorites'
];

const sortOptions = ['asc', 'desc'];

const rating = [
    'g',
    'pg',
    'pg13',
    'r17',
    'r',
    'rx'
];

export default function DataGridEntry({
    datas = [],
    pagination = {
        last_visible_page: 0,
        has_next_page: false,
        current_page: 1,
        items: {
            count: 0,
            total: 0,
            per_page: 10
        }
    },
    onPageChange = () => { },
    onRowsPerPageChange = () => { },
    filters = {
        type: '',
        order_by: 'popularity',
        sort: 'desc',
        q: '',
        rating: ''
    },
    onFilterChange = () => { },
    onSelectedData = () => { },
    
    has_next_page = true
}) {
    const handleChangePage = (_event, newPage) => onPageChange(newPage + 1)
    const handleChangeRowsPerPage = (event) => onRowsPerPageChange(parseInt(event.target.value, 10))

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        console.log(`Filter changed: ${name} = ${value}`)
        onFilterChange?.({ ...filters, [name]: value })
    }

    const handleSelectedData = (id) => onSelectedData?.(id)

    return (
        <div className="flex flex-col items-center text-black p-6">

            {/* DATA CARDS */}
            {(!datas || datas.length === 0) ? (
                <div className="text-center p-6">
                    <h2 className="text-2xl font-semibold">No anime found</h2>
                    <p className="text-gray-500 mt-2">Try a different category or check your connection.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 min-h-[400px]">
                    {datas.map((data, index) => (

                        <React.Fragment key={index}>
                            {data.entry?.map((anime, subIndex) => (
                                <div
                                    key={subIndex}
                                    onClick={() => handleSelectedData(anime.mal_id)}
                                    className="bg-white rounded-xl shadow-md overflow-hidden hover:cursor-pointer hover:bg-gray-100 hover:scale-103 transition duration-100 ease-in-out border-2 border-gray-200 hover:border-gray-500"
                                >
                                    <img
                                        src={anime.images?.jpg?.image_url || '/fallback.jpg'}
                                        alt={anime.title}
                                        className="w-full h-80 object-cover"
                                    />
                                    <div className="p-4">
                                        <Tooltip title={anime.title}>
                                            <h3 className="text-sm font-bold mb-2 line-clamp-1 hover:underline">{anime.title}</h3>
                                        </Tooltip>
                                        <p className="text-sm text-gray-600 mb-1 line-clamp-3">
                                            {anime.synopsis || 'No description.'}
                                        </p>
                                        <p className="text-sm text-gray-800 font-medium">
                                            Score: {anime.score ?? 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}

                </div>
            )}

            {/* PAGINATION */}
            {/* <TablePagination
                component="div"
                count={pagination.items?.total || 0}
                page={pagination.current_page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pagination.items?.per_page || 25}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                disabled={!has_next_page ?? false}
            /> */}
        </div>
    )
}
