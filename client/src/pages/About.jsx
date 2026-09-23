import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeHeroCanvas from '../components/ThreeHeroCanvas';
import Card3D from '../components/Card3D';
import FAQAccordion from '../components/FAQAccordion';
import { useModal } from '../context/ModalContext';
import { getAssetUrl } from '../utils/assetUrl';

const STORY_STEPS = [
  {
    num: '01',
    title: 'The Idea',
    desc: 'Understanding the core business problem, user pain points, and strategic market opportunity.'
  },
  {
    num: '02',
    title: 'The Strategy',
    desc: 'Defining the optimal technology architecture, product roadmap, and technical milestones.'
  },
  {
    num: '03',
    title: 'The Build',
    desc: 'Designing intuitive interfaces and engineering resilient frontend, backend, and data systems.'
  },
  {
    num: '04',
    title: 'The Launch',
    desc: 'Deploying reliable, production-ready technology with automated testing, CI/CD, and monitoring.'
  },
  {
    num: '05',
    title: 'The Growth',
    desc: 'Continuously monitoring, scaling, integrating AI capabilities, and evolving the product.'
  }
];

const SERVICES_PREVIEW = [
  {
    slug: 'web-saas',
    icon: '⌘',
    title: 'Web & SaaS Development',
    desc: 'Modern websites, SaaS platforms, dashboards, and scalable web applications built for performance and growth.'
  },
  {
    slug: 'mobile-app',
    icon: '◫',
    title: 'Mobile App Development',
    desc: 'User-focused mobile applications designed for Android, iOS, and cross-platform environments.'
  },
  {
    slug: 'ai-solutions',
    icon: '✦',
    title: 'AI Solutions & Chatbots',
    desc: 'Intelligent AI systems, conversational assistants, RAG solutions, and LLM-powered applications.'
  },
  {
    slug: 'custom-software',
    icon: '▣',
    title: 'Custom Software Development',
    desc: 'Purpose-built software designed around specific business workflows, internal portals, and operations.'
  },
  {
    slug: 'ui-ux',
    icon: '◇',
    title: 'UI/UX Design',
    desc: 'Clean, intuitive interfaces that combine usability, modern aesthetics, and clear business conversion.'
  },
  {
    slug: 'automation',
    icon: '⚡',
    title: 'Automation & Digital Systems',
    desc: 'Automation solutions that reduce repetitive work, connect systems, and improve operational efficiency.'
  }
];

const VALUES = [
  {
    num: '01',
    title: 'Customer First',
    desc: 'We start by understanding the problem before choosing the technology.'
  },
  {
    num: '02',
    title: 'Innovation',
    desc: 'We continuously explore better ways to solve complex problems.'
  },
  {
    num: '03',
    title: 'Quality',
    desc: 'We focus on reliable, maintainable, and thoughtfully engineered solutions.'
  },
  {
    num: '04',
    title: 'Transparency',
    desc: 'Clear communication and honest collaboration are central to how we work.'
  },
  {
    num: '05',
    title: 'Ownership',
    desc: 'We take responsibility for the work we build and the outcomes we aim to create.'
  },
  {
    num: '06',
    title: 'Continuous Growth',
    desc: 'Technology changes constantly. We learn, adapt, and improve continuously.'
  }
];

const WORK_STEPS = [
  {
    step: '01',
    title: 'Discover',
    desc: 'Understand your business, users, challenges, and objectives.'
  },
  {
    step: '02',
    title: 'Define',
    desc: 'Turn requirements into a clear product and technology strategy.'
  },
  {
    step: '03',
    title: 'Design',
    desc: 'Create intuitive experiences and scalable product architecture.'
  },
  {
    step: '04',
    title: 'Develop',
    desc: 'Build using modern technologies and engineering practices.'
  },
  {
    step: '05',
    title: 'Test & Refine',
    desc: 'Validate performance, usability, security, and reliability.'
  },
  {
    step: '06',
    title: 'Launch & Scale',
    desc: 'Deploy, monitor, improve, and scale as your business grows.'
  }
];

