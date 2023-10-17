import React from 'react';

import useTheme from '../../context/ThemeContext';

const CountryCard = ({ country }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={darkMode ? 'country elements-dark' : 'country elements light'}
    >
      <div className="country-flag">
        <img src={country.flags.png} alt={country.name} className="flag-img" />
      </div>
      <div className="country-details">
        <h3 className="country-name">{country.name.common}</h3>
        <div className="country-stats">
          <div className="stat">
            <span className="stat-key">Population:</span>
            <span className="stat-value">
              {Number(country.population).toLocaleString()}
            </span>
          </div>
          <div className="stat">
            <span className="stat-key">Region:</span>
            <span className="stat-value">{country.region}</span>
          </div>
          <div className="stat">
            <span className="stat-key">Capital:</span>
            <span className="stat-value">{country.capital}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
