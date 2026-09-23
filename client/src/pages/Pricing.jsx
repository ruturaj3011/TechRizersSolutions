import { useState } from 'react';
import { Link } from 'react-router-dom';
import { pricingCategories, pricingDisclaimer } from '../data/pricingData';
import { useModal } from '../context/ModalContext';
import Card3D from '../components/Card3D';

export default function Pricing() {
  const { openProjectModal } = useModal();
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredCategories = selectedCat === 'all'
    ? pricingCategories
    : pricingCategories.filter((c) => c.id === selectedCat);

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <span className="kicker">TRANSPARENT & HONEST PRICING</span>
          <h1>Starting points, not artificial fixed prices.</h1>
          <p>
            Every project is scoped individually based on business requirements, architectural depth, integrations, and delivery timelines.
          </p>
          <div className="actions" style={{ marginTop: '24px' }}>
            <button
              type="button"
              className="btn primary"
              onClick={() => openProjectModal()}
            >
              Get a Custom Scope
            </button>
            <a
              className="btn outline"
              href="https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20would%20like%20a%20pricing%20consultation."
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <div className="filter-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              className={`filter-tab ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCat('all')}
            >
              All Categories ({pricingCategories.length})
            </button>
            {pricingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`filter-tab ${selectedCat === c.id ? 'active' : ''}`}
                onClick={() => setSelectedCat(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="container">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="pricing-category-block" style={{ marginBottom: '64px' }}>
              <div className="pricing-category-header" style={{ marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="kicker" style={{ margin: 0 }}>CATEGORY {cat.num}</span>
                </div>
                <h2 style={{ fontSize: '28px', marginTop: '6px', marginBottom: '8px' }}>{cat.name}</h2>
                <p style={{ color: 'var(--secondary-text)', maxWidth: '720px' }}>{cat.description}</p>
              </div>

              <div className="grid three">
                {cat.items.map((pkg) => (
                  <Card3D key={pkg.name} maxTilt={8}>
                    <div
                      className="card pricing-package-card"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        borderColor: pkg.popular ? 'var(--primary-blue)' : undefined,
                        boxShadow: pkg.popular ? '0 8px 24px rgba(37, 99, 235, 0.15)' : undefined
                      }}
                    >
                      {pkg.popular && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '20px',
                            background: 'var(--primary-blue)',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                          }}
                        >
                          Popular Choice
                        </div>
                      )}

                      <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{pkg.name}</h3>
                      <p style={{ color: 'var(--secondary-text)', fontSize: '13px', lineHeight: '1.5', flex: 1, marginBottom: '20px' }}>
                        {pkg.desc}
                      </p>

                      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--secondary-text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Starting at
                          </span>
                          <strong style={{ fontSize: '22px', color: 'var(--primary-blue)' }}>
                            {pkg.price}
                          </strong>
                        </div>

                        <button
                          type="button"
                          className={`btn small full ${pkg.popular ? 'primary' : 'outline'}`}
                          onClick={() =>
                            openProjectModal({
                              service: cat.name,
                              package: pkg.name,
                              budget: pkg.price
                            })
                          }
                          style={{ width: '100%' }}
                        >
                          Get a Quote →
                        </button>
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>
          ))}

          {/* Pricing Disclaimer Card */}
          <div className="note card" style={{ marginTop: '24px', background: 'var(--card-hover-bg)' }}>
            <h4 style={{ marginBottom: '8px', color: 'var(--primary-text)' }}>⚠️ Scope & Infrastructure Notice</h4>
            <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6' }}>
              {pricingDisclaimer}
            </p>
          </div>

          {/* Custom Quote Box */}
          <div
            className="card"
            style={{
              marginTop: '40px',
              padding: '36px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.05), rgba(56,189,248,0.05))',
              borderColor: 'rgba(37, 99, 235, 0.2)'
            }}
          >
            <h2>Need something custom or enterprise-scale?</h2>
            <p style={{ maxWidth: '640px', margin: '12px auto 24px', color: 'var(--secondary-text)' }}>
              We structure custom milestone-driven contracts for complex software engineering, dedicated development squads, and multi-system integrations.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal({ service: 'Custom Software Development' })}
              >
                Request Custom Proposal
              </button>
              <Link to="/contact" className="btn outline">
                Contact Our Engineers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
