'use client'

import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import { Tooltip } from '@mui/material'

export default function DataGrid({
    datas = [],
    pagination,
    onPageChange,
    onRowsPerPageChange,
    filters = {},
    onFilterChange,
    onSelectedData
}) {
    const handleChangePage = (_event, newPage) => {
        onPageChange(newPage + 1) // MUI: 0-indexed → API: 1-indexed
    }

    const handleChangeRowsPerPage = (event) => {
        const newPerPage = parseInt(event.target.value, 10)
        onRowsPerPageChange(newPerPage)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        onFilterChange?.({
            ...filters,
            [name]: value
        })
    }

    const handleSelectedData = (id) => {
        onSelectedData?.(id)
    }

    return (
        <div className="flex flex-col items-center text-black p-6">

            <div className="w-full flex flex-wrap gap-4 justify-start mb-6">
                <select
                    name="score"
                    value={filters.score || ''}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                >
                    <option value="">All Scores</option>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}+</option>
                    ))}
                </select>

                <select
                    name="genres"
                    value={filters.genres || ''}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                >
                    <option value="">All Genres</option>
                    <option value="1">Action</option>
                    <option value="2">Adventure</option>
                    <option value="4">Comedy</option>
                    {/* Add more genre IDs as needed */}
                </select>

                <select
                    name="order_by"
                    value={filters.order_by || ''}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                >
                    <option value="">Order By</option>
                    <option value="score">Score</option>
                    <option value="popularity">Popularity</option>
                    <option value="favorites">Favorites</option>
                </select>

                <select
                    name="sort"
                    value={filters.sort || ''}
                    onChange={handleFilterChange}
                    className="border rounded p-2"
                >
                    <option value="">Sort</option>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

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
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:cursor-pointer hover:bg-gray-100 hover:scale-103 transition duration-100 ease-in-out border-2 border-gray-200 hover:border-gray-500"
                            onClick={() => handleSelectedData(data?.mal_id)}
                        >
                            {/* <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            > */}
                                <img
                                    src={data.images?.jpg?.image_url || '/fallback.jpg'}
                                    alt={data.title}
                                    className="w-full h-80 object-cover"
                                />
                            {/* </a> */}
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

