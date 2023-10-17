import React from 'react';

import useTheme from '../../context/ThemeContext';

const SelectionArea = ({
  searchValue,
  setSearchValue,
  data,
  selectedRegion,
  setSelectedRegion,
}) => {
  const { darkMode } = useTheme();

  // set regions
  let region = new Set();

  data.forEach((element) => {
    region.add(element.region);
  });
  let regions = [...region];

  return (
    <>
      <div className="selection-area">
        <div
          className={
            darkMode
              ? 'search-bar search-bar-dark elements-dark'
              : 'search-bar search-bar-light elements-light'
          }
        >
          <div className="search-icon">
            <i className="bi bi-search"></i>
          </div>
          <input
            type="text"
            placeholder="Search for a country..."
            className="search-input"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(() => {
                return e.target.value.toLowerCase();
              });
            }}
          />
        </div>
        <div>
          <select
            name="region"
            id="region-selection"
            className={
              darkMode
                ? 'region-selection-dark region-dark elements-dark'
                : 'region-selection-light elements-light'
            }
            onChange={(e) => {
              setSelectedRegion(() => {
                return e.target.value.toLowerCase();
              });
            }}
          >
            <option
              className={
                darkMode
                  ? 'region-option elements-dark'
                  : 'region-option elements-light'
              }
              value=""
              selected
              hidden
              disabled
            >
              Filter By Region
            </option>
            <option
              className={
                darkMode
                  ? 'region-option elements-dark'
                  : 'region-option elements-light'
              }
              value=""
            >
              All
            </option>
            {regions.map((element, index) => {
              return (
                <option
                  className={
                    darkMode
                      ? 'region-option elements-dark'
                      : 'region-option elements-light'
                  }
                  value={element}
                  key={index}
                >
                  {element}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default SelectionArea;
