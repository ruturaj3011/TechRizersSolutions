import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<section className="section empty-section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
			<div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
				<div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}>
					<span className="eyebrow-badge">ERROR 404</span>
				</div>
				<h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>
					Looks like you've taken a wrong turn.
				</h1>
				<p style={{ color: 'var(--secondary-text)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
					The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let’s get you back on track.
				</p>
				<div className="actions" style={{ justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
					<Link to="/" className="btn primary">
						← Back to Home
					</Link>
					<Link to="/services" className="btn outline">
						View Services
					</Link>
					<Link to="/contact" className="btn ghost">
						Contact Us
					</Link>
				</div>
			</div>
		</section>
	);
}
