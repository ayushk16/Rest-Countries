import React from 'react';
import { Routes, Route } from 'react-router-dom';
// context hook
import useTheme, { ThemeProvider } from './context/ThemeContext';
// components
import { Header, BgBody } from './components';
// pages
import { Home, Country, Error } from './pages';
// styles
import './App.css';
function App() {
  const { darkMode } = useTheme();

  return (
    <ThemeProvider>
      <BgBody>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<Country />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BgBody>
    </ThemeProvider>
  );
}

export default App;
