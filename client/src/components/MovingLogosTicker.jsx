import React from 'react';
import { useModal } from '../context/ModalContext';

export default function MovingLogosTicker() {
  const { openProjectModal } = useModal();

  // Core Service & Domain Badges from the Reference Image
  const domainBadges = [
    {
      id: 'ai',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z" />
          <path d="M6 13a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4z" />
          <path d="M18 13a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4z" />
          <path d="m9 8 3 5 3-5" />
          <path d="m6 18 6 3 6-3" />
        </svg>
      ),
      label: 'AI SOLUTIONS',
      sub: 'Chatbots · LLM Agents · ML',
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.35)'
    },
    {
      id: 'mobile',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      label: 'MOBILE APP DEVELOPMENT',
      sub: 'iOS & Android · Flutter · React Native',
      color: '#60A5FA',
      glow: 'rgba(96, 165, 250, 0.35)'
    },
    {
      id: 'uiux',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      ),
      label: 'UI/UX DESIGN',
      sub: 'Figma · Prototyping · Systems',
      color: '#F43F5E',
      glow: 'rgba(244, 63, 94, 0.35)'
    },
    {
      id: 'software',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      label: 'SOFTWARE DEVELOPMENT',
      sub: 'Custom SaaS · Microservices · APIs',
      color: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.35)'
    },
    {
      id: 'cloud',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
      label: 'CLOUD & DEVOPS',
      sub: 'AWS · Docker · CI/CD Pipelines',
      color: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.35)'
    },
    {
      id: 'automation',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
      ),
      label: 'BUSINESS AUTOMATION',
      sub: 'Workflow Engines · RPA · Integrations',
      color: '#10B981',
      glow: 'rgba(16, 185, 129, 0.35)'
    },
    {
      id: 'web',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      label: 'WEB DEVELOPMENT',
      sub: 'Fast, Modern & Scalable Apps',
      color: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.35)'
    }
  ];

  // Enterprise Tech Logos (moving in reverse track)
  const techLogos = [
    { name: 'OpenAI / AI Models', category: 'AI', iconText: '🧠 OpenAI' },
    { name: 'Google Gemini', category: 'AI', iconText: '✦ Gemini' },
    { name: 'Flutter', category: 'Mobile App', iconText: '📱 Flutter' },
    { name: 'React Native', category: 'Mobile App', iconText: '⚛ React Native' },
    { name: 'iOS & Swift', category: 'Mobile App', iconText: '🍎 iOS Native' },
    { name: 'Android Kotlin', category: 'Mobile App', iconText: '🤖 Android' },
    { name: 'Figma', category: 'UI/UX', iconText: '🎨 Figma' },
    { name: 'React.js', category: 'Web & SaaS', iconText: '⚛ React' },
    { name: 'Next.js', category: 'Web & SaaS', iconText: '▲ Next.js' },
    { name: 'Node.js', category: 'Backend', iconText: '🟢 Node.js' },
    { name: 'Python', category: 'AI & Backend', iconText: '🐍 Python' },
    { name: 'Docker', category: 'DevOps', iconText: '🐳 Docker' },
    { name: 'AWS Cloud', category: 'Cloud', iconText: '☁ AWS' },
    { name: 'PostgreSQL', category: 'Database', iconText: '🐘 PostgreSQL' }
  ];

  return (
    <section className="moving-logos-section" aria-label="Moving Tech & Service Logos">
      <div className="container" style={{ marginBottom: '16px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-pulse-dot" />
          <span className="eyebrow-badge" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB', borderColor: 'rgba(37,99,235,0.2)' }}>
            POWERING ENTERPRISE DIGITAL SOLUTIONS
          </span>
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--dark-navy)', marginTop: '8px', marginBottom: '4px' }}>
          AI · Mobile Apps · UI/UX · Software · Automation · Cloud
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--secondary-text)', margin: '0 auto' }}>
          Continuous Moving Badges & Tech Stack · Hover to pause · Click any to inquire
        </p>
      </div>

      {/* TRACK 1: Forward Infinite Scroll (Domains & Badges from Reference Image) */}
      <div className="moving-marquee-wrapper" tabIndex={0} aria-label="Services & Domains Marquee">
        <div className="moving-marquee-track track-forward">
          {/* Repeat array for seamless 100% infinite loop */}
          {[...domainBadges, ...domainBadges, ...domainBadges].map((item, idx) => (
            <div
              key={`domain-${item.id}-${idx}`}
              className="moving-badge-card"
              style={{
                '--badge-color': item.color,
                '--badge-glow': item.glow
              }}
              onClick={() => openProjectModal({ service: item.label })}
              title={`Click to discuss ${item.label}`}
              role="button"
              tabIndex={0}
            >
              <div className="moving-badge-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="moving-badge-info">
                <span className="moving-badge-title">{item.label}</span>
                <span className="moving-badge-sub">{item.sub}</span>
              </div>
              <span className="moving-badge-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* TRACK 2: Reverse Infinite Scroll (Technologies & Platforms) */}
      <div className="moving-marquee-wrapper secondary-track" tabIndex={0} aria-label="Technology Stack Marquee">
        <div className="moving-marquee-track track-reverse">
          {/* Repeat array for seamless 100% infinite loop */}
          {[...techLogos, ...techLogos, ...techLogos].map((tech, idx) => (
            <div
              key={`tech-${tech.name}-${idx}`}
              className="moving-tech-pill"
              onClick={() => openProjectModal({ service: tech.category })}
              role="button"
              tabIndex={0}
            >
              <span className="tech-pill-name">{tech.iconText}</span>
              <span className="tech-pill-cat">{tech.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
