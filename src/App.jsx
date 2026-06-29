import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Roast from './pages/Roast';

const accentColors = ["#ff2d1a", "#2b44ff", "#ffe600", "#ff4fa3", "#00d17a"];

export default function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const [page, setPage] = useState('home');

  const cycleColor = () => {
    setColorIndex((prev) => (prev + 1) % accentColors.length);
  };

  useEffect(() => {
    // Set root CSS variable for theme accents
    document.documentElement.style.setProperty('--accent', accentColors[colorIndex]);
  }, [colorIndex]);

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white">
      <Header page={page} setPage={setPage} onChaos={cycleColor} />
      <main>
        {page === 'home' ? (
          <Home setPage={setPage} />
        ) : (
          <Roast setPage={setPage} />
        )}
      </main>
    </div>
  );
}
