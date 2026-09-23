import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * DigitalProductBlueprint
 * Preserves the exact architecture, content, layout, text, cards, and structure of the Blueprint
 * while bringing it to life with the smooth, continuous floating motion, depth, neon glow, and
 * interactive mouse parallax inspired by the reference motion language.
 */
export default function DigitalProductBlueprint({ height = 440 }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const cardRef = useRef(null);

  // Mouse parallax tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to +0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to +0.5
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  const capabilities = [
    {
      id: 'ai',
      label: 'AI',
      sub: 'Intelligent Systems',
      posClass: 'blueprint-pos-ai',
      parallaxFactor: 16,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z" />
          <path d="M6 13a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4z" />
          <path d="M18 13a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4z" />
          <path d="m9 8 3 5 3-5" />
          <path d="m6 18 6 3 6-3" />
        </svg>
      )
    },
    {
      id: 'web',
      label: 'WEB',
      sub: 'SaaS & Platforms',
      posClass: 'blueprint-pos-web',
      parallaxFactor: -14,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      id: 'automation',
      label: 'AUTOMATION',
      sub: 'Workflow Engines',
      posClass: 'blueprint-pos-automation',
      parallaxFactor: 18,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      )
    },
    {
      id: 'mobile',
      label: 'MOBILE',
      sub: 'iOS & Android Apps',
      posClass: 'blueprint-pos-mobile',
      parallaxFactor: -18,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      id: 'cloud',
      label: 'CLOUD',
      sub: 'Scalable APIs & Infra',
      posClass: 'blueprint-pos-cloud',
      parallaxFactor: 12,
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      )
    }
  ];

  // Ambient floating particle dust
  const particles = [
    { top: '15%', left: '22%', size: 3, delay: '0s', dur: '4s' },
    { top: '28%', left: '80%', size: 2.5, delay: '1.2s', dur: '5.2s' },
    { top: '72%', left: '16%', size: 3, delay: '2.4s', dur: '4.8s' },
    { top: '82%', left: '74%', size: 2, delay: '0.8s', dur: '6s' },
    { top: '38%', left: '48%', size: 2, delay: '1.8s', dur: '5.5s' }
  ];

  return (
    <div
      ref={cardRef}
      className="blueprint-card-root"
      style={{
        height: `${height}px`,
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="TechRizers Enterprise Architecture Blueprint"
    >
      {/* Background blueprint architectural grid & ambient aura */}
      <div className="blueprint-grid-overlay" />
      <div className="blueprint-radial-ambient" />

      {/* Floating ambient micro particles */}
      <div className="blueprint-particles-layer" aria-hidden="true">
        {particles.map((p, idx) => (
          <span
            key={`p-${idx}`}
            className="blueprint-glow-particle"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.dur
            }}
          />
        ))}
      </div>

      {/* Top Technical Header Strip */}
      <div className="blueprint-header-strip">
        <div className="blueprint-window-dots">
          <span className="b-dot" />
          <span className="b-dot" />
          <span className="b-dot" />
          <span className="blueprint-sys-tag">ARCHITECTURE // BLUEPRINT</span>
        </div>
        <div className="blueprint-status-indicator">
          <span className="status-ping-dot" />
          <span className="status-text">SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Center Interactive Blueprint Stage */}
      <div className="blueprint-stage">
        {/* SVG Mathematical Connection Lines with Flowing Light */}
        <svg className="blueprint-svg-connections" viewBox="0 0 520 320" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="blueprintLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.6" />
            </linearGradient>

            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. AI -> Center Card */}
          <path
            d="M 150 41 C 166 41, 168 105, 174 105"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M 150 41 C 166 41, 168 105, 174 105"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.8"
            strokeDasharray="5 24"
            className="flowing-light-path"
          />
          <circle cx="150" cy="41" r="2.5" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx="174" cy="105" r="2.5" fill="#38BDF8" />

          {/* 2. AUTOMATION -> Center Card */}
          <path
            d="M 150 152 L 174 152"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M 150 152 L 174 152"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.8"
            strokeDasharray="5 20"
            className="flowing-light-path"
          />
          <circle cx="150" cy="152" r="2.5" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx="174" cy="152" r="2.5" fill="#38BDF8" />

          {/* 3. WEB -> Center Card */}
          <path
            d="M 370 41 C 354 41, 352 105, 346 105"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M 370 41 C 354 41, 352 105, 346 105"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.8"
            strokeDasharray="5 24"
            className="flowing-light-path-reverse"
          />
          <circle cx="370" cy="41" r="2.5" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx="346" cy="105" r="2.5" fill="#38BDF8" />

          {/* 4. MOBILE -> Center Card */}
          <path
            d="M 370 152 L 346 152"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M 370 152 L 346 152"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.8"
            strokeDasharray="5 20"
            className="flowing-light-path-reverse"
          />
          <circle cx="370" cy="152" r="2.5" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx="346" cy="152" r="2.5" fill="#38BDF8" />

          {/* 5. CLOUD -> Center Card */}
          <path
            d="M 260 248 L 260 222"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />
          <path
            d="M 260 248 L 260 222"
            stroke="url(#blueprintLineGrad)"
            strokeWidth="1.8"
            strokeDasharray="5 18"
            className="flowing-light-path"
          />
          <circle cx="260" cy="248" r="2.5" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx="260" cy="222" r="2.5" fill="#38BDF8" />
        </svg>

        {/* Central Core: Digital Product Window (Fixed Anchor) */}
        <div className="blueprint-central-product" tabIndex={0}>
          {/* Subtle light sweep shimmer */}
          <div className="card-shimmer-sweep" />

          <div className="product-window-top">
            <div className="mini-window-controls">
              <span className="m-dot" />
              <span className="m-dot" />
              <span className="m-dot" />
            </div>
            <div className="product-window-tab">
              <span className="tab-indicator" />
              <span>techrizers-app // core</span>
            </div>
            <span className="product-tag-pill">PROD</span>
          </div>

          <div className="product-window-body">
            <div className="product-hero-badge">
              <span className="product-core-icon">✦</span>
              <span className="product-core-title">DIGITAL PRODUCT</span>
            </div>
            <p className="product-core-subtitle">Enterprise Solution Framework</p>

            {/* Abstract SaaS interface wireframe blocks */}
            <div className="abstract-ui-blocks">
              <div className="ui-metric-row">
                <div className="ui-metric-pill live-metric-active">
                  <span className="metric-dot green pulse-dot" />
                  <span className="metric-val">99.98%</span>
                  <span className="metric-lbl">Uptime</span>
                </div>
                <div className="ui-metric-pill live-metric-active">
                  <span className="metric-dot blue pulse-dot" />
                  <span className="metric-val">&lt; 45ms</span>
                  <span className="metric-lbl">Latency</span>
                </div>
              </div>
              <div className="ui-progress-track">
                <div className="ui-progress-fill" />
              </div>
              <div className="ui-code-preview">
                <code>Scalable · Secure · Production-Ready</code>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Floating Capability Cards with Independent Drift & Parallax */}
        {capabilities.map((cap) => {
          const parallaxX = mousePos.x * cap.parallaxFactor;
          const parallaxY = mousePos.y * (cap.parallaxFactor * 0.7);

          return (
            <div
              key={cap.id}
              className={`blueprint-cap-card ${cap.posClass} ${hoveredNode === cap.id ? 'is-hovered' : ''}`}
              style={{
                '--px': `${parallaxX}px`,
                '--py': `${parallaxY}px`
              }}
              onMouseEnter={() => setHoveredNode(cap.id)}
              onMouseLeave={() => setHoveredNode(null)}
              title={`${cap.label}: ${cap.sub}`}
            >
              <div className="cap-card-inner">
                {/* Edge light sweep reflection */}
                <div className="card-shimmer-sweep" />
                <div className="cap-icon-box">{cap.icon}</div>
                <div className="cap-text-block">
                  <span className="cap-label">{cap.label}</span>
                  <span className="cap-sub">{cap.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status & Trust Strip */}
      <div className="blueprint-bottom-bar">
        <div className="bottom-label-group">
          <span className="bottom-accent-spark">✓</span>
          <span className="bottom-main-label">BUILT FOR REAL BUSINESS</span>
        </div>
        <div className="bottom-meta-group">
          <span className="bottom-pill">SCALABLE</span>
          <span className="bottom-pill">SECURE</span>
          <span className="bottom-pill">ENTERPRISE</span>
        </div>
      </div>
    </div>
  );
}
