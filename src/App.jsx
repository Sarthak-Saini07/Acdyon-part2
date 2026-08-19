/* src/App.jsx */
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDemo from './components/ProductDemo';
import Features from './components/Features';
import Footer from './components/Footer';
import EasterEgg from './components/EasterEgg';
import './styles/global.css';

function App() {
  return (
    <div className="app-container">
      {/* Decorative architectural grid overlays */}
      <div className="app-grid-overlay"></div>
      
      {/* Static header bar */}
      <Navbar />

      {/* Main content layouts */}
      <main style={{ flexGrow: 1, zIndex: 10 }}>
        <Hero />
        <ProductDemo />
        <Features />
      </main>

      {/* Footer bar */}
      <Footer />

      {/* Hidden Easter Egg developer CLI console */}
      <EasterEgg />
    </div>
  );
}

export default App;
