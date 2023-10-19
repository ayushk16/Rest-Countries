import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTheme from '../context/ThemeContext';

const Error = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          darkMode
            ? 'home-error home-error-dark'
            : 'home-error home-error-light'
        }
      >
        <h1>It says 404!</h1>
        <h3> Wrong URL </h3>
        <button
          className={
            darkMode ? 'back-btn back-btn-dark' : 'back-btn back-btn-light'
          }
          onClick={() => {
            navigate('/');
          }}
        >
          Home
        </button>
      </div>
    </>
  );
};

export default Error;
