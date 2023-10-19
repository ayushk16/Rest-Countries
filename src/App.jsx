import React from 'react';

import { Routes, Route } from 'react-router-dom';
import useTheme, { ThemeProvider } from './context/ThemeContext';
import { Header, BgBody } from './components';
import './App.css';
import Home from './pages/Home';
import Country from './pages/Country';
function App() {
  const { darkMode } = useTheme();

  return (
    <ThemeProvider>
      <BgBody>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<Country />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BgBody>
    </ThemeProvider>
  );
}

export default App;
