/* src/components/Navbar.jsx */
import React, { useState, useEffect } from 'react';
import { Coffee, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('acdyon-theme') || 'dark';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('acdyon-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand & Logo */}
        <a href="#" className="navbar-logo">
          <div className="logo-icon-container">
            <Coffee className="logo-icon" size={24} />
            <span className="logo-dot"></span>
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-brand">Acdyon</span>
            <div className="logo-status">
              <span className="status-indicator"></span>
              <span className="status-text">Brew Engine Active / v2.4</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#features" className="nav-link">Features</a>
          <a href="#showcase" className="nav-link">Showcase</a>
          <a href="#docs" className="nav-link">Docs</a>
          <a href="https://github.com/Sarthak-Saini07/Acdyon-part2" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="theme-icon sun-icon" />
            ) : (
              <Moon size={20} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Primary CTA */}
          <a href="#showcase" className="navbar-cta-btn">
            <span>Get Started</span>
            <ArrowRight size={16} className="cta-arrow" />
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu} 
            className="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav">
            <a 
              href="#features" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#showcase" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Showcase
            </a>
            <a 
              href="#docs" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </a>
            <a 
              href="https://github.com/Sarthak-Saini07/Acdyon-part2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GitHub
            </a>
            <div className="mobile-drawer-footer">
              <a 
                href="#showcase" 
                className="navbar-cta-btn mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
