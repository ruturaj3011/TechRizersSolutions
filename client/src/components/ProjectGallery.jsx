import { useState, useEffect } from 'react';

export default function ProjectGallery({ gallery = [], projectTitle = 'Project' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // If no gallery items provided, show fallback mockup
  const items = gallery.length > 0 ? gallery : [
    {
      title: `${projectTitle} - Architecture Overview`,
      caption: 'High-availability infrastructure topology and core software service flow.',
      color: '#0F172A',
      accent: '#2563EB',
      tag: 'SYSTEM ARCHITECTURE'
    },
    {
      title: `${projectTitle} - Operations Dashboard`,
      caption: 'Real-time telemetry and management controls engineered for enterprise users.',
      color: '#1E293B',
      accent: '#38BDF8',
      tag: 'INTERFACE'
    }
  ];

  const currentItem = items[activeIndex] || items[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, items.length]);

  return (
    <div className="project-gallery-wrapper" style={{ marginBottom: '40px' }}>
      <div className="gallery-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <span className="kicker" style={{ margin: 0 }}>PROJECT SCREENSHOTS & GALLERY</span>
          <h3 style={{ fontSize: '18px', margin: '4px 0 0', color: 'var(--dark-navy)' }}>
            {currentItem.title}
          </h3>
        </div>
        <button
          type="button"
          className="btn ghost small"
          onClick={() => setLightboxOpen(true)}
          title="Open in Fullscreen Lightbox"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <span>⛶</span> Fullscreen Lightbox
        </button>
      </div>

      {/* Main Display Frame */}
      <div
        className="gallery-main-frame"
        onClick={() => setLightboxOpen(true)}
        style={{
          borderRadius: '14px',
          border: '1px solid var(--border-color)',
          background: currentItem.color || '#0F172A',
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          cursor: 'zoom-in',
          position: 'relative',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease'
        }}
      >
        {/* Browser / Application Window Mockup Chrome */}
        <div
          style={{
            padding: '10px 16px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
          </div>
          <div
            style={{
              padding: '2px 14px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#94A3B8',
              fontSize: '11px',
              fontFamily: 'monospace'
            }}
          >
            https://secure.techrizers.com/preview/{projectTitle.toLowerCase().replace(/\s+/g, '-')}
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: currentItem.accent || '#38BDF8',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '2px 8px',
              borderRadius: '999px',
              border: `1px solid ${currentItem.accent || '#38BDF8'}40`
            }}
          >
            {currentItem.tag || 'SYSTEM VIEW'}
          </span>
        </div>

        {/* Visual Content Canvas */}
        <div
          style={{
            minHeight: '280px',
            padding: '36px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            background: `radial-gradient(circle at 50% 30%, ${currentItem.accent || '#2563EB'}22 0%, rgba(15, 23, 42, 0.95) 70%)`
          }}
        >
          <div style={{ maxWidth: '540px' }}>
            <div style={{ display: 'inline-block', color: currentItem.accent || '#38BDF8', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', marginBottom: '8px' }}>
              ✦ ARCHITECTURE & UI SNAPSHOT
            </div>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(20px, 3vw, 28px)', margin: '0 0 10px', lineHeight: '1.2' }}>
              {currentItem.title}
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              {currentItem.caption}
            </p>
          </div>

          <div style={{ position: 'absolute', right: '24px', bottom: '20px', opacity: 0.8, color: '#94A3B8', fontSize: '12px' }}>
            Click to expand (Image {activeIndex + 1} of {items.length}) ⛶
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      {items.length > 1 && (
        <div
          className="gallery-thumbnails"
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '12px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                className="gallery-thumb-btn"
                onClick={() => setActiveIndex(idx)}
                style={{
                  flex: '1 1 0',
                  minWidth: '120px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: isActive ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
                  background: isActive ? 'rgba(37, 99, 235, 0.06)' : 'var(--card-bg)',
                  boxShadow: isActive ? '0 4px 14px rgba(37, 99, 235, 0.2)' : 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 800, color: isActive ? 'var(--primary-blue)' : 'var(--secondary-text)', textTransform: 'uppercase' }}>
                  Screenshot 0{idx + 1}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--dark-navy)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 11, 20, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            className="lightbox-modal animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(960px, 94vw)',
              borderRadius: '16px',
              border: '1px solid #334155',
              background: '#0F172A',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(37, 99, 235, 0.2)',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid #1E293B',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.5px' }}>
                  SCREENSHOT {activeIndex + 1} OF {items.length} · {currentItem.tag || 'DETAIL VIEW'}
                </span>
                <h3 style={{ color: '#FFFFFF', margin: '4px 0 0', fontSize: '18px' }}>
                  {currentItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="btn ghost small"
                style={{ color: '#FFFFFF', borderColor: '#334155', width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
              >
                ✕
              </button>
            </div>

            {/* Content Display */}
            <div
              style={{
                padding: '50px 36px',
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: `radial-gradient(circle at center, ${currentItem.accent || '#2563EB'}25 0%, #070B14 80%)`
              }}
            >
              <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '999px', background: 'rgba(37,99,235,0.2)', color: '#60A5FA', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
                  {projectTitle} · Verified Production Asset
                </div>
                <h2 style={{ color: '#FFFFFF', fontSize: '32px', marginBottom: '16px' }}>
                  {currentItem.title}
                </h2>
                <p style={{ color: '#CBD5E1', fontSize: '16px', lineHeight: '1.7', margin: 0 }}>
                  {currentItem.caption}
                </p>
              </div>
            </div>

            {/* Footer / Controls */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #1E293B',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#070B14'
              }}
            >
              <button
                type="button"
                className="btn outline small"
                onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
                style={{ color: '#FFFFFF', borderColor: '#334155' }}
              >
                ← Previous Image
              </button>
              <span style={{ color: '#94A3B8', fontSize: '13px' }}>
                Use Left / Right arrow keys to navigate
              </span>
              <button
                type="button"
                className="btn outline small"
                onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
                style={{ color: '#FFFFFF', borderColor: '#334155' }}
              >
                Next Image →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
