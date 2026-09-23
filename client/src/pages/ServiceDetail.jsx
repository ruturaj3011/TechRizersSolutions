import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { services } from '../data/services';
import { useModal } from '../context/ModalContext';
import Card3D from '../components/Card3D';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { openProjectModal } = useModal();
  const [openFaq, setOpenFaq] = useState(null);

  const s = services.find((x) => x.slug === slug);

  if (!s) {
    return (
      <div className="container empty-section" style={{ minHeight: '60vh', textAlign: 'center', padding: '80px 20px' }}>
        <h1>Service not found</h1>
        <p style={{ color: 'var(--secondary-text)', margin: '16px 0 24px' }}>
          The requested service page does not exist.
        </p>
        <Link to="/services" className="btn primary">
          ← Back to All Services
        </Link>
      </div>
    );
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* Service Hero */}
      <section className="pagehero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="kicker" style={{ margin: 0 }}>SERVICE {s.num}</span>
            <span style={{ fontSize: '20px' }}>{s.icon}</span>
          </div>
          <h1>{s.name}</h1>
          <p style={{ maxWidth: '780px' }}>{s.short}</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', margin: '20px 0 28px' }}>
            <div className="meta-badge" style={{ background: 'var(--card-hover-bg)', padding: '6px 14px', borderRadius: '6px', fontSize: '13px' }}>
              <strong>Starting from: </strong> <span style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>{s.startingPrice}</span>
            </div>
            <div className="meta-badge" style={{ background: 'var(--card-hover-bg)', padding: '6px 14px', borderRadius: '6px', fontSize: '13px' }}>
              <strong>Typical Timeline: </strong> {s.typicalTimeline}
            </div>
          </div>

          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => openProjectModal({ service: s.name })}
            >
              Get a Quote for this Service
            </button>
            <a
              className="btn outline"
              href={`https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20would%20like%20to%20discuss%20${encodeURIComponent(s.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Inquire via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Overview & What We Build */}
      <section className="section">
        <div className="container twocol">
          <div>
            <span className="kicker">OVERVIEW & SCOPE</span>
            <h2>Technology aligned with the way your business works.</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--secondary-text)', marginBottom: '24px' }}>
              {s.overview}
            </p>

            <h3 style={{ marginBottom: '16px' }}>What We Build</h3>
            <ul className="bullets" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {s.whatWeBuild.map((item) => (
                <li key={item} style={{ fontSize: '14px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Pricing & Packages sidebar */}
          <div className="card" style={{ height: 'fit-content' }}>
            <span className="kicker">STARTING PACKAGES</span>
            <h3 style={{ marginBottom: '16px' }}>Estimated Starting Points</h3>
            <div className="price-list">
              {s.packages.map(([name, price]) => (
                <div
                  key={name}
                  className="price-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  <span style={{ fontSize: '14px', color: 'var(--primary-text)' }}>{name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ color: 'var(--primary-blue)', fontSize: '14px' }}>{price}</strong>
                    <button
                      type="button"
                      className="btn ghost small"
                      onClick={() => openProjectModal({ service: s.name, package: name, budget: price })}
                      style={{ padding: '2px 8px', fontSize: '11px' }}
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="note" style={{ marginTop: '16px', fontSize: '12px' }}>
              Every project is scoped individually based on exact requirements, integrations, and delivery speed.
            </p>
            <button
              type="button"
              className="btn primary full"
              onClick={() => openProjectModal({ service: s.name })}
              style={{ width: '100%', marginTop: '12px' }}
            >
              Request Scoping Call
            </button>
          </div>
        </div>
      </section>

      {/* Core Features & Deliverables */}
      <section className="section section-soft tight">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">CORE CAPABILITIES</span>
            <h2>Architectural Features & Deliverables</h2>
            <p>Every solution is built with production standards, clean code, and zero compromises.</p>
          </div>

          <div className="grid three">
            {s.features.map((feat, idx) => (
              <div className="card" key={feat}>
                <span className="num" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>0{idx + 1}</span>
                <h3 style={{ fontSize: '16px', marginTop: '8px' }}>{feat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">HOW WE DELIVER</span>
            <h2>Our Structured 4-Step Engineering Cycle</h2>
            <p>Clear milestones, visible deliverables, and reliable delivery.</p>
          </div>

          <div className="grid four">
            {s.process.map((step) => (
              <div className="card" key={step.step} style={{ height: '100%' }}>
                <span className="num" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>Step {step.step}</span>
                <h3 style={{ marginTop: '8px', marginBottom: '8px', fontSize: '17px' }}>{step.title}</h3>
                <p style={{ color: 'var(--secondary-text)', fontSize: '13px', lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section section-soft tight">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">TECHNOLOGY ARSENAL</span>
            <h2>Tools & Frameworks for {s.name}</h2>
          </div>
          <div className="stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {s.technology.map((tech) => (
              <span key={tech} className="tech-badge" style={{ padding: '8px 16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      {s.faqs && s.faqs.length > 0 && (
        <section className="section">
          <div className="container narrow">
            <div className="sectionhead center-head">
              <span className="kicker">SERVICE FAQS</span>
              <h2>Common Questions About {s.name}</h2>
            </div>
            <div className="faq-list">
              {s.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className={`faq-item card ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleFaq(idx)}
                    style={{ cursor: 'pointer', marginBottom: '10px' }}
                  >
                    <div className="faq-question" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '16px', margin: 0 }}>{faq.q}</h3>
                      <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-blue)' }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                    {isOpen && (
                      <div className="faq-answer" style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                        <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Band */}
      <section className="section section-navy" style={{ background: '#0F172A', color: '#FFFFFF' }}>
        <div className="container">
          <div className="ctaband" style={{ background: 'transparent', border: 'none', textAlign: 'center' }}>
            <h2 style={{ color: '#FFFFFF' }}>Ready to discuss {s.name}?</h2>
            <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '12px auto 28px' }}>
              Tell us what you're building and we'll help define the right architectural scope and milestone estimate.
            </p>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal({ service: s.name })}
              >
                Request a Quote
              </button>
              <Link to="/pricing" className="btn outline" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                View All Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
