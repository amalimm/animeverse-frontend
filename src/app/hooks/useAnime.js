import axios from "axios";

export function useAnime() {

    /**
     *  The returned response.data will contain 2 objects:
     *  1. data (array of anime data)
     *  2. pagination (object containing pagination information)
     */

    const index = async ({
        rowPerPage = 10,
        currentPage = 1,
        unapproved = false,
        q = '',
        type = '',
        rating = '',
        order_by = 'popularity',
        sort = 'desc',
    }) => {
        const params = {
            page: currentPage,
            limit: rowPerPage,
            unapproved,
            q,
            type,
            rating,
            order_by,
            sort,
        };

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/anime`, {
                params: params,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const show = async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/anime/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        index,
        show
    };
}
