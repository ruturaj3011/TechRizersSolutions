import { useState, useEffect } from 'react';
import api from '../services/api';

const WHATSAPP_NUMBER = '918308367073';

const SERVICE_OPTIONS = [
	'Web Development',
	'SaaS Development',
	'Mobile App',
	'AI Solution',
	'RAG Chatbot',
	'AI Agent',
	'Automation',
	'UI/UX',
	'Custom Software',
	'Other'
];

const BUDGET_OPTIONS = [
	'₹15K – ₹50K',
	'₹50K – ₹1L',
	'₹1L – ₹3L',
	'₹3L – ₹10L',
	'₹10L+',
	'Custom'
];

const TIMELINE_OPTIONS = [
	'ASAP',
	'2–4 weeks',
	'1–2 months',
	'3–6 months',
	'Flexible'
];

export default function StartProjectModal({ isOpen, onClose, initialData = {} }) {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		service: '',
		budget: '',
		timeline: '2–4 weeks',
		message: ''
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [submittedData, setSubmittedData] = useState(null);

	useEffect(() => {
		if (isOpen) {
			setSuccess(false);
			setError('');
			setForm((prev) => ({
				...prev,
				service: initialData.service || prev.service || 'Web & SaaS',
				budget: initialData.price || prev.budget || '₹1L – ₹3L',
				message: initialData.package ? `Inquiring about package: ${initialData.package} (${initialData.price || ''})` : prev.message
			}));
		}
	}, [isOpen, initialData]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const payload = {
				name: form.name.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
				company: form.company.trim(),
				projectType: form.service || 'Custom Solution',
				budget: form.budget || 'Custom',
				timeline: form.timeline || 'Flexible',
				message: form.message.trim() || `Inquiry for ${form.service}`
			};

			await api.post('/project-inquiries', payload);
			setSubmittedData(payload);
			setSuccess(true);
			setLoading(false);
		} catch (err) {
			setError(err.response?.data?.message || 'Unable to submit right now. Please try again.');
			setLoading(false);
		}
	};

	const getWhatsAppUrl = () => {
		const name = submittedData?.name || form.name || 'Client';
		const service = submittedData?.projectType || form.service || 'technology services';
		const text = `Hello TechRizers, I just submitted an inquiry for ${service} (Name: ${name}). I would like to discuss my project.`;
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
	};

	return (
		<div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
			<div className="modal-content modal-project" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose} aria-label="Close dialog">
					✕
				</button>

				{!success ? (
					<>
						<div className="modal-header">
							<span className="kicker">TECHRIZERS · START A PROJECT</span>
							<h2 id="modal-title">Let’s Build Something Valuable.</h2>
							<p>
								Share your requirements and target timeline. We will review your scope and follow up with a concrete next step within 24 hours.
							</p>
						</div>

						{initialData.package && (
							<div className="prefill-banner">
								<span>Selected Package:</span> <strong>{initialData.package}</strong> — <span>{initialData.price}</span>
							</div>
						)}

						<form onSubmit={handleSubmit} className="form modal-form">
							<div className="formgrid">
								<label>
									Full Name *
									<input required name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Sharma" />
								</label>
								<label>
									Business Email *
									<input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. alex@company.com" />
								</label>
								<label>
									Phone Number
									<input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
								</label>
								<label>
									Company
									<input name="company" value={form.company} onChange={handleChange} placeholder="Company or project name" />
								</label>
								<label>
									Service Required *
									<select required name="service" value={form.service} onChange={handleChange}>
										<option value="">Select Service</option>
										{SERVICE_OPTIONS.map((opt) => (
											<option key={opt} value={opt}>
												{opt}
											</option>
										))}
									</select>
								</label>
								<label>
									Estimated Budget
									<select name="budget" value={form.budget} onChange={handleChange}>
										<option value="">Select Budget Range</option>
										{BUDGET_OPTIONS.map((opt) => (
											<option key={opt} value={opt}>
												{opt}
											</option>
										))}
									</select>
								</label>
							</div>

							<div className="formgrid full-width" style={{ marginTop: '12px' }}>
								<label>
									Target Timeline
									<select name="timeline" value={form.timeline} onChange={handleChange}>
										{TIMELINE_OPTIONS.map((opt) => (
											<option key={opt} value={opt}>
												{opt}
											</option>
										))}
									</select>
								</label>
							</div>

							<label style={{ marginTop: '12px' }}>
								Project Description *
								<textarea
									required
									name="message"
									rows={4}
									value={form.message}
									onChange={handleChange}
									placeholder="Tell us about the business problem, desired features, target users, and any existing systems..."
								/>
							</label>

							{error && <div className="alert error">{error}</div>}

							<div className="modal-actions">
								<button type="submit" disabled={loading} className="btn primary">
									{loading ? 'Submitting Inquiry…' : 'Start My Project →'}
								</button>
								<button type="button" onClick={onClose} className="btn ghost">
									Cancel
								</button>
							</div>
						</form>
					</>
				) : (
					<div className="modal-success-state">
						<div className="success-icon-badge">✓</div>
						<h2>Thank you. Your project inquiry has been received.</h2>
						<p>
							Our technical leadership will analyze your requirements and reach out within 24 hours. For priority scheduling, connect directly with our engineering team on WhatsApp.
						</p>
						<div className="success-actions">
							<a
								href={getWhatsAppUrl()}
								target="_blank"
								rel="noopener noreferrer"
								className="btn"
								style={{ background: '#25D366', color: '#070B14', fontWeight: 700 }}
							>
								💬 WhatsApp Us
							</a>
							<button onClick={onClose} className="btn outline">
								Back to Website
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
