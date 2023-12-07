import axios from 'axios';

export const reservoirDataFetcher = async (params) => {
    try {
        const apiInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_RAT_API_URL,
            headers: {
                Authorization: process.env.NEXT_PUBLIC_RAT_API_KEY,
            },
        });

        const response = await apiInstance.get('/ratmekong/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
