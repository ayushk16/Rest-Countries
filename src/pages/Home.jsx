import { useEffect, useState, useCallback } from 'react';

import useTheme, { ThemeProvider } from '../context/ThemeContext';

import { SelectionArea, CountryCard, BgBody, Error } from '../components';
import { faL } from '@fortawesome/free-solid-svg-icons';

function Home() {
  // setting state for countries data, loading, error, search value and selected region
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('');
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');

  // custom hook for theme
  const { darkMode } = useTheme();

  // declaring regions and data to display as variables
  let regions = [];
  let dataToDisplay = [];

  // fetching countries data from api and setting it to state
  const fetchCountriesData = () => {
    console.log('updating countries');
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let response = await fetch('https://restcountries.com/v3.1/all', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        setError(false);

        let responseData = await response.json();

        setTimeout(() => {
          setLoading(false);
        }, 700);
        // set countries
        setCountriesData(responseData);

        // setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchCountries();
  };

  useEffect(fetchCountriesData, []);

  // set data to display
  dataToDisplay = [...countriesData];

  // if selectedRegion is not null, filter data to display
  if (selectedRegion !== '') {
    console.log('change function region');
    // console.log(selectedRegion);
    dataToDisplay = [
      ...countriesData.filter((cont) => {
        let countryRegion = cont.region.toLowerCase();
        return countryRegion.includes(selectedRegion);
      }),
    ];
  }

  // if SearchValue is not null, filter data to display
  if (searchValue !== null) {
    console.log('changeDataToDisplayTriggered');
    // console.log(searchValue);
    // console.log(selectedRegion);
    dataToDisplay = [
      ...countriesData.filter((cont) => {
        let countryName = cont.name.common.toLowerCase();
        let countryRegion = cont.region.toLowerCase();

        return (
          countryName.includes(searchValue) &&
          countryRegion.includes(selectedRegion)
        );
      }),
    ];
  }

  if (selectedSubregion !== '') {
    console.log('change function subregion');
    console.log(selectedSubregion);
    dataToDisplay = [
      ...dataToDisplay.filter((cont) => {
        let countryRegion = cont.region.toLowerCase();
        let countrySubregion = cont.subregion.toLowerCase();
        return (
          countrySubregion === selectedSubregion.toLowerCase() &&
          countryRegion === selectedRegion.toLowerCase()
        );
      }),
    ];
  }

  if (orderBy !== '' && order !== '') {
    console.log('change function order', orderBy, order);
    if (orderBy === 'population') {
      console.log('dataToDisplay', dataToDisplay);
      dataToDisplay.sort((a, b) => {
        return order === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      });
    } else if (orderBy === 'area') {
      dataToDisplay.sort((a, b) => {
        return order === 'asc' ? a.area - b.area : b.area - a.area;
      });
    }
  }

  // console.log(darkMode);

  if (error) {
    return (
      <>
        <Error setError={setError} />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="loader-show" id="loader">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="main">
        <SelectionArea
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          data={countriesData}
          regions={regions}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedSubregion={selectedSubregion}
          setSelectedSubregion={setSelectedSubregion}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />

        <div className="content-area">
          {dataToDisplay.length > 0 ? (
            dataToDisplay.map((element, index) => {
              return <CountryCard country={element} key={index} />;
            })
          ) : (
            <div className="no-data-found-1">
              <h1>No such countries found</h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
