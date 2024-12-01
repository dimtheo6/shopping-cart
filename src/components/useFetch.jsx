import { useState, useEffect } from "react";


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
    .then((response)=>{
        if (response.status >= 400){
            throw new Error('server error');
        }
        return response.json();
    })
        .then((response)=> setData(response.results))
        .catch((error)=> console.error(error))
        .finally(()=>setLoading(false))

  }, [url]);

  return { data, loading, error };
};

export default useFetch;