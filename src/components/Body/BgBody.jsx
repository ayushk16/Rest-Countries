import React from 'react';

import useTheme from '../../context/ThemeContext';

const BgBody = ({ children }) => {
  const { darkMode } = useTheme();
  return (
    <div className={darkMode ? 'whole-body-dark' : 'whole-body-light'}>
      {children}
    </div>
  );
};

export default BgBody;
