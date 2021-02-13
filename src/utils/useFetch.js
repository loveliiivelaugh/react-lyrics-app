import { useEffect, useState } from 'react';
    
export default function useFetchLyrics(url, key) {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function loadData() {
            const response = await fetch(url, {
                headers: {
                    'Guitarparty-Api-Key': key
                }
            });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setData(posts.objects[0].body);
        }
    
        loadData();
    }, [url]);
    return data;
}