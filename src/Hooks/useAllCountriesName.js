import { useState, useEffect, useCallback } from 'react'

function useAllCountriesName() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getCountries = useCallback(() => {
        console.log("inside effect");
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/all`)
            .then(res => res.json())
            .then((resData) => {
                let tempObj = {};
                resData.forEach((elem, i) => {
                    tempObj[elem.cca3] = elem.name.common;
                })
                console.log(tempObj);

                setData(tempObj)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])
    useEffect(getCountries, [])
    return ({ data, loading, error });
}

export default useAllCountriesName

