/* src/components/ProductDemo.jsx */
import React, { useState } from 'react';
import { 
  Play, Activity, Clock, Cpu, CheckCircle, 
  GitCompare, Network, Database, Braces, RefreshCw 
} from 'lucide-react';
import './ProductDemo.css';

export default function ProductDemo() {
  const [activeTab, setActiveTab] = useState('diff');
  const [isPinging, setIsPinging] = useState(false);
  const [pingStats, setPingStats] = useState({
    latency: '1.20 ms',
    throughput: '1,424 req/s',
    integrity: 'Verified',
    status: '200 OK'
  });

  const handleSendPing = () => {
    setIsPinging(true);
    // Simulate API execution delays and variations
    setTimeout(() => {
      const randomLatency = (0.95 + Math.random() * 0.4).toFixed(2);
      const randomThroughput = (1380 + Math.floor(Math.random() * 80)).toLocaleString();
      setPingStats({
        latency: `${randomLatency} ms`,
        throughput: `${randomThroughput} req/s`,
        integrity: 'Verified',
        status: '200 OK'
      });
      setIsPinging(false);
    }, 750);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'diff':
        return (
          <div className="json-container">
            <div className="json-line"><span className="json-diff-removed">- "roast_profile": "medium"</span></div>
            <div className="json-line"><span className="json-diff-added">+ "roast_profile": "espresso_dark"</span></div>
            <div className="json-line"><span className="json-key">"brew_engine"</span>: <span className="json-value-string">"v2.4-lts"</span>,</div>
            <div className="json-line"><span className="json-key">"cache_integrity"</span>: <span className="json-value-boolean">true</span>,</div>
            <div className="json-line"><span className="json-key">"latency_isolation"</span>: <span className="json-value-string">"deterministic"</span>,</div>
            <div className="json-line"><span className="json-key">"cold_start_delay"</span>: <span className="json-value-number">0.00</span></div>
          </div>
        );
      case 'latency':
        return (
          <div className="json-container font-mono">
            <div className="trace-header">Pipeline Execution Trace:</div>
            <div className="trace-row">
              <span className="trace-step">1. ingress_routing</span>
              <span className="trace-time">0.12 ms</span>
            </div>
            <div className="trace-row">
              <span className="trace-step">2. authentication_lookup</span>
              <span className="trace-time">0.24 ms</span>
            </div>
            <div className="trace-row active-trace">
              <span className="trace-step">3. deterministic_cache_resolve</span>
              <span className="trace-time">0.18 ms [HIT]</span>
            </div>
            <div className="trace-row">
              <span className="trace-step">4. schema_integrity_audit</span>
              <span className="trace-time">0.15 ms</span>
            </div>
            <div className="trace-row">
              <span className="trace-step">5. payload_serialization</span>
              <span className="trace-time">0.11 ms</span>
            </div>
            <div className="trace-total">
              <span className="trace-step">Total Pipeline Latency</span>
              <span className="trace-time text-amber">{pingStats.latency}</span>
            </div>
          </div>
        );
      case 'headers':
        return (
          <div className="json-container">
            <div className="json-line"><span className="json-key">"content-type"</span>: <span className="json-value-string">"application/json; charset=utf-8"</span>,</div>
            <div className="json-line"><span className="json-key">"x-acdyon-brew-engine"</span>: <span className="json-value-string">"v2.4-active"</span>,</div>
            <div className="json-line"><span className="json-key">"x-acdyon-cache"</span>: <span className="json-value-string">"HIT (local-roast)"</span>,</div>
            <div className="json-line"><span className="json-key">"x-acdyon-signature"</span>: <span className="json-value-string">"sec_bean_5f2d7a9b0c"</span>,</div>
            <div className="json-line"><span className="json-key">"x-acdyon-integrity"</span>: <span className="json-value-string">"verified_deterministic"</span></div>
          </div>
        );
      case 'schema':
        return (
          <div className="json-container">
            <div className="json-line"><span className="json-key">"$schema"</span>: <span className="json-value-string">"http://json-schema.org/draft-07/schema#"</span>,</div>
            <div className="json-line"><span className="json-key">"type"</span>: <span className="json-value-string">"object"</span>,</div>
            <div className="json-line"><span className="json-key">"required"</span>: [<span className="json-value-string">"brew_engine"</span>, <span className="json-value-string">"cache_integrity"</span>],</div>
            <div className="json-line"><span className="json-key">"properties"</span>: &#123;</div>
            <div className="json-line indent-1"><span className="json-key">"brew_engine"</span>: &#123; <span className="json-key">"type"</span>: <span className="json-value-string">"string"</span> &#125;,</div>
            <div className="json-line indent-1"><span className="json-key">"cache_integrity"</span>: &#123; <span className="json-key">"type"</span>: <span className="json-value-boolean">"boolean"</span> &#125;</div>
            <div className="json-line">&#125;</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="showcase" className="showcase-section">
      <div className="container showcase-container">
        {/* Section Header */}
        <div className="showcase-header">
          <h2 className="showcase-title">Interactive API Inspector</h2>
          <p className="showcase-subtitle">
            Inspect real-time deterministic outcomes. Send a test ping directly to Acdyon's local brew core.
          </p>
        </div>

        {/* Dashboard Card Grid */}
        <div className="dashboard-grid">
          
          {/* Main Terminal View (Espresso Card) */}
          <div className="dashboard-terminal">
            {/* Window Chrome */}
            <div className="terminal-bar">
              <div className="terminal-dots">
                <span className="term-dot close"></span>
                <span className="term-dot minimize"></span>
                <span className="term-dot maximize"></span>
              </div>
              <div className="terminal-title mono-text">acdyon-inspector --port 8080</div>
              <div className="terminal-action-area">
                <button 
                  onClick={handleSendPing} 
                  disabled={isPinging}
                  className={`ping-btn ${isPinging ? 'loading' : ''}`}
                >
                  {isPinging ? (
                    <>
                      <RefreshCw size={14} className="spin-icon" />
                      <span>Brewing...</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Send Test Ping</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="terminal-tabs">
              <button 
                onClick={() => setActiveTab('diff')} 
                className={`tab-btn ${activeTab === 'diff' ? 'active' : ''}`}
              >
                <GitCompare size={14} />
                <span>Payload Diff</span>
              </button>
              <button 
                onClick={() => setActiveTab('latency')} 
                className={`tab-btn ${activeTab === 'latency' ? 'active' : ''}`}
              >
                <Clock size={14} />
                <span>Latency Trace</span>
              </button>
              <button 
                onClick={() => setActiveTab('headers')} 
                className={`tab-btn ${activeTab === 'headers' ? 'active' : ''}`}
              >
                <Network size={14} />
                <span>Headers</span>
              </button>
              <button 
                onClick={() => setActiveTab('schema')} 
                className={`tab-btn ${activeTab === 'schema' ? 'active' : ''}`}
              >
                <Braces size={14} />
                <span>Raw Schema</span>
              </button>
            </div>

            {/* Viewer Screen */}
            <div className="terminal-screen">
              <pre className="screen-pre">
                <code>{renderTabContent()}</code>
              </pre>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="dashboard-metrics">
            <h3 className="metrics-title">Pipeline Diagnostics</h3>
            <div className="metrics-list">
              
              {/* Metric Card 1 */}
              <div className="metric-card">
                <div className="metric-icon-wrap">
                  <Clock size={18} />
                </div>
                <div className="metric-details">
                  <span className="metric-label">API Latency</span>
                  <span className={`metric-value mono-text ${isPinging ? 'metric-pulse' : ''}`}>
                    {isPinging ? '...' : pingStats.latency}
                  </span>
                </div>
              </div>

              {/* Metric Card 2 */}
              <div className="metric-card">
                <div className="metric-icon-wrap">
                  <Activity size={18} />
                </div>
                <div className="metric-details">
                  <span className="metric-label">Throughput Rate</span>
                  <span className={`metric-value mono-text ${isPinging ? 'metric-pulse' : ''}`}>
                    {isPinging ? '...' : pingStats.throughput}
                  </span>
                </div>
              </div>

              {/* Metric Card 3 */}
              <div className="metric-card">
                <div className="metric-icon-wrap">
                  <Cpu size={18} />
                </div>
                <div className="metric-details">
                  <span className="metric-label">Integrity Status</span>
                  <span className="metric-value mono-text verified-status">
                    <CheckCircle size={14} className="status-ok-icon" />
                    <span>{pingStats.integrity}</span>
                  </span>
                </div>
              </div>

              {/* Metric Card 4 */}
              <div className="metric-card">
                <div className="metric-icon-wrap">
                  <Database size={18} />
                </div>
                <div className="metric-details">
                  <span className="metric-label">HTTP Status</span>
                  <span className="metric-value status-badge mono-text">
                    {pingStats.status}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
