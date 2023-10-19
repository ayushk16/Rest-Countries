import { useState, useEffect } from 'react'

function useCountry(id) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        // console.log("inside effect");
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/alpha/${id}`)
            .then(res => res.json())
            .then(resData => setData(resData[0]))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [id])
    // console.log("outSide effect")
    // console.log(data);
    return ({ data, loading, error });
}

export default useCountry

