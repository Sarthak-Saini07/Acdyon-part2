import React from 'react';
import { Coffee, ShieldCheck } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area">
      <div className="container footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          {/* Logo & Notes */}
          <div className="footer-brand-column">
            <div className="footer-logo">
              <Coffee size={20} className="text-amber" />
              <span className="footer-brand-name">Acdyon</span>
            </div>
            <p className="footer-brand-desc">
              Deterministic contracts, payload safety audits, and sub-millisecond execution warm-ups. Engineered with craft for mission-critical developer systems.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="footer-links-column">
            <h4 className="footer-col-title">Product</h4>
            <a href="#features" className="footer-link">Architecture</a>
            <a href="#showcase" className="footer-link">Interactive Inspector</a>
            <a href="#docs" className="footer-link">Documentation</a>
          </div>

          {/* Links Column 2 */}
          <div className="footer-links-column">
            <h4 className="footer-col-title">Resources</h4>
            <a href="https://github.com/Sarthak-Saini07/Acdyon-part2" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub Repository</a>
            <a href="#docs" className="footer-link">Specifications</a>
            <a href="#showcase" className="footer-link">Diagnostics Console</a>
          </div>

          {/* Status Column */}
          <div className="footer-status-column">
            <h4 className="footer-col-title">System Status</h4>
            <div className="status-bubble-container">
              <span className="status-live-dot"></span>
              <span className="status-live-text mono-text">All pipelines verified</span>
            </div>
            <div className="footer-spec-summary">
              <ShieldCheck size={14} className="text-amber" />
              <span>Secured with LLVM compiler</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <span className="copyright-text">
            &copy; {currentYear} Acdyon Technologies Inc. All rights reserved.
          </span>
          
          <div className="footer-socials">
            <a 
              href="https://github.com/Sarthak-Saini07/Acdyon-part2" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-btn"
              aria-label="GitHub Repository"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ display: 'block' }}
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
