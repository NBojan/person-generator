import { useCallback ,useEffect, useState } from "react";

const useFetch = (url,invoker) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    const fetching = useCallback(async (forAbort) => {
        setLoading(true);
        const response = await fetch(url, forAbort);
        if(!response.ok){
            throw new Error("Something went wrong");
        }
        const data = await response.json();
        return data;
    }, [url])

    useEffect(() => {
        const abortCtrl = new AbortController();
        fetching({signal: abortCtrl.signal})
        .then(data => {
            setData(data);
            setLoading(false);
            setErr(false);
        })
        .catch(err => {
            if(err.name !== "AbortError"){
                setErr(err.message);
                setLoading(false);
            }
        })

        return () => abortCtrl.abort();
        // eslint-disable-next-line
    }, [url, invoker])

    return {data, loading, err};
}
 
export default useFetch;