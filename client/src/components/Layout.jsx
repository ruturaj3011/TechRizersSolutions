import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WhatsAppWidget from './WhatsAppWidget';
import { useModal } from '../context/ModalContext';
import { getAssetUrl } from '../utils/assetUrl';

export default function Layout({ children }) {
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const { openProjectModal } = useModal();
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu upon route change
	useEffect(() => {
		setOpen(false);
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const navItems = [
		['/', 'Home'],
		['/about', 'About Us'],
		['/services', 'Services'],
		['/pricing', 'Pricing'],
		['/case-studies', 'Case Studies'],
		['/contact', 'Contact']
	];

	return (
		<>
			<a className="skip" href="#main">
				Skip to content
			</a>

			<header className={`header ${scrolled ? 'scrolled' : ''}`}>
				<div className="container nav">
					<Link className="brand" to="/" title="TechRizers · Technology, Innovation, Growth">
						<img src={getAssetUrl('assets/techrizers-mark-square.png')} alt="TechRizers Mark" className="brand-logo-img" />
						<span>
							TechRizers<span className="accent-dot">.</span>
						</span>
					</Link>

					<nav className="navlinks" aria-label="Main Navigation">
						{navItems.map(([path, label]) => (
							<NavLink key={path} to={path} end={path === '/'}>
								{label}
							</NavLink>
						))}
					</nav>

					<div className="navcta">
						<a
							className="btn ghost small whatsapp-nav-btn"
							href="https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20would%20like%20to%20discuss%20a%20project."
							target="_blank"
							rel="noopener noreferrer"
							title="Chat with TechRizers on WhatsApp"
						>
							💬 WhatsApp
						</a>
						<Link className="btn outline small" to="/payment">
							Pay Now
						</Link>
						<button
							type="button"
							className="btn primary small"
							onClick={() => openProjectModal()}
						>
							Start a Project
						</button>
					</div>

					<button
						className="menubtn"
						onClick={() => setOpen(!open)}
						aria-expanded={open}
						aria-label="Toggle navigation menu"
					>
						{open ? '✕' : '☰'}
					</button>
				</div>

				{open && (
					<nav className="mobile-nav animate-slide-up" aria-label="Mobile Navigation">
						{navItems.map(([path, label]) => (
							<NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>
								{label}
							</NavLink>
						))}
						<div className="mobile-cta-group">
							<a
								className="btn small"
								style={{ background: '#25D366', color: '#070B14', fontWeight: 700 }}
								href="https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20would%20like%20to%20discuss%20a%20project."
								target="_blank"
								rel="noopener noreferrer"
							>
								💬 WhatsApp Chat
							</a>
							<Link className="btn outline small" to="/payment" onClick={() => setOpen(false)}>
								Pay Now
							</Link>
							<button
								type="button"
								className="btn primary small"
								onClick={() => {
									setOpen(false);
									openProjectModal();
								}}
							>
								Start a Project
							</button>
						</div>
					</nav>
				)}
			</header>

			<main id="main">{children}</main>

			<footer className="footer">
				<div className="container footgrid">
					{/* Column 1: Brand & Identity */}
					<div className="footcol brand-col">
						<Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }} title="TechRizers Home">
							<img
								src={getAssetUrl('assets/techrizers-logo.jpg')}
								alt="TechRizers - Technology • Innovation • Growth"
								className="footer-brand-logo"
							/>
						</Link>
						<p className="foot-desc">
							Enterprise-grade web & SaaS engineering, intelligent AI systems, and scalable cloud solutions built around real business needs.
						</p>
						<div className="foot-quick-contact">
							<a
								href="https://wa.me/918308367073?text=Hello%20TechRizers%2C%20I%20would%20like%20to%20discuss%20a%20project."
								target="_blank"
								rel="noopener noreferrer"
								className="foot-wa-link"
							>
								💬 WhatsApp: +91 83083 67073
							</a>
						</div>
					</div>

					{/* Column 2: Company */}
					<div className="footcol">
						<h4>Company</h4>
						<Link to="/about">About Us</Link>
						<Link to="/services">Services</Link>
						<Link to="/pricing">Pricing</Link>
						<Link to="/case-studies">Case Studies</Link>
						<Link to="/contact">Contact</Link>
					</div>

					{/* Column 3: Services */}
					<div className="footcol">
						<h4>Services</h4>
						<Link to="/services/web-saas">Web & SaaS</Link>
						<Link to="/services/mobile-app">Mobile Apps</Link>
						<Link to="/services/ai-solutions">AI Solutions</Link>
						<Link to="/services/custom-software">Custom Software</Link>
						<Link to="/services/ui-ux">UI/UX Design</Link>
						<Link to="/services/automation">Automation</Link>
					</div>

					{/* Column 4: Resources */}
					<div className="footcol">
						<h4>Resources</h4>
						<Link to="/case-studies">Case Studies</Link>
						<a href="https://github.com/techrizers" target="_blank" rel="noopener noreferrer">
							GitHub ↗
						</a>
						<Link to="/about#faq">FAQs</Link>
						<Link to="/start-project">Start a Project</Link>
						<Link to="/payment">Client Portal</Link>
					</div>

					{/* Column 5: Legal & Social */}
					<div className="footcol">
						<h4>Legal</h4>
						<Link to="/privacy">Privacy Policy</Link>
						<Link to="/terms">Terms & Conditions</Link>
						<Link to="/refund">Refund Policy</Link>

						<h4 style={{ marginTop: '20px' }}>Connect</h4>
						<div className="foot-socials">
							<a href="https://github.com/techrizers" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
								GitHub
							</a>
							<a href="https://linkedin.com/company/techrizers" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
								LinkedIn
							</a>
							<a href="https://instagram.com/techrizers" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
								Instagram
							</a>
						</div>
					</div>
				</div>

				<div className="container footbottom">
					<span>© 2026 TechRizers. All rights reserved. Technology • Innovation • Growth.</span>
					<span>Pune, Maharashtra, India · <a href="mailto:hello@techrizers.com" style={{ color: 'inherit' }}>hello@techrizers.com</a></span>
				</div>
			</footer>

			<WhatsAppWidget />
		</>
	);
}
