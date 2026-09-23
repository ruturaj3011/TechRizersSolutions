import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

export default function ReferenceTechBanner() {
  const { openProjectModal } = useModal();
  const [activeBadge, setActiveBadge] = useState(null);

  const floatingBadges = [
    {
      id: 'ai',
      label: 'AI SOLUTIONS',
      desc: 'Chatbots, LLM Agents & Neural Automation',
      icon: '🧠',
      color: '#38BDF8',
      pos: { top: '8%', left: '8%' },
      pulseDelay: '0s'
    },
    {
      id: 'software',
      label: 'SOFTWARE DEVELOPMENT',
      desc: 'Enterprise Web & Scalable APIs',
      icon: '</>',
      color: '#60A5FA',
      pos: { top: '6%', right: '14%' },
      pulseDelay: '0.4s'
    },
    {
      id: 'mobile',
      label: 'MOBILE APPS',
      desc: 'Native iOS & Android Apps',
      icon: '📱',
      color: '#38BDF8',
      pos: { top: '38%', right: '4%' },
      pulseDelay: '0.8s'
    },
    {
      id: 'cloud',
      label: 'CLOUD & DEVOPS',
      desc: 'Secure, Reliable & Scalable Solutions',
      icon: '☁',
      color: '#06B6D4',
      pos: { bottom: '26%', right: '10%' },
      pulseDelay: '1.2s'
    },
    {
      id: 'uiux',
      label: 'UI/UX DESIGN',
      desc: 'Beautiful Design That Converts',
      icon: '📐',
      color: '#F43F5E',
      pos: { bottom: '18%', left: '16%' },
      pulseDelay: '1.6s'
    },
    {
      id: 'automation',
      label: 'AUTOMATION',
      desc: 'Automate Workflows & Save Time',
      icon: '⚙',
      color: '#10B981',
      pos: { top: '48%', left: '4%' },
      pulseDelay: '2.0s'
    }
  ];

  const servicesRibbon = [
    {
      icon: '🌐',
      title: 'WEB DEVELOPMENT',
      sub: 'Modern, Fast & Scalable Websites'
    },
    {
      icon: '📱',
      title: 'MOBILE APP DEVELOPMENT',
      sub: 'Android & iOS Apps That Perform'
    },
    {
      icon: '🧠',
      title: 'AI SOLUTIONS',
      sub: 'Chatbots, AI Agents & Intelligent Automation'
    },
    {
      icon: '🤖',
      title: 'BUSINESS AUTOMATION',
      sub: 'Automate Workflows & Save Time'
    },
    {
      icon: '📐',
      title: 'UI/UX DESIGN',
      sub: 'Beautiful Design That Converts'
    },
    {
      icon: '☁️',
      title: 'CLOUD & DEVOPS',
      sub: 'Secure, Reliable & Scalable Solutions'
    }
  ];

  return (
    <section className="reference-tech-banner" aria-label="TechRizers Enterprise Digital Showcase">
      <div className="container">
        {/* Main Banner Card */}
        <div className="tech-banner-card">
          <div className="tech-banner-grid">
            {/* Left: Brand, Slogan, and Mission */}
            <div className="tech-banner-brand-col">
              <div className="banner-logo-wrapper">
                <img
                  src="/assets/techrizers-logo.jpg"
                  alt="TechRizers Metallic 3D Logo"
                  className="banner-brand-logo-img"
                  onError={(e) => {
                    // Fallback to square mark if needed
                    e.currentTarget.src = '/assets/techrizers-mark-square.png';
                  }}
                />
                <div className="banner-brand-text">
                  <div className="banner-brand-name">
                    TECH<span>RIZERS</span>
                  </div>
                  <div className="banner-brand-tagline">CRAFT • BUILD • RISE</div>
                </div>
              </div>

              <div className="banner-headings">
                <h2 className="banner-power-title">
                  AI. SOFTWARE.<br />
                  AUTOMATION.<br />
                  <span className="banner-glow-gradient">DIGITAL PRODUCTS.</span>
                </h2>
                <p className="banner-mission-text">
                  Building Digital Solutions That Drive{' '}
                  <strong>Growth, Efficiency &amp; Innovation.</strong>
                </p>
              </div>

              <div className="banner-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => openProjectModal()}
                >
                  Start a Project
                </button>
                <a
                  href="#services"
                  className="btn outline"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}
                >
                  Explore Capabilities ↓
                </a>
              </div>
            </div>

            {/* Right: Interactive Futuristic Workspace & Floating Moving Badges */}
            <div className="tech-banner-visual-col">
              <div className="interactive-workspace-canvas">
                {/* World Grid & Ambient Glow Background */}
                <div className="workspace-ambient-glow" />
                <div className="workspace-map-grid" />

                {/* Central Laptop Screen Frame */}
                <div className="banner-laptop-frame">
                  <div className="laptop-top-bar">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                    <span className="laptop-title">techrizers-engine · main.py</span>
                  </div>
                  <div className="laptop-screen-content">
                    <div className="code-line"><span className="c-blue">import</span> {'{ AI, Mobile, Cloud, UIUX }'} <span className="c-blue">from</span> <span className="c-green">'@techrizers/core'</span>;</div>
                    <div className="code-line"><span className="c-purple">const</span> engine = <span className="c-yellow">new TechRizers</span>();</div>
                    <div className="code-line">engine.<span className="c-yellow">deploySolution</span>({'{'}</div>
                    <div className="code-line ind"><span className="c-cyan">aiModels</span>: [<span className="c-green">'LLM'</span>, <span className="c-green">'Vision'</span>, <span className="c-green">'Agents'</span>],</div>
                    <div className="code-line ind"><span className="c-cyan">platforms</span>: [<span className="c-green">'iOS'</span>, <span className="c-green">'Android'</span>, <span className="c-green">'Web'</span>],</div>
                    <div className="code-line ind"><span className="c-cyan">status</span>: <span className="c-green">'Ready For Production'</span></div>
                    <div className="code-line">{'}'});</div>
                    <div className="code-status">● System Operational · High-Availability</div>
                  </div>
                </div>

                {/* Floating Neon Badges from the Reference Image */}
                {floatingBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`floating-neon-badge ${activeBadge === badge.id ? 'active' : ''}`}
                    style={{
                      ...badge.pos,
                      '--badge-color': badge.color,
                      animationDelay: badge.pulseDelay
                    }}
                    onMouseEnter={() => setActiveBadge(badge.id)}
                    onMouseLeave={() => setActiveBadge(null)}
                    onClick={() => openProjectModal({ service: badge.label })}
                    role="button"
                    tabIndex={0}
                    title={badge.desc}
                  >
                    <div className="neon-badge-pulse" />
                    <span className="neon-badge-icon">{badge.icon}</span>
                    <span className="neon-badge-label">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Ribbon: 6 Services directly from the reference picture */}
          <div className="tech-banner-ribbon">
            {servicesRibbon.map((item, idx) => (
              <div
                key={`ribbon-${idx}`}
                className="ribbon-service-card"
                onClick={() => openProjectModal({ service: item.title })}
                role="button"
                tabIndex={0}
              >
                <div className="ribbon-icon">{item.icon}</div>
                <div className="ribbon-content">
                  <div className="ribbon-title">{item.title}</div>
                  <div className="ribbon-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Contact / Direct Collaboration Bar */}
          <div className="tech-banner-footer-strip">
            <div className="strip-col-left">
              <span className="strip-icon">✦</span>
              <span>
                Let's Build Something Amazing Together. <strong>Your Idea. Our Innovation. Real Results.</strong>
              </span>
            </div>
            <div className="strip-col-right">
              <a
                href="https://wa.me/918308367073?text=Hi%20TechRizers%2C%20I%20am%20interested%20in%20building%20a%20digital%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="strip-contact-link"
              >
                <span className="wa-icon-mini">💬</span> +91 83083 67073
              </a>
              <span className="strip-divider">|</span>
              <button
                type="button"
                className="strip-cta-btn"
                onClick={() => openProjectModal()}
              >
                Start Project Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
