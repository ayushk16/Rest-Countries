import { useEffect, useState, useCallback } from 'react';
import './App.css';

import useTheme, { ThemeProvider } from './context/ThemeContext';

import { Header, SelectionArea, CountryCard, BgBody } from './components';

function App() {
  // setting state for countries data, loading, error, search value and selected region
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // custom hook for theme
  const { darkMode } = useTheme();

  // declaring regions and data to display as variables
  let regions = [];
  let dataToDisplay = [];

  // fetching countries data from api and setting it to state
  const fetchCountriesData = useCallback(() => {
    console.log('updating countries');
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        let response = await fetch('https://restcountries.com/v3.1/all', {
          method: 'GET',
        });

        if (!response.ok) throw new Error('Something went wrong');
        setError(false);

        let responseData = await response.json();

        // set countries
        setCountriesData(responseData);

        // setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchCountries();
  });

  useEffect(fetchCountriesData, []);

  // set data to display
  dataToDisplay = [...countriesData];

  // if selectedRegion is not null, filter data to display
  if (selectedRegion !== null) {
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
  // console.log(darkMode);

  if (error) {
    return (
      <>
        <ThemeProvider>
          <BgBody>
            <Header />
          </BgBody>
        </ThemeProvider>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <ThemeProvider>
          <BgBody>
            <div className="loader-show" id="loader">
              <p>Loading...</p>
            </div>
            <Header />
          </BgBody>
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider>
        <BgBody>
          <Header />
          <main className="main">
            <SelectionArea
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              data={countriesData}
              regions={regions}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />

            <div className="content-area">
              {dataToDisplay.length > 0 ? (
                dataToDisplay.map((element, index) => {
                  return <CountryCard country={element} key={index} />;
                })
              ) : (
                <h1 className="not-found">No such countries found</h1>
              )}
            </div>
          </main>
        </BgBody>
      </ThemeProvider>
    </>
  );
}

export default App;
