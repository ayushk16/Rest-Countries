import React from 'react';
import useTheme from '../../context/ThemeContext';
const Error = ({ setError }) => {
  const { darkMode } = useTheme();
  return (
    <>
      <div
        className={
          darkMode
            ? 'home-error home-error-dark'
            : 'home-error home-error-light'
        }
      >
        <h1>Ohh Snap !!</h1>
        <h2>something went wrong</h2>
        <button
          className={
            darkMode ? 'back-btn back-btn-dark' : 'back-btn back-btn-light'
          }
          onClick={() => {
            setError(false);
            window.location.reload();
          }}
        >
          Click To Reload
        </button>
      </div>
    </>
  );
};

export default Error;
