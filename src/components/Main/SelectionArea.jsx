import React from 'react';

import useTheme from '../../context/ThemeContext';

const SelectionArea = ({
  searchValue,
  setSearchValue,
  data,
  selectedRegion,
  setSelectedRegion,
  selectedSubregion,
  setSelectedSubregion,
  setOrderBy,
  setOrder,
  orderBy,
  order,
}) => {
  const { darkMode } = useTheme();

  // set regions
  let region = new Set();

  data.forEach((element) => {
    region.add(element.region);
  });
  let regions = [...region];

  let subregion = new Set();

  data.forEach((element) => {
    if (element.region.toLowerCase() === selectedRegion.toLowerCase()) {
      subregion.add(element.subregion);
    }
  });

  let subregions = [...subregion];
  console.log(subregion);
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
        <div className="selections-holder">
          <div>
            <select
              name="region"
              id="region-selection"
              value={selectedRegion ? selectedRegion : ''}
              className={
                darkMode
                  ? 'selections region-selection-dark region-dark elements-dark'
                  : 'selections region-selection-light elements-light'
              }
              onChange={(e) => {
                setSelectedRegion(() => {
                  return e.target.value.toLowerCase();
                });
                setSelectedSubregion('');
                subregion.clear();
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
          <div>
            <select
              name="subregion"
              value={selectedSubregion ? selectedRegion : ''}
              id="subregion"
              className={
                darkMode
                  ? 'selections region-selection-dark region-dark elements-dark'
                  : 'selections region-selection-light elements-light'
              }
              onChange={(e) => {
                setSelectedSubregion(e.target.value);
              }}
            >
              <option value="">Select a region</option>
              {subregions.map((element, index) => {
                return (
                  <option value={element} key={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select
              name="orderBy"
              id="orderBy"
              value={orderBy ? orderBy : ''}
              className={
                darkMode
                  ? 'selections region-selection-dark region-dark elements-dark'
                  : 'selections region-selection-light elements-light'
              }
              onChange={(e) => {
                setOrderBy(e.target.value);
              }}
            >
              <option value="" selected>
                Order By
              </option>
              <option value="population">Population</option>
              <option value="area">Area</option>
            </select>
          </div>
          <div>
            <select
              name="order"
              id="order"
              value={order ? order : ''}
              className={
                darkMode
                  ? 'selections region-selection-dark region-dark elements-dark'
                  : 'selections region-selection-light elements-light'
              }
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <option value="" selected>
                Select an order
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectionArea;
