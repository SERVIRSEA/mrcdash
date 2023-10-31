import axios from 'axios';

export const reservoirDataFetcher = async (params) => {
    try {
        const apiInstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api',
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY,
            },
        });

        const response = await apiInstance.get('/data/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
