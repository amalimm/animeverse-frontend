import axios from "axios";

export function useAnime() {

    /**
     *  The returned response.data will contain 2 objects:
     *  1. data (array of anime data)
     *  2. pagination (object containing pagination information)
     */

    const index = async (rowPerPage = 10, currentPage = 1) => {
        const params = {
            rowPerPage,
            page: currentPage,
        };
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/anime`, params);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        index,
    };
}

