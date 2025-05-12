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
        score = '',
        min_score = '',
        max_score = '',
        status = '',
        rating = '',
        sfw = true,
        genres = '',
        genres_exclude = '',
        order_by = 'popularity',  // default sorting by popularity
        sort = 'desc',           // default sorting descending
        start_date = '',
        end_date = '',
    }) => {
        const params = {
            page: currentPage,
            limit: rowPerPage,
            unapproved,
            q,
            type,
            score,
            min_score,
            max_score,
            status,
            rating,
            sfw,
            genres,
            genres_exclude,
            order_by,
            sort,
            start_date,
            end_date
        };

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/anime`, {
                params: params, // Passing all query params to the API
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
