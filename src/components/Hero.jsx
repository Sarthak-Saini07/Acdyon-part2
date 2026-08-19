/* src/components/Hero.jsx */
import React, { useState } from 'react';
import { Copy, Check, Terminal, Play, ShieldCheck, Zap, Coffee } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const commandText = 'npx create-acdyon-app';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="hero-section">
      {/* Decorative Warm Steam Background Effect */}
      <div className="steam-container steam-bg-glow">
        <div className="steam-cloud steam-1"></div>
        <div className="steam-cloud steam-2"></div>
        <div className="steam-cloud steam-3"></div>
      </div>

      <div className="container hero-container">
        {/* Badge Indicator */}
        <div className="hero-badge">
          <Terminal size={14} className="badge-icon" />
          <span className="mono-text">v2.4 LTS Release: Cold Brew Engine</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title text-gradient">
          Deterministic API Observability.<br />
          <span>Roasted to Perfection.</span>
        </h1>

        {/* Subtext */}
        <p className="hero-description">
          Acdyon brings schema integrity, deterministic contract tracing, and sub-millisecond request isolation to your distributed systems. No fake metrics, no magic. Just raw, verifiable pipeline execution.
        </p>

        {/* Call to Actions */}
        <div className="hero-ctas">
          <a href="#showcase" className="hero-primary-btn">
            <Play size={16} fill="currentColor" />
            <span>Launch Live Console</span>
          </a>

          {/* Copy Widget */}
          <div className="copy-widget">
            <span className="copy-prompt mono-text">$</span>
            <span className="copy-text mono-text">{commandText}</span>
            <button 
              onClick={handleCopy} 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              aria-label="Copy install command"
            >
              {copied ? (
                <>
                  <Check size={16} className="copy-icon" />
                  <span className="copy-tooltip">Copied!</span>
                </>
              ) : (
                <Copy size={16} className="copy-icon" />
              )}
            </button>
          </div>
        </div>

        {/* Truthful Specs Panel */}
        <div className="hero-specs-panel">
          <div className="spec-item">
            <ShieldCheck size={18} className="spec-icon" />
            <div className="spec-content">
              <span className="spec-value mono-text">100%</span>
              <span className="spec-label">Deterministic Contracts</span>
            </div>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item">
            <Zap size={18} className="spec-icon" />
            <div className="spec-content">
              <span className="spec-value mono-text">&lt;1.2ms</span>
              <span className="spec-label">Pipeline Overhead</span>
            </div>
          </div>
          <div className="spec-divider"></div>
          <div className="spec-item">
            <Coffee size={18} className="spec-icon" />
            <div className="spec-content">
              <span className="spec-value mono-text">0ms</span>
              <span className="spec-label">Cold Starts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
