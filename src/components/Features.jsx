/* src/components/Features.jsx */
import React from 'react';
import { GitBranch, Cpu, Layers, ArrowUpRight } from 'lucide-react';
import './Features.css';

export default function Features() {
  const pillars = [
    {
      icon: <GitBranch size={24} />,
      title: 'Deterministic Execution',
      description: 'Isolate request streams using zero-variance execution frames. Standardized inputs guarantee binary-identical outputs, preventing runtime drift and hidden race conditions across nodes.',
      metric: 'Zero Execution Drift'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Virtual Snapshot Warm-up',
      description: 'Ditch JIT overhead and cold-starts. Acdyon pre-warms state machines using sandboxed memory snapshots, enabling instantaneous execution in less than 1.2 milliseconds on cold request ingress.',
      metric: '< 1.2ms Warm Starts'
    },
    {
      icon: <Layers size={24} />,
      title: 'Strict Schema Integrity',
      description: 'Assert type-level API schemas bidirectionally. Every packet undergoes low-overhead validation at the ingress layer, generating deterministic payload diffs and instant contract exceptions.',
      metric: 'Dual-Layer Validation'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container features-container">
        
        {/* Section Header */}
        <div className="features-header">
          <span className="mono-text section-badge">ENGINEERING SPECIFICATION</span>
          <h2 className="features-title">Core Architecture Pillars</h2>
          <p className="features-subtitle">
            Acdyon is built for deterministic reliability. Our technology stack prioritizes execution predictability and low runtime overhead.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon-container">
                  {pillar.icon}
                </div>
                <span className="feature-card-badge mono-text">{pillar.metric}</span>
              </div>
              
              <h3 className="feature-card-title">{pillar.title}</h3>
              
              <p className="feature-card-description">{pillar.description}</p>
              
              <div className="feature-card-footer">
                <span className="read-spec-link">
                  <span>Review Spec Sheet</span>
                  <ArrowUpRight size={14} className="spec-arrow" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
