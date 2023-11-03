import React, { useEffect, useState } from "react"
import { FFGSFetcher } from "@/app/components/Fetchers/FFGSFetcher"

export default function FFGSBulletinSummary() {
    const [htmlContent, setContent] = useState("")
    
    useEffect(()=>{
        const fetchBulletinSummaryContent = async () => {
            try {
                const params = {}
                const action = 'get-bulletin-summary';
                const data = await FFGSFetcher(action, params);
                // console.log(data)
                setContent(data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                // setLoading(false);
            }
        }
        fetchBulletinSummaryContent();
    }, [])

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
