'use client'

import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import { Tooltip } from '@mui/material'

export default function DataGrid({
    data = [],
    pagination,
    onPageChange,
    onRowsPerPageChange
}) {
    const handleChangePage = (_event, newPage) => {
        onPageChange(newPage + 1) // MUI is 0-indexed, API is 1-indexed
    }

    const handleChangeRowsPerPage = (event) => {
        const newPerPage = parseInt(event.target.value, 10)
        onRowsPerPageChange(newPerPage)
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center p-6">
                <h2 className="text-2xl font-semibold">No anime found</h2>
                <p className="text-gray-500 mt-2">Try a different category or check your connection.</p>
            </div>
        )
    }

    return (
        <div className="text-black p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                {data.map((anime, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:cursor-pointer hover:bg-gray-100 hover:scale-103 transition duration-100 ease-in-out border-2 border-gray-200 hover:border-gray-500">
                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                            <img
                                src={anime.images?.jpg?.image_url || '/fallback.jpg'}
                                alt={anime.title}
                                className="w-full h-64 object-cover"
                            />
                        </a>
                        <div className="p-4">
                            <Tooltip title={anime.title}>
                                <h3 className="text-sm font-bold mb-2 text-overflow line-clamp-1 hover:text-underline">{anime.title}</h3>
                            </Tooltip>
                            <p className="text-sm text-gray-600 mb-1 line-clamp-3">{anime.synopsis || 'No description.'}</p>
                            <p className="text-sm text-gray-800 font-medium">Score: {anime.score ?? 'N/A'}</p>
                        </div>
                    </div>
                ))}
            </div>

            <TablePagination
                component="div"
                count={pagination.items?.total || 0}
                page={pagination.current_page - 1} // Convert to 0-indexed
                onPageChange={handleChangePage}
                rowsPerPage={pagination.items?.per_page || 25}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </div>
    )
}
