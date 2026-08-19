/* src/components/EasterEgg.jsx */
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Sliders, Cpu, Coffee, Settings } from 'lucide-react';
import './EasterEgg.css';

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' or 'tweaks'
  
  // Theme tweak states
  const [accentColor, setAccentColor] = useState('classic'); // classic, caramel, chestnut, latte
  const [steamEnabled, setSteamEnabled] = useState(true);
  const [gridSize, setGridSize] = useState(80);

  // Terminal states
  const [cmdInput, setCmdInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Acdyon (v2.4-LTS) Local Brew Debug Interface' },
    { type: 'system', text: 'Type "help" to list available debug operations.' },
    { type: 'system', text: '' }
  ]);
  
  const terminalEndRef = useRef(null);
  const keySequence = useRef([]);

  // Setup color theme values
  const themeAccents = {
    classic: { primary: '#d97706', hover: '#f59e0b', glow: 'rgba(217, 119, 6, 0.3)' },
    caramel: { primary: '#b45309', hover: '#d97706', glow: 'rgba(180, 83, 9, 0.3)' },
    chestnut: { primary: '#7c2d12', hover: '#9a3412', glow: 'rgba(124, 45, 18, 0.3)' },
    latte: { primary: '#e0a96d', hover: '#ecdec9', glow: 'rgba(224, 169, 109, 0.3)' }
  };

  // Keyboard Event Listeners for triggers
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Ctrl + Shift + D Trigger
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // 2. Typing 'acdyon' Trigger
      const char = e.key.toLowerCase();
      if (char.length === 1 && /[a-z]/.test(char)) {
        keySequence.current.push(char);
        if (keySequence.current.length > 6) {
          keySequence.current.shift();
        }
        const typed = keySequence.current.join('');
        if (typed === 'acdyon') {
          setIsOpen((prev) => !prev);
          keySequence.current = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update theme overrides dynamically
  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      const colors = themeAccents[accentColor];
      root.style.setProperty('--accent-amber', colors.primary);
      root.style.setProperty('--accent-hover', colors.hover);
      root.style.setProperty('--accent-amber-glow', colors.glow);
      root.style.setProperty('--app-grid-size', `${gridSize}px`);
      
      const steamClouds = document.querySelectorAll('.steam-cloud');
      steamClouds.forEach(cloud => {
        cloud.style.display = steamEnabled ? 'block' : 'none';
      });
    } else {
      // Clean up inline styles on close
      root.style.removeProperty('--accent-amber');
      root.style.removeProperty('--accent-hover');
      root.style.removeProperty('--accent-amber-glow');
      root.style.removeProperty('--app-grid-size');
      const steamClouds = document.querySelectorAll('.steam-cloud');
      steamClouds.forEach(cloud => {
        cloud.style.display = 'block';
      });
    }
  }, [isOpen, accentColor, steamEnabled, gridSize]);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    const history = [...terminalHistory, { type: 'input', text: `acdyon-debug$ ${cmdText}` }];
    
    if (trimmed === 'help') {
      history.push(
        { type: 'output', text: 'Available commands:' },
        { type: 'output', text: '  help       Display active control list' },
        { type: 'output', text: '  ping       Send ICMP Echo request to Brew engine pipeline' },
        { type: 'output', text: '  stats      Read virtual machine telemetry variables' },
        { type: 'output', text: '  coffee     Trigger ASCII Brew sequence' },
        { type: 'output', text: '  system     Print machine host parameters' },
        { type: 'output', text: '  clear      Purge terminal output history' },
        { type: 'output', text: '  exit       Close this debug session' }
      );
    } else if (trimmed === 'ping') {
      const delay = (0.8 + Math.random() * 0.5).toFixed(2);
      history.push(
        { type: 'output', text: `64 bytes from acdyon-core: icmp_seq=1 ttl=64 time=${delay}ms` },
        { type: 'output', text: 'Contract schema validation: SUCCESS' }
      );
    } else if (trimmed === 'stats') {
      const randTemp = (92.5 + Math.random() * 1.5).toFixed(1);
      history.push(
        { type: 'output', text: 'Telemetry readout:' },
        { type: 'output', text: `  Core Temperature   : ${randTemp}°C (SafeRange: 90-95°C)` },
        { type: 'output', text: '  Thread Allocator   : Active / 8 worker loops' },
        { type: 'output', text: '  Garbage Collection : Generational Coffee Compact (0.01ms GC pause)' },
        { type: 'output', text: '  Contract Hit Ratio : 99.87% verified packages' }
      );
    } else if (trimmed === 'coffee') {
      history.push(
        { type: 'output', text: '      ( ( ' },
        { type: 'output', text: '       ) )' },
        { type: 'output', text: '    .-----.' },
        { type: 'output', text: '    |     | )' },
        { type: 'output', text: '    `-----` ' },
        { type: 'output', text: '[Brew sequence: Deterministic espresso extraction completed.]' }
      );
    } else if (trimmed === 'system') {
      history.push(
        { type: 'output', text: 'System Specification:' },
        { type: 'output', text: '  Kernel   : Acdyon-OS v2.4-deterministic-win64' },
        { type: 'output', text: '  Compiler : LLVM/Roast v1.82' },
        { type: 'output', text: '  Memory   : Pre-allocated Snapshot Pool [128MB]' }
      );
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      setCmdInput('');
      return;
    } else if (trimmed === 'exit' || trimmed === 'close') {
      setIsOpen(false);
      return;
    } else if (trimmed !== '') {
      history.push({ type: 'error', text: `acdyon-debug: command not found: "${cmdText}". Try "help"` });
    }

    history.push({ type: 'output', text: '' });
    setTerminalHistory(history);
    setCmdInput('');
  };

  const handleCmdSubmit = (e) => {
    e.preventDefault();
    executeCommand(cmdInput);
  };

  if (!isOpen) return null;

  return (
    <div className="hud-overlay" onClick={() => setIsOpen(false)}>
      <div className="hud-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="hud-header">
          <div className="hud-title-wrap">
            <TerminalIcon size={18} className="text-amber" />
            <span className="mono-text hud-title">acdyon-debug-terminal --version 2.4</span>
          </div>
          <div className="hud-controls">
            <button 
              onClick={() => setActiveTab('terminal')} 
              className={`hud-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
            >
              <TerminalIcon size={14} />
              <span>Shell</span>
            </button>
            <button 
              onClick={() => setActiveTab('tweaks')} 
              className={`hud-tab-btn ${activeTab === 'tweaks' ? 'active' : ''}`}
            >
              <Sliders size={14} />
              <span>System Tweaks</span>
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hud-close-btn"
              aria-label="Close Debug Window"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Panel Main Area */}
        <div className="hud-content">
          
          {activeTab === 'terminal' ? (
            <div className="hud-terminal-view">
              <div className="hud-terminal-log">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={`log-row ${item.type}`}>
                    {item.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
              <form onSubmit={handleCmdSubmit} className="hud-terminal-form">
                <span className="hud-prompt mono-text">acdyon-debug$</span>
                <input 
                  type="text" 
                  value={cmdInput} 
                  onChange={(e) => setCmdInput(e.target.value)}
                  className="hud-input mono-text"
                  autoFocus 
                  placeholder="type command (e.g. help, coffee, stats)..."
                />
              </form>
            </div>
          ) : (
            <div className="hud-tweaks-view">
              <h3 className="tweaks-title">Bespoke Design Controls</h3>
              <p className="tweaks-subtitle">Tweak runtime CSS variables and graphics dynamically in the DOM.</p>

              <div className="tweak-controls-list">
                {/* Tweak 1 */}
                <div className="tweak-item">
                  <div className="tweak-info">
                    <span className="tweak-label">Amber Hue Shift</span>
                    <span className="tweak-description">Override primary UI highlight brand tones</span>
                  </div>
                  <div className="tweak-options">
                    <button 
                      onClick={() => setAccentColor('classic')} 
                      className={`tweak-btn ${accentColor === 'classic' ? 'active' : ''}`}
                    >
                      Classic Gold
                    </button>
                    <button 
                      onClick={() => setAccentColor('caramel')} 
                      className={`tweak-btn ${accentColor === 'caramel' ? 'active' : ''}`}
                    >
                      Oat Caramel
                    </button>
                    <button 
                      onClick={() => setAccentColor('chestnut')} 
                      className={`tweak-btn ${accentColor === 'chestnut' ? 'active' : ''}`}
                    >
                      Dark Chestnut
                    </button>
                    <button 
                      onClick={() => setAccentColor('latte')} 
                      className={`tweak-btn ${accentColor === 'latte' ? 'active' : ''}`}
                    >
                      Ivory Latte
                    </button>
                  </div>
                </div>

                {/* Tweak 2 */}
                <div className="tweak-item">
                  <div className="tweak-info">
                    <span className="tweak-label">Coffee Steam Simulation</span>
                    <span className="tweak-description">Toggle background floating gradient animations</span>
                  </div>
                  <div className="tweak-options">
                    <button 
                      onClick={() => setSteamEnabled(true)} 
                      className={`tweak-btn ${steamEnabled ? 'active' : ''}`}
                    >
                      Enabled
                    </button>
                    <button 
                      onClick={() => setSteamEnabled(false)} 
                      className={`tweak-btn ${!steamEnabled ? 'active' : ''}`}
                    >
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Tweak 3 */}
                <div className="tweak-item">
                  <div className="tweak-info">
                    <span className="tweak-label">Grid Size Overlay</span>
                    <span className="tweak-description">Adjust background architectural layout density ({gridSize}px)</span>
                  </div>
                  <div className="tweak-slider-wrap">
                    <input 
                      type="range" 
                      min="40" 
                      max="160" 
                      step="20"
                      value={gridSize} 
                      onChange={(e) => setGridSize(parseInt(e.target.value))}
                      className="tweak-slider"
                    />
                    <span className="tweak-slider-val mono-text">{gridSize}px</span>
                  </div>
                </div>
              </div>

              <div className="tweaks-footer-notice">
                <Cpu size={14} />
                <span>Notice: Changes are injected as inline variables overriding variables.css. Re-opening clear resets.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
