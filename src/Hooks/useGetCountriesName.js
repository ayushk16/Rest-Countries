import { useState, useEffect, useCallback } from 'react'
import useAllCountries from './useAllCountries';
function useGetCountriesName() {
    const [countriesMap, setCountriesMap] = useState({});
    const { data, loading, error } = useAllCountries();

    const getMapedCountries = () => {
        data.map((count, i) => {
            console.log(count)
        })
    }
    getMapedCountries();

    return ({ data, loading, error });
}

export default useGetCountriesName

