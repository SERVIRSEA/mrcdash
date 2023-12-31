import axios from 'axios';

export const GeoserverFetcher = async (params, endpoint) => {
    try {
        let url;
        if (endpoint) {
            url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/${endpoint}`;
        }  else {
            url = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}/`;
        }
        
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        throw error; 
    }
}