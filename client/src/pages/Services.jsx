import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { useModal } from '../context/ModalContext';
import Card3D from '../components/Card3D';

export default function Services() {
  const { openProjectModal } = useModal();

  return (
    <>
      <section className="pagehero">
        <div className="container">
          <span className="kicker">TECHRIZERS SERVICES</span>
          <h1>Technology Solutions Built for Your Next Stage of Growth</h1>
          <p>
            From websites and SaaS platforms to AI systems, mobile apps and business automation, TechRizers helps startups and businesses design, build and scale reliable digital products.
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              onClick={() => openProjectModal()}
            >
              Start Your Project
            </button>
            <a className="btn outline" href="#services">
              Explore All 6 Services
            </a>
          </div>
        </div>
      </section>

      {/* All 6 Services Cards */}
      <section className="section" id="services">
        <div className="container">
          <div className="grid three">
            {services.map((s) => (
              <Card3D key={s.id} maxTilt={8}>
                <article className="servicecard card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="service-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="num" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>{s.num}</span>
                    <span className="icon" style={{ fontSize: '24px' }}>{s.icon}</span>
                  </div>
                  <h2>{s.name}</h2>
                  <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
                    {s.short}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', background: 'var(--card-hover-bg)', padding: '8px 12px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--secondary-text)' }}>Starting from</span>
                    <strong style={{ color: 'var(--primary-blue)', fontSize: '14px' }}>{s.startingPrice}</strong>
                  </div>

                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                    Key capabilities
                  </h4>
                  <div className="chips" style={{ marginBottom: '24px' }}>
                    {s.capabilities.slice(0, 5).map((x) => (
                      <span key={x} style={{ fontSize: '12px' }}>{x}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <Link className="btn outline small" to={`/services/${s.slug}`} style={{ flex: 1, textAlign: 'center' }}>
                      Explore Service →
                    </Link>
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => openProjectModal({ service: s.name })}
                    >
                      Get Quote
                    </button>
                  </div>
                </article>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Real Business Problems */}
      <section className="section section-soft tight">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">BUSINESS SOLUTIONS</span>
            <h2>Solutions that connect technology to measurable outcomes.</h2>
            <p>We scope systems that solve specific operational and commercial bottlenecks.</p>
          </div>
          <div className="grid four">
            {[
              ['Startup MVP', 'Validate market traction rapidly with a production-ready foundation.'],
              ['SaaS Product', 'Multi-tenant architecture with automated recurring billing and analytics.'],
              ['E-commerce', 'High-speed headless storefronts with integrated payment gateways.'],
              ['Business Automation', 'Eliminate manual data re-entry and streamline workflow handoffs.'],
              ['AI Support Bots', 'Ground conversational AI strictly on your company documentation.'],
              ['Internal Portals', 'Secure dashboards and tools tailored to your operational workflows.'],
              ['Mobile Applications', 'Smooth native apps for Android and iOS with offline synchronization.'],
              ['Enterprise Systems', 'Modular, high-concurrency systems with audit logging and RBAC.']
            ].map(([title, desc], i) => (
              <div className="card" key={title} style={{ height: '100%' }}>
                <span className="num" style={{ color: 'var(--primary-blue)', fontWeight: 700 }}>0{i + 1}</span>
                <h3 style={{ marginTop: '8px', marginBottom: '6px', fontSize: '17px' }}>{title}</h3>
                <p style={{ color: 'var(--secondary-text)', fontSize: '13px', lineHeight: '1.5' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section tight">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">DEVELOPMENT PROCESS</span>
            <h2>A clear six-step path from idea to launch.</h2>
            <p>Transparent milestones, weekly sprint reviews, and accountable delivery.</p>
          </div>
          <div className="timeline">
            {[
              ['01', 'Discovery', 'Understand business goals, target audience, and precise technical requirements.'],
              ['02', 'Strategy', 'Define system architecture, database models, API contracts, and delivery roadmap.'],
              ['03', 'Design', 'Create intuitive UI/UX, user flows, responsive states, and clickable Figma prototypes.'],
              ['04', 'Development', 'Sprint-based engineering of frontend, backend, APIs, database, and integrations.'],
              ['05', 'Testing & QA', 'Rigorous manual and automated test suites, security checks, and cross-device QA.'],
              ['06', 'Deployment & Scale', 'Zero-downtime cloud launch, monitoring setup, automated backups, and handover.']
            ].map(([num, title, desc]) => (
              <div className="step" key={num}>
                <b>{num}</b>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section section-soft">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">TECHNOLOGY STACK</span>
            <h2>Modern tools, selected for the job.</h2>
            <p>Battle-tested languages, frameworks, and cloud infrastructure engineered for reliability.</p>
          </div>
          <div className="stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL',
              'MongoDB', 'Redis', 'Flutter', 'React Native', 'AWS', 'Docker', 'GitHub Actions',
              'RAG & Vector DBs', 'LangChain', 'PhonePe PG', 'Stripe'
            ].map((x) => (
              <span key={x} className="tech-badge" style={{ padding: '8px 16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 600, fontSize: '14px' }}>
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment & Support */}
      <section className="section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">DEPLOYMENT & CLOUD SERVICES</span>
            <h2>Launch cleanly. Keep improving.</h2>
            <p>Enterprise infrastructure provisioning, continuous deployment, and proactive support retainers.</p>
          </div>
          <div className="grid four">
            {[
              ['Basic Cloud Deployment', '₹10,000+'],
              ['Cloud Setup (AWS/GCP)', '₹15,000+'],
              ['CI/CD Pipeline Setup', '₹20,000+'],
              ['Docker Containerization', '₹15,000+'],
              ['Database Provisioning', '₹10,000+'],
              ['SSL & Domain Security', '₹5,000+'],
              ['Monitoring & Alerting', '₹10,000+'],
              ['Monthly SLA Retainer', 'Custom']
            ].map(([name, price]) => (
              <div className="card" key={name}>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{name}</h3>
                <strong style={{ color: 'var(--primary-blue)', fontSize: '18px' }}>{price}</strong>
              </div>
            ))}
          </div>
          <p className="note" style={{ marginTop: '24px', textAlign: 'center' }}>
            Cloud provider charges, domain fees, hosting fees, API costs, and third-party subscriptions are billed separately.
          </p>
        </div>
      </section>

      {/* CTA Band */}
      <section className="section section-navy" style={{ background: '#0F172A', color: '#FFFFFF' }}>
        <div className="container">
          <div className="ctaband" style={{ background: 'transparent', border: 'none', textAlign: 'center' }}>
            <h2 style={{ color: '#FFFFFF' }}>Have an Idea? Let's Build It.</h2>
            <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '12px auto 28px' }}>
              Tell us what you're trying to build. We'll help you choose the right technology, scope the project, and outline a realistic milestone schedule.
            </p>
            <button
              type="button"
              className="btn primary"
              onClick={() => openProjectModal()}
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
