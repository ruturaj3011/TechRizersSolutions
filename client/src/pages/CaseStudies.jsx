import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { projects, categories, getProjectBySlug, getAdjacentProjects } from '../data/projectsData';
import { useModal } from '../context/ModalContext';
import ProjectGallery from '../components/ProjectGallery';
import Card3D from '../components/Card3D';

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // 1. Category filter
      const matchesCategory = activeFilter === 'ALL' || p.category === activeFilter;

      // 2. Search query (matches title, description, category, or technologies)
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      {/* Page Hero */}
      <section className="pagehero">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            <span className="eyebrow-badge">PROVEN ENTERPRISE DELIVERABLES</span>
          </div>
          <h1>Selected Work & Case Studies</h1>
          <p style={{ maxWidth: '680px' }}>
            Explore verified software engineering deliverables, SaaS platforms, AI systems, and mobile applications built for real business impact.
          </p>

          {/* Search Bar */}
          <div style={{ marginTop: '28px', maxWidth: '640px' }}>
            <div className="project-search-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'absolute', left: '16px', color: 'var(--secondary-text)', fontSize: '16px' }}>
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, category, or tech (e.g. React, Healthcare, Flutter)..."
                style={{
                  width: '100%',
                  padding: '13px 40px 13px 44px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: '#FFFFFF',
                  color: 'var(--primary-text)',
                  fontSize: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--secondary-text)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '4px'
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-strip" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
            {categories.map((cat) => {
              const count = cat === 'ALL'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
              const isActive = activeFilter === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  className={`filter-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '999px',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--soft-bg)',
                      color: isActive ? '#FFFFFF' : 'var(--secondary-text)'
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section section-soft">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '14px', color: 'var(--secondary-text)', fontWeight: 500 }}>
              Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
              {activeFilter !== 'ALL' && ` in ${activeFilter}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(activeFilter !== 'ALL' || searchQuery) && (
              <button
                type="button"
                className="btn ghost small"
                onClick={() => {
                  setActiveFilter('ALL');
                  setSearchQuery('');
                }}
                style={{ fontSize: '12px', padding: '4px 10px' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="card" style={{ padding: '60px 20px', textAlign: 'center', background: '#FFFFFF' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
              <h3>No projects match your search</h3>
              <p style={{ color: 'var(--secondary-text)', margin: '8px auto 20px', maxWidth: '440px' }}>
                We couldn't find any case studies matching "{searchQuery}". Try selecting another category or resetting the search filter.
              </p>
              <button
                type="button"
                className="btn primary small"
                onClick={() => {
                  setActiveFilter('ALL');
                  setSearchQuery('');
                }}
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid three">
              {filteredProjects.map((p) => {
                return (
                  <Card3D key={p.id} maxTilt={6}>
                    <article
                      className="case-study-card card animate-fade-in"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Project Visual Header */}
                      <div
                        className="project-thumb-frame"
                        style={{
                          height: '150px',
                          borderRadius: '10px',
                          marginBottom: '16px',
                          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '14px',
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
                            {p.category}
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
                            ● {p.status || 'Delivered'}
                          </span>
                        </div>

                        <div style={{ zIndex: 2 }}>
                          <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {p.subCategory}
                          </span>
                        </div>

                        {/* Subtle background ambient line */}
                        <div
                          style={{
                            position: 'absolute',
                            right: '-20px',
                            bottom: '-20px',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>

                      {/* Title & Description */}
                      <h3 style={{ fontSize: '19px', margin: '0 0 8px', color: 'var(--dark-navy)' }}>
                        {p.title}
                      </h3>
                      <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.55', flex: 1, margin: '0 0 16px' }}>
                        {p.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="chips" style={{ marginBottom: '18px' }}>
                        {p.technologies.slice(0, 4).map((t) => (
                          <span key={t} style={{ fontSize: '11px', padding: '3px 9px' }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div
                        className="case-card-actions"
                        style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          marginTop: 'auto',
                          paddingTop: '14px',
                          borderTop: '1px solid var(--border-color)'
                        }}
                      >
                        <Link
                          to={`/case-studies/${p.slug}`}
                          className="btn primary small"
                          style={{ flex: '1 1 auto', textAlign: 'center' }}
                        >
                          View Case Study →
                        </Link>
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn outline small"
                            title="View GitHub Repository"
                            style={{ padding: '7px 10px' }}
                          >
                            GitHub ↗
                          </a>
                        )}
                        {p.liveDemoUrl && (
                          <a
                            href={p.liveDemoUrl}
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
          )}
        </div>
      </section>
    </>
  );
}

export function CaseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { openProjectModal } = useModal();

  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  if (!project) {
    return (
      <div className="container empty-section" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h1>Case Study Not Found</h1>
        <p style={{ color: 'var(--secondary-text)', margin: '12px 0 24px' }}>
          The requested portfolio project does not exist or has been updated.
        </p>
        <Link to="/case-studies" className="btn primary">
          ← Back to All Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Detail Page Hero */}
      <section className="pagehero">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow-badge">{project.category}</span>
            <span style={{ color: 'var(--secondary-text)', fontSize: '13px', fontWeight: 600 }}>
              {project.subCategory}
            </span>
            <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 700, marginLeft: 'auto' }}>
              ● {project.status || 'Production'}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginBottom: '16px' }}>
            {project.title}
          </h1>
          <p style={{ maxWidth: '760px', fontSize: '18px', lineHeight: '1.6', color: 'var(--secondary-text)' }}>
            {project.description}
          </p>

          <div className="actions" style={{ marginTop: '28px', gap: '12px', flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn outline"
              >
                View GitHub Repository ↗
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
              >
                View Live Demo ↗
              </a>
            )}
            <button
              type="button"
              className="btn primary"
              onClick={() =>
                openProjectModal({
                  service: project.projectType || 'Custom Software Development',
                  message: `I would like to discuss building a solution similar to ${project.title} (${project.category})`
                })
              }
            >
              Start Similar Project →
            </button>
            <Link to="/case-studies" className="btn ghost" style={{ marginLeft: 'auto' }}>
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section">
        <div className="container">
          <div className="twocol" style={{ alignItems: 'flex-start', gap: '48px' }}>
            {/* Left Main Content */}
            <div>
              {/* Project Overview */}
              <div style={{ marginBottom: '40px' }}>
                <span className="kicker">PROJECT OVERVIEW</span>
                <h2 style={{ fontSize: '28px', margin: '8px 0 16px' }}>The Business Context</h2>
                <p style={{ color: 'var(--secondary-text)', lineHeight: '1.75', fontSize: '16px' }}>
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Problem & Solution Contrast */}
              <div className="grid two" style={{ gap: '20px', marginBottom: '40px' }}>
                <div className="card" style={{ padding: '24px', borderLeft: '3px solid #EF4444' }}>
                  <span className="kicker" style={{ color: '#EF4444', margin: 0 }}>THE BUSINESS CHALLENGE</span>
                  <h3 style={{ fontSize: '18px', margin: '8px 0 10px', color: 'var(--dark-navy)' }}>The Problem</h3>
                  <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {project.problem}
                  </p>
                </div>
                <div className="card" style={{ padding: '24px', borderLeft: '3px solid var(--primary-blue)' }}>
                  <span className="kicker" style={{ color: 'var(--primary-blue)', margin: 0 }}>ENGINEERED OUTCOME</span>
                  <h3 style={{ fontSize: '18px', margin: '8px 0 10px', color: 'var(--dark-navy)' }}>Our Solution</h3>
                  <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div style={{ marginBottom: '40px' }}>
                <span className="kicker">CAPABILITIES DELIVERED</span>
                <h2 style={{ fontSize: '26px', margin: '8px 0 18px' }}>Key Engineering Highlights</h2>
                <ul className="bullets" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  {project.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', lineHeight: '1.5' }}>
                      <span style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Image Gallery */}
              <ProjectGallery gallery={project.gallery} projectTitle={project.title} />

              {/* Architecture & Workflow */}
              <div className="card dark-contrast" style={{ padding: '32px', marginBottom: '40px' }}>
                <span className="kicker" style={{ color: '#38BDF8' }}>SYSTEM ARCHITECTURE</span>
                <h3 style={{ fontSize: '22px', color: '#FFFFFF', margin: '8px 0 14px' }}>
                  Technology Infrastructure & Workflow
                </h3>
                <p style={{ color: '#CBD5E1', lineHeight: '1.7', fontSize: '14px', margin: '0 0 20px' }}>
                  {project.architecture}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        color: '#38BDF8',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: '1px solid rgba(56,189,248,0.2)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="card" style={{ padding: '28px', background: 'var(--light-blue-bg)', borderColor: '#BFDBFE', marginBottom: '40px' }}>
                <span className="kicker" style={{ color: 'var(--primary-blue)', margin: 0 }}>RESULTS & OUTCOMES</span>
                <h3 style={{ fontSize: '18px', margin: '6px 0 10px', color: 'var(--dark-navy)' }}>
                  Verified Milestone
                </h3>
                <p style={{ color: 'var(--secondary-text)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  {project.results}
                </p>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div style={{ position: 'sticky', top: '90px' }}>
              <div className="card" style={{ padding: '28px' }}>
                <span className="kicker">SPECIFICATIONS</span>
                <h3 style={{ margin: '8px 0 18px', fontSize: '19px' }}>Technology Stack</h3>

                <div className="chips" style={{ marginBottom: '24px' }}>
                  {project.technologies.map((t) => (
                    <span key={t} style={{ fontSize: '13px', padding: '5px 12px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Delivery Category
                  </span>
                  <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--dark-navy)', margin: '4px 0 0' }}>
                    {project.category} · {project.subCategory}
                  </p>
                </div>

                {project.githubUrl && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Repository
                    </span>
                    <div style={{ marginTop: '4px' }}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 600, wordBreak: 'break-all' }}
                      >
                        {project.githubUrl.replace('https://', '')} ↗
                      </a>
                    </div>
                  </div>
                )}

                {project.liveDemoUrl && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Live Showcase
                    </span>
                    <div style={{ marginTop: '4px' }}>
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '13px', color: 'var(--primary-blue)', fontWeight: 600, wordBreak: 'break-all' }}
                      >
                        {project.liveDemoUrl.replace('https://', '')} ↗
                      </a>
                    </div>
                  </div>
                )}

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '16px' }}>
                  <button
                    type="button"
                    className="btn primary full"
                    style={{ width: '100%', marginBottom: '10px' }}
                    onClick={() =>
                      openProjectModal({
                        service: project.projectType || 'Custom Software Development',
                        message: `Inquiring about a project similar to ${project.title}`
                      })
                    }
                  >
                    Start Similar Project →
                  </button>
                  <a
                    href={`https://wa.me/918308367073?text=Hi%20TechRizers%2C%20I%20saw%20the%20${encodeURIComponent(project.title)}%20case%20study%20and%20would%20like%20to%20discuss%20a%20similar%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn outline full"
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    💬 Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Project Navigation (Prev / Next) */}
          <div
            className="project-pagination-strip card"
            style={{
              marginTop: '60px',
              padding: '24px 32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              background: '#FFFFFF'
            }}
          >
            {prev ? (
              <Link
                to={`/case-studies/${prev.slug}`}
                className="btn ghost"
                style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 14px' }}
              >
                <span style={{ fontSize: '11px', color: 'var(--muted-text)', textTransform: 'uppercase' }}>
                  ← Previous Project
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            <Link to="/case-studies" className="btn outline small">
              View All Case Studies
            </Link>

            {next ? (
              <Link
                to={`/case-studies/${next.slug}`}
                className="btn ghost"
                style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '8px 14px' }}
              >
                <span style={{ fontSize: '11px', color: 'var(--muted-text)', textTransform: 'uppercase' }}>
                  Next Project →
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary-blue)' }}>
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