const TECH_CATEGORIES = [
  {
    category: 'AI & GenAI',
    skills: ['LLMs', 'RAG Systems', 'AI Agents', 'Prompt Engineering', 'LangChain', 'LangGraph']
  },
  {
    category: 'Development',
    skills: ['React', 'JavaScript / TypeScript', 'Node.js', 'Python', 'FastAPI', 'REST APIs']
  },
  {
    category: 'Data & Intelligence',
    skills: ['Machine Learning', 'Deep Learning', 'Data Processing', 'Analytics', 'Automated Pipelines']
  },
  {
    category: 'Cloud & Deployment',
    skills: ['Docker', 'AWS / Azure', 'CI/CD Pipelines', 'Cloud Infrastructure', 'Monitoring & Backups']
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Vector Databases', 'Redis']
  }
];

const WHY_US_POINTS = [
  {
    title: 'Business Understanding',
    desc: 'We focus on the business problem, not just the technical requirement.'
  },
  {
    title: 'Modern Technology',
    desc: 'We use current technologies and architectures appropriate for the project.'
  },
  {
    title: 'Scalable Solutions',
    desc: 'Our systems are designed with future growth in mind.'
  },
  {
    title: 'End-to-End Development',
    desc: 'From idea and design to development, deployment, and improvement.'
  },
  {
    title: 'Clear Communication',
    desc: 'Clients stay informed throughout the development journey.'
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We aim to build relationships beyond a single project.'
  }
];

const TEAM_MEMBERS = [
  {
    roleTag: 'LEADERSHIP & ARCHITECTURE',
    name: 'Engineering Leadership',
    role: 'System Architecture & Full-Stack',
    bio: 'Specializing in distributed systems, scalable web applications, and resilient cloud architecture for production systems.',
    avatar: '💻'
  },
  {
    roleTag: 'PRODUCT & EXPERIENCE',
    name: 'Product & Design Lead',
    role: 'UI/UX & Product Design',
    bio: 'Focused on creating frictionless user journeys, design systems, and converting business requirements into intuitive interfaces.',
    avatar: '🎨'
  },
  {
    roleTag: 'AI & AUTOMATION',
    name: 'AI & Systems Specialist',
    role: 'AI Agents & LLM Integration',
    bio: 'Building practical RAG workflows, automated business pipelines, and agentic workflows that drive operational leverage.',
    avatar: '⚡'
  }
];

