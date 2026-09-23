import { Link } from 'react-router-dom';
import { services, cases } from '../data/services';
import ThreeHeroCanvas from '../components/ThreeHeroCanvas';
import Card3D from '../components/Card3D';
import FAQAccordion from '../components/FAQAccordion';
import MovingLogosTicker from '../components/MovingLogosTicker';
import ReferenceTechBanner from '../components/ReferenceTechBanner';
import { useModal } from '../context/ModalContext';

export default function Home() {
  const { openProjectModal } = useModal();

  const scrollToServices = (e) => {
    e.preventDefault();
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/services';
    }
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container herogrid">
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}>
              <span className="eyebrow-badge">Pune, India · Technology & Digital Solutions</span>
            </div>
            <h1>
              Digital Solutions That <span>Move Your Business Forward.</span>
            </h1>
            <p>
              High-performance web applications, AI solutions and digital systems built around real business needs.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal()}
              >
                Start a Project
              </button>
              <a
                className="btn outline"
                href="#services"
                onClick={scrollToServices}
              >
                Explore Our Services
              </a>
            </div>
            <div className="proof">
              <b>
                24/7 Support<small>Dedicated assistance & reliability</small>
              </b>
              <b>
                Business-focused<small>Engineered for measurable ROI</small>
              </b>
              <b>
                Scalable technology<small>Built to grow with your product</small>
              </b>
            </div>
          </div>

          <div className="three-canvas-frame">
            <ThreeHeroCanvas height={440} />
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS MOVING LOGOS & TECH STACK TICKER */}
      <MovingLogosTicker />

      {/* 3. TRUST / CREDIBILITY STRIP */}
      <div className="trust">
        <div className="container">
          <span>🛡️ 100% Code & IP Ownership</span>
          <span>⚡ Scalable Cloud & AI Engineering</span>
          <span>✦ Transparent Milestone Delivery</span>
          <span>💬 Direct WhatsApp Engineering Channel</span>
        </div>
      </div>

      {/* 4. REFERENCE TECH SHOWCASE BANNER (AI, Software, Automation, Digital Products) */}
      <ReferenceTechBanner />

      {/* 5. ABOUT US PREVIEW */}
      <section className="section section-soft">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">ABOUT TECHRIZERS</span>
            <h2>Technology Built Around Your Business</h2>
            <p>
              We combine software engineering, thoughtful design, and artificial intelligence to build software that solves real business challenges.
            </p>
          </div>

          <div className="grid three">
            <Card3D maxTilt={10}>
              <div className="card about-preview-card" style={{ height: '100%' }}>
                <div className="icon pop-3d-2">🎯</div>
                <h3 className="pop-3d-1">Business First</h3>
                <p>Software designed to solve real business challenges, not just follow trends.</p>
              </div>
            </Card3D>
            <Card3D maxTilt={10}>
              <div className="card about-preview-card" style={{ height: '100%' }}>
                <div className="icon pop-3d-2">⚡</div>
                <h3 className="pop-3d-1">Scalable Technology</h3>
                <p>Architecture that grows with your users, data and business needs.</p>
              </div>
            </Card3D>
            <Card3D maxTilt={10}>
              <div className="card about-preview-card" style={{ height: '100%' }}>
                <div className="icon pop-3d-2">🤝</div>
                <h3 className="pop-3d-1">Long-Term Partnership</h3>
                <p>We support, maintain and optimize your product after launch.</p>
              </div>
            </Card3D>
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn primary"
              onClick={() => openProjectModal()}
            >
              Work With Us
            </button>
            <Link className="btn outline" to="/about">
              Learn More About TechRizers →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (All 6 Services) */}
      <section className="section section-white" id="services">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">WHAT WE BUILD</span>
            <h2>Complete Digital Solutions Under One Roof</h2>
            <p>
              From websites and SaaS platforms to AI systems, mobile apps and business automation, we design, build and scale reliable digital products.
            </p>
          </div>

          <div className="grid three">
            {services.map((s) => (
              <Card3D key={s.id} maxTilt={10}>
                <article className="card servicecard" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="service-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span className="icon pop-3d-2" style={{ fontSize: '26px' }}>{s.icon}</span>
                    <span className="num" style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '14px' }}>{s.num}</span>
                  </div>
                  <h3 className="pop-3d-1" style={{ marginBottom: '10px' }}>{s.name}</h3>
                  <p style={{ flex: 1, marginBottom: '16px', color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6' }}>
                    {s.short}
                  </p>
                  <div className="chips" style={{ marginBottom: '20px' }}>
                    {s.capabilities.slice(0, 4).map((c) => (
                      <span key={c} style={{ fontSize: '12px', padding: '3px 8px' }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: 'auto' }}>
                    <Link className="btn outline small" to={`/services/${s.slug}`} style={{ flex: 1, textAlign: 'center' }}>
                      Explore Service →
                    </Link>
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => openProjectModal({ service: s.name })}
                      title="Get a Quote for this service"
                    >
                      Get Quote
                    </button>
                  </div>
                </article>
              </Card3D>
            ))}
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <Link className="btn outline" to="/services">
              View All Services & Specifications →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. STRATEGIC DARK NAVY SECTION */}
      <section className="section section-navy">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker" style={{ color: '#38BDF8' }}>WHY TECHRIZERS · STRATEGIC ADVANTAGE</span>
            <h2>Smart Technology, Made Refreshingly Straightforward.</h2>
            <p style={{ color: '#CBD5E1' }}>
              You get senior technical thinking, transparent communication, and accountable delivery guided by CRAFT • BUILD • RISE.
            </p>
          </div>
          <div className="grid four">
            {[
              ['Craft', 'Deep technical care across the product lifecycle, from resilient architecture to interface detail.'],
              ['Build', 'Strategy and software shaped around tangible business metrics, never generic boilerplate templates.'],
              ['Rise', 'Visible sprint milestones, honest advisory, and reliable delivery you can hold us accountable to.'],
              ['Partnership', 'Long-term support that continues beyond launch through proactive monitoring and continuous iteration.']
            ].map(([title, desc], idx) => (
              <Card3D key={title} maxTilt={10}>
                <div
                  className="card"
                  style={{
                    height: '100%',
                    background: '#1E293B',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }}
                >
                  <div className="num pop-3d-2" style={{ color: '#38BDF8' }}>0{idx + 1}</div>
                  <h3 className="pop-3d-1" style={{ marginTop: '8px', color: '#FFFFFF' }}>{title}</h3>
                  <p style={{ color: '#CBD5E1' }}>{desc}</p>
                </div>
              </Card3D>
            ))}
          </div>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link className="btn primary" to="/about">
              Learn More About TechRizers →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PROJECTS / CASE STUDIES */}
      <section className="section section-white">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">SELECTED WORK</span>
            <h2>Complex Challenges. Clean, Measurable Results.</h2>
            <p>Proven enterprise digital products delivered across web, mobile, and intelligent cloud systems.</p>
          </div>
          <div className="grid three">
            {cases.slice(0, 6).map((c) => {
              const techList = c.technologies || c.tech || [];
              const github = c.githubUrl || c.github;
              const demo = c.liveDemoUrl || c.demo;

              return (
                <Card3D key={c.slug} maxTilt={6}>
                  <article className="case-study-card card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div
                      className="project-thumb-frame"
                      style={{
                        height: '140px',
                        borderRadius: '10px',
                        marginBottom: '14px',
                        background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '12px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.6px',
                            color: 'var(--cyan-accent)',
                            background: 'rgba(15, 23, 42, 0.85)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '999px',
                            padding: '3px 9px'
                          }}
                        >
                          {c.category}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#10B981',
                            background: 'rgba(16, 185, 129, 0.15)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '999px',
                            padding: '2px 8px'
                          }}
                        >
                          ● {c.status || 'Delivered'}
                        </span>
                      </div>
                      <div style={{ zIndex: 2 }}>
                        <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {c.subCategory}
                        </span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '19px', margin: '0 0 8px', color: 'var(--dark-navy)' }}>{c.title}</h3>
                    <p style={{ flex: 1, color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.55', margin: '0 0 14px' }}>
                      {c.description}
                    </p>

                    <div className="chips" style={{ marginBottom: '16px' }}>
                      {techList.slice(0, 4).map((t) => (
                        <span key={t} style={{ fontSize: '11px', padding: '3px 9px' }}>{t}</span>
                      ))}
                    </div>

                    <div
                      className="case-card-actions"
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        marginTop: 'auto',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--border-color)'
                      }}
                    >
                      <Link to={`/case-studies/${c.slug}`} className="btn primary small" style={{ flex: '1 1 auto', textAlign: 'center' }}>
                        View Case Study →
                      </Link>
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn outline small"
                          title="View GitHub Repository"
                          style={{ padding: '7px 10px' }}
                        >
                          GitHub ↗
                        </a>
                      )}
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn ghost small"
                          title="View Live Demo"
                          style={{ padding: '7px 10px' }}
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </article>
                </Card3D>
              );
            })}
          </div>
          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <Link className="btn outline" to="/case-studies">
              View All Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="section section-soft">
        <div className="container twocol">
          <blockquote className="quote">
            “The TechRizers team understood our business problem before writing a line of code. The result is a secure, 
            high-performance platform that our enterprise clients genuinely depend on every single day.”
            <cite>— Aditi S., Operations Director</cite>
          </blockquote>
          <Card3D maxTilt={8}>
            <div className="card">
              <h3 className="pop-3d-1">Ready to build something extraordinary?</h3>
              <p>
                Tell us where you want to take your business. We'll bring senior software architecture, AI engineering, and delivery expertise to get you there.
              </p>
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => openProjectModal()}
                >
                  Start a Conversation
                </button>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* 8. FAQ ACCORDION (Section 17) */}
      <section className="section section-white" id="faq">
        <div className="container narrow">
          <div className="sectionhead center-head">
            <span className="kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Clear Answers to Common Questions</h2>
            <p>Everything you need to know about our engagement model, timelines, pricing, and process.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="section section-navy" style={{ background: '#0F172A', color: '#FFFFFF' }}>
        <div className="container">
          <div className="ctaband" style={{ background: 'transparent', border: 'none', textAlign: 'center' }}>
            <h2 style={{ color: '#FFFFFF' }}>Let's build something that moves your business forward.</h2>
            <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '0 auto 28px' }}>
              From initial architecture to daily operations, get a clear technical roadmap, transparent pricing, and a team that delivers.
            </p>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal()}
              >
                Start a Project
              </button>
              <Link
                className="btn"
                to="/pricing"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}
              >
                See Pricing & Models
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
