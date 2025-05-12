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

const animeTypes = ['tv', 'movie', 'ova', 'special', 'ona', 'music', 'cm', 'pv', 'tv_special']
const animeRatings = ['g', 'pg', 'pg13', 'r17', 'r', 'rx']
const orderByOptions = ['score', 'popularity', 'favorites']
const sortOptions = ['asc', 'desc']
const genres = [
    { id: '1', label: 'Action' },
    { id: '2', label: 'Adventure' },
    { id: '4', label: 'Comedy' },
    // Add more genres as needed
]

export default function DataGrid({
    datas = [],
    pagination,
    onPageChange,
    onRowsPerPageChange,
    filters = {},
    onFilterChange,
    onSelectedData
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

            {/* FILTER SECTION */}
            <Box className="w-full flex flex-wrap gap-4 justify-start mb-6">
                <TextField
                    label="Search Anime"
                    name="q"
                    type="text"
                    size="small"
                    value={filters.q || ''}
                    onChange={handleFilterChange}
                />

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={filters?.type || ''}
                        onChange={handleFilterChange}
                        label="Type"
                    >
                        <MenuItem value="">NONE</MenuItem>
                        {animeTypes.map(t => (
                            <MenuItem key={t} value={t}>{t.replace(/_/g, ' ').toUpperCase()}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* <TextField
                    label="Min Score"
                    name="score"
                    type="number"
                    size="small"
                    value={filters.score || ''}
                    onChange={handleFilterChange}
                /> */}

                {/* <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Genres</InputLabel>
                    <Select
                        name="genres"
                        value={filters.genres || ''}
                        onChange={handleFilterChange}
                        label="Genres"
                    >
                        <MenuItem value="">All</MenuItem>
                        {genres.map(g => (
                            <MenuItem key={g.id} value={g.id}>{g.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        name="rating"
                        value={filters.rating || ''}
                        onChange={handleFilterChange}
                        label="Rating"
                    >
                        <MenuItem value="">All</MenuItem>
                        {animeRatings.map(r => (
                            <MenuItem key={r} value={r}>{r.toUpperCase()}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Order By</InputLabel>
                    <Select
                        name="order_by"
                        value={filters.order_by || ''}
                        onChange={handleFilterChange}
                        label="Order By"
                    >
                        <MenuItem value="">Default</MenuItem>
                        {orderByOptions.map(o => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel>Sort</InputLabel>
                    <Select
                        name="sort"
                        value={filters.sort || ''}
                        onChange={handleFilterChange}
                        label="Sort"
                    >
                        <MenuItem value="">None</MenuItem>
                        {sortOptions.map(s => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                </FormControl> */}
            </Box>

            {/* DATA CARDS */}
            {(!datas || datas.length === 0) ? (
                <div className="text-center p-6">
                    <h2 className="text-2xl font-semibold">No anime found</h2>
                    <p className="text-gray-500 mt-2">Try a different category or check your connection.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 min-h-[400px]">
                    {datas.map((data, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelectedData(data?.mal_id)}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:cursor-pointer hover:bg-gray-100 hover:scale-103 transition duration-100 ease-in-out border-2 border-gray-200 hover:border-gray-500"
                        >
                            <img
                                src={data.images?.jpg?.image_url || '/fallback.jpg'}
                                alt={data.title}
                                className="w-full h-80 object-cover"
                            />
                            <div className="p-4">
                                <Tooltip title={data.title}>
                                    <h3 className="text-sm font-bold mb-2 line-clamp-1 hover:underline">{data.title}</h3>
                                </Tooltip>
                                <p className="text-sm text-gray-600 mb-1 line-clamp-3">{data.synopsis || 'No description.'}</p>
                                <p className="text-sm text-gray-800 font-medium">Score: {data.score ?? 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            <TablePagination
                component="div"
                count={pagination.items?.total || 0}
                page={pagination.current_page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pagination.items?.per_page || 25}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
            />
        </div>
    )
}