export default function About() {
  const { openProjectModal } = useModal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-content">
            <span className="eyebrow">ABOUT TECHRIZERS</span>
            <h1>
              We Build Technology That <span>Moves Businesses Forward.</span>
            </h1>
            <p className="lede">
              TechRizers helps businesses turn ideas into reliable digital products,
              intelligent systems, and scalable technology solutions. We combine strategy,
              design, engineering, AI, and automation to solve real business problems.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal()}
              >
                Let’s Build Something Great →
              </button>
              <Link className="btn outline" to="/services">
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="three-canvas-frame float-3d">
              <ThreeHeroCanvas height={440} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="section about-who">
        <div className="container twocol align-center">
          <div>
            <span className="kicker">WHO WE ARE</span>
            <h2 className="heading-large">Technology With Purpose.</h2>
            <div style={{ marginTop: '24px' }}>
              <img
                src={getAssetUrl('assets/techrizers-logo.jpg')}
                alt="TechRizers - Technology • Innovation • Growth"
                className="about-brand-img"
              />
            </div>
          </div>
          <div className="who-text">
            <p className="lead-p">
              TechRizers is a technology solutions company focused on helping businesses
              build, improve, and scale their digital presence.
            </p>
            <p>
              From websites and SaaS platforms to mobile applications, AI solutions,
              custom software, and automation systems, we create technology that is
              designed around real business needs.
            </p>
            <p>
              We believe technology should not simply look impressive. It should solve
              problems, improve experiences, increase efficiency, and create measurable
              value.
            </p>
          </div>
        </div>

        <div className="container" style={{ marginTop: '48px' }}>
          <div className="pipeline-strip">
            <span className="pipeline-item">Ideas</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-item">Strategy</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-item">Design</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-item">Engineering</span>
            <span className="pipeline-arrow">→</span>
            <span className="pipeline-item highlight">Growth</span>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE CARDS */}
      <section className="section section-soft">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">OUR FOUNDATION</span>
            <h2>Three Principles Behind Every Project</h2>
            <p>Guided by practical business outcomes, not fleeting technical fads.</p>
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
        </div>
      </section>

      {/* 4. OUR STORY */}
      <section className="section story-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">OUR JOURNEY</span>
            <h2>From Ideas to Impact</h2>
            <p className="story-intro">
              Every great digital product starts with an idea. TechRizers was built around
              a simple belief: businesses should have access to technology that is
              powerful, practical, and built around their unique goals.
            </p>
          </div>

          <div className="story-narrative card">
            <p>
              Our journey is focused on bringing together modern software development,
              thoughtful design, artificial intelligence, and automation to create solutions
              that help businesses work smarter and grow faster. Today, TechRizers works
              across multiple technology areas, helping businesses transform concepts into
              functional, scalable digital experiences.
            </p>
          </div>

          <div className="timeline-horizontal">
            {STORY_STEPS.map((s, idx) => (
              <div
                key={s.num}
                className={`timeline-col ${activeStep === idx ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="timeline-marker">
                  <span className="timeline-dot" />
                  <span className="timeline-num">{s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE DO */}
      <section className="section services-summary">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">WHAT WE DO</span>
            <h2>Technology Built Around Your Business</h2>
            <p>
              Tailored capabilities designed to support your product at every stage of its lifecycle.
            </p>
          </div>

          <div className="grid three">
            {SERVICES_PREVIEW.map((item) => (
              <Card3D key={item.slug} maxTilt={14}>
                <article className="card service-feature-card" style={{ height: '100%' }}>
                  <div className="icon service-icon pop-3d-2">{item.icon}</div>
                  <h3 className="pop-3d-1">{item.title}</h3>
                  <p>{item.desc}</p>
                  <Link className="cardlink pop-3d-1" to={`/services/${item.slug}`}>
                    Explore Service →
                  </Link>
                </article>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR MISSION & OUR VISION */}
      <section className="section mission-vision-section">
        <div className="container grid two">
          <Card3D maxTilt={10}>
            <div className="mission-card card dark-contrast" style={{ height: '100%' }}>
              <span className="kicker kicker-accent">OUR MISSION</span>
              <h2 className="pop-3d-1">To make powerful technology accessible, practical, and valuable for businesses of every size.</h2>
              <p>
                We aim to simplify complex technology and turn it into solutions that people can
                actually use, businesses can depend on, and teams can scale with confidence.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={10}>
            <div className="vision-card card dark-contrast" style={{ height: '100%' }}>
              <span className="kicker kicker-violet">OUR VISION</span>
              <h2 className="pop-3d-1">To become a trusted technology partner for businesses building the future.</h2>
              <p>
                We envision a world where businesses can use technology not just to keep up
                with change, but to create new opportunities, improve the way they operate, and
                deliver better experiences to their customers.
              </p>
            </div>
          </Card3D>
        </div>
      </section>

      {/* 7. OUR VALUES */}
      <section className="section values-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">OUR VALUES</span>
            <h2>Our Guiding Principles</h2>
            <p>The core values that guide our engineering, communication, and client relationships.</p>
          </div>

          <div className="grid three">
            {VALUES.map((v) => (
              <Card3D key={v.num} maxTilt={14}>
                <div className="card value-card" style={{ height: '100%' }}>
                  <span className="value-num pop-3d-2">{v.num}</span>
                  <h3 className="pop-3d-1">{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HOW WE WORK */}
      <section className="section process-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">HOW WE WORK</span>
            <h2>A Better Way to Build</h2>
            <p>A transparent, milestone-driven process designed for speed, clarity, and precision.</p>
          </div>

          <div className="process-flow">
            {WORK_STEPS.map((step) => (
              <div className="process-step-item" key={step.step}>
                <div className="step-badge">Step {step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TECHNOLOGY & EXPERTISE */}
      <section className="section tech-ecosystem-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">TECHNOLOGY & EXPERTISE</span>
            <h2>Built With Modern Technology</h2>
            <p>We select robust, battle-tested tools best suited for performance and long-term maintainability.</p>
          </div>

          <div className="tech-ecosystem-grid">
            {TECH_CATEGORIES.map((cat) => (
              <div className="card tech-category-card" key={cat.category}>
                <h3>{cat.category}</h3>
                <div className="chips">
                  {cat.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. WHY TECHRIZERS */}
      <section className="section why-us-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">WHY TECHRIZERS</span>
            <h2>Why Businesses Choose TechRizers</h2>
            <p>Built for accountability, technical depth, and tangible business outcomes.</p>
          </div>

          <div className="grid three">
            {WHY_US_POINTS.map((pt, idx) => (
              <Card3D key={pt.title} maxTilt={14}>
                <div className="card why-card" style={{ height: '100%' }}>
                  <div className="why-check pop-3d-2">✓ 0{idx + 1}</div>
                  <h3 className="pop-3d-1">{pt.title}</h3>
                  <p>{pt.desc}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 11. TEAM SECTION */}
      <section className="section team-section">
        <div className="container">
          <div className="sectionhead">
            <span className="kicker">OUR TEAM</span>
            <h2>People Behind the Technology</h2>
            <p>Great technology is built by people who care about the problem they're solving.</p>
          </div>

          <div className="grid three">
            {TEAM_MEMBERS.map((member) => (
              <Card3D key={member.name} maxTilt={12}>
                <div className="card team-card" style={{ height: '100%' }}>
                  <div className="team-avatar-box pop-3d-2">
                    <span className="team-avatar-icon">{member.avatar}</span>
                  </div>
                  <span className="team-role-tag pop-3d-1">{member.roleTag}</span>
                  <h3 className="pop-3d-1">{member.name}</h3>
                  <strong className="team-subrole">{member.role}</strong>
                  <p>{member.bio}</p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* 12. HONEST TRUST STANDARDS (NO FAKE PERCENTAGES) */}
      <section className="section trust-metrics-section">
        <div className="container">
          <div className="sectionhead center-head">
            <span className="kicker">BUILT TO EARN TRUST</span>
            <h2>Measurable Standards of Delivery</h2>
            <p>We believe trust is earned through code quality, clear delivery, and verified outcomes.</p>
          </div>

          <div className="grid four trust-stats-grid">
            <Card3D maxTilt={12}>
              <div className="card stat-card" style={{ height: '100%', textAlign: 'center' }}>
                <strong className="stat-number pop-3d-2" style={{ fontSize: '24px', color: 'var(--primary-blue)' }}>24/7</strong>
                <p className="pop-3d-1" style={{ fontWeight: 600 }}>Support & Reliability</p>
                <small style={{ color: 'var(--secondary-text)' }}>Dedicated monitoring channels</small>
              </div>
            </Card3D>
            <Card3D maxTilt={12}>
              <div className="card stat-card" style={{ height: '100%', textAlign: 'center' }}>
                <strong className="stat-number pop-3d-2" style={{ fontSize: '24px', color: 'var(--primary-blue)' }}>100%</strong>
                <p className="pop-3d-1" style={{ fontWeight: 600 }}>IP & Code Ownership</p>
                <small style={{ color: 'var(--secondary-text)' }}>Full transfer on handover</small>
              </div>
            </Card3D>
            <Card3D maxTilt={12}>
              <div className="card stat-card" style={{ height: '100%', textAlign: 'center' }}>
                <strong className="stat-number pop-3d-2" style={{ fontSize: '24px', color: 'var(--primary-blue)' }}>Agile</strong>
                <p className="pop-3d-1" style={{ fontWeight: 600 }}>Sprint Milestones</p>
                <small style={{ color: 'var(--secondary-text)' }}>Visible bi-weekly demos</small>
              </div>
            </Card3D>
            <Card3D maxTilt={12}>
              <div className="card stat-card" style={{ height: '100%', textAlign: 'center' }}>
                <strong className="stat-number pop-3d-2" style={{ fontSize: '24px', color: 'var(--primary-blue)' }}>Scalable</strong>
                <p className="pop-3d-1" style={{ fontWeight: 600 }}>Modern Architecture</p>
                <small style={{ color: 'var(--secondary-text)' }}>Engineered for growth</small>
              </div>
            </Card3D>
          </div>
        </div>
      </section>

      {/* 13. FAQ SECTION */}
      <section className="section faq-section">
        <div className="container narrow">
          <div className="sectionhead center-head">
            <span className="kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Common Questions</h2>
            <p>Clear answers to how we engage, build, and support our clients.</p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="section about-final-cta" style={{ background: '#0F172A', color: '#FFFFFF' }}>
        <div className="container">
          <div className="ctaband final-cta-card" style={{ background: 'transparent', border: 'none', textAlign: 'center' }}>
            <h2 style={{ color: '#FFFFFF' }}>Have an Idea? Let's Build It Together.</h2>
            <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '12px auto 28px' }}>
              Whether you're starting something new, improving an existing product, or
              looking to automate your business, TechRizers can help turn your vision into
              technology that works.
            </p>
            <div className="actions center-actions" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => openProjectModal()}
              >
                Start a Conversation →
              </button>
              <Link className="btn outline" to="/services" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}>
                View Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
