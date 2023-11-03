import axios from 'axios';

export const FFGSFetcher = async (action, params) => {
    try {
        if (typeof action !== 'string') {
            throw new Error('Action must be a string');
        }
    
        const fullParams = {
            action: action,
            ...params
        };

        const baseURL = process.env.NEXT_PUBLIC_FFGS_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_FFGS_API_KEY; 

        if (!baseURL) {
            throw new Error('Base URL is not defined in environment variables');
        }

        if (!apiKey) {
            throw new Error('API Key is not defined in environment variables');
        }

        // Construct the headers object with the API key
        const headers = {
            'Authorization': `${apiKey}` 
        };

        // Await the axios GET request with the headers included and return the data
        const response = await axios.get(baseURL, { 
            params: fullParams,
            headers: headers 
        });

        // Optional: Check for non-200 status responses
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return response.data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

