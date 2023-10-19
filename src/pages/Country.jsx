import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// hooks
import useCountry from '../Hooks/useCountry';
import useAllCountriesName from '../Hooks/useAllCountriesName';
// theme
import useTheme from '../context/ThemeContext';
// icons
import { AiOutlineArrowLeft } from 'react-icons/ai';
// styles
import '../styles/Country.css';

const Country = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // customHooks
  const { data, loading, error } = useCountry(id);
  const {
    data: allCountriesName,
    loading: allCountriesLoading,
    error: allCountriesError,
  } = useAllCountriesName();
  const { darkMode } = useTheme();

  if (error || allCountriesError) {
    console.log(error);
  }
  return (
    <>
      {data && allCountriesName ? (
        <>
          <div className="country-details-container">
            <div className="back-btn-holder">
              <button
                className={
                  darkMode
                    ? 'back-btn back-btn-dark'
                    : 'back-btn back-btn-light'
                }
                onClick={() => {
                  navigate(-1);
                }}
              >
                <AiOutlineArrowLeft />
                <span>Back</span>
              </button>
            </div>
            <div className="country-details-holder-2">
              <div className="country-details-flag-holder">
                <img
                  className="country-details-flag-img"
                  src={data.flags.png}
                  alt={data.name.common || 'country flag'}
                />
              </div>
              <div className="country-details-2">
                {data.name.common && (
                  <h1 className="country-details-name">{data.name.common}</h1>
                )}

                <div className="divided-details">
                  <div className="detail-partition-1">
                    {data.name.nativeName && (
                      <div className="country-info">
                        <span className="stat-key">Native Name:</span>
                        <span className="stat-value">
                          {Object.keys(data.name.nativeName).map((lang, i) => {
                            return (
                              <span> {data.name.nativeName[lang].common},</span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data.population && (
                      <div className="country-info">
                        <span className="stat-key">Population:</span>
                        <span className="stat-value">
                          {data.population.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {data.region && (
                      <div className="country-info">
                        <span className="stat-key">Region:</span>
                        <span className="stat-value">{data.region}</span>
                      </div>
                    )}

                    {data.subregion && (
                      <div className="country-info">
                        <span className="stat-key">Subregion:</span>
                        <span className="stat-value">{data.subregion}</span>
                      </div>
                    )}

                    {data.capital && (
                      <div className="country-info">
                        <span className="stat-key">Capital :</span>
                        <span className="stat-value">
                          {Object.keys(data.capital).map((cap, i) => {
                            return (
                              <span
                                key={i}
                                className="capital multiple-value-span "
                              >
                                {' '}
                                {data.capital[cap]},
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="detail-partition-2">
                    {data.tld && (
                      <div className="country-info">
                        <span className="stat-key">Top Level Domain:</span>
                        <span className="stat-value">
                          {Object.keys(data.tld).map((domain, i) => {
                            return (
                              <span
                                key={i}
                                className="domain multiple-value-span"
                              >
                                {' '}
                                {data.tld[domain]},
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data.currencies && (
                      <div className="country-info">
                        <span className="stat-key">Currencies:</span>
                        <span className="stat-value">
                          {Object.keys(data.currencies).map((cur, i) => {
                            return (
                              <span
                                key={i}
                                className="currency multiple-value-span"
                              >
                                {' '}
                                {data.currencies[cur].name},
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}

                    {data.languages && (
                      <div className="country-info">
                        <span className="stat-key">Language:</span>
                        <span className="stat-value">
                          {Object.keys(data.languages).map((lang, i) => {
                            return (
                              <span
                                key={i}
                                className="language multiple-value-span"
                              >
                                {' '}
                                {data.languages[lang]},
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {data.borders && (
                  <div className="borders-info">
                    <span className="stat-key">Borders:</span>
                    <span className="stat-value">
                      {Object.keys(data.borders).map((borderCountry, i) => {
                        return (
                          <span
                            className={
                              darkMode
                                ? 'border-country border-country-dark'
                                : 'border-country border-country-light'
                            }
                            key={i}
                            onClick={() => {
                              navigate(
                                `/country/${data.borders[borderCountry]}`
                              );
                            }}
                          >
                            {allCountriesName[`${data.borders[borderCountry]}`]}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : loading || allCountriesLoading ? (
        <div className="loader-show" id="loader">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="no-data-found-2">
          <h1>No Data Found</h1>
          <div className="back-btn-holder">
            <button
              className={
                darkMode ? 'back-btn back-btn-dark' : 'back-btn back-btn-light'
              }
              onClick={() => {
                navigate(-1);
              }}
            >
              <AiOutlineArrowLeft />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Country;
