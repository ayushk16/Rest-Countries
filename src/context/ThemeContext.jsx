import { createContext, useContext, useState } from 'react';
import { TRUE } from 'sass';

// creating theme context
export const ThemeContext = createContext({
  darkMode: false,
  switchTheme: () => {},
});

// exporting themeprovider for app.jsx to wrap children inside it and provide them with passed values
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const switchTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// exporting custom hook for components to give access to the themecontext
const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
