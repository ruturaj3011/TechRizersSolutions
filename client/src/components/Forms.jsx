import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export function ContactForm({ project = false, initialService = '', initialBudget = '', initialMessage = '' }) {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		projectType: initialService || '',
		budget: initialBudget || '',
		timeline: '2–4 weeks',
		message: initialMessage || ''
	});

	useEffect(() => {
		if (initialService) setForm((f) => ({ ...f, projectType: initialService }));
		if (initialBudget) setForm((f) => ({ ...f, budget: initialBudget }));
		if (initialMessage) setForm((f) => ({ ...f, message: initialMessage }));
	}, [initialService, initialBudget, initialMessage]);

	const [state, setState] = useState({
		loading: false,
		error: '',
		ok: false,
		lastSubmitted: null
	});

	const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const submit = async (e) => {
		e.preventDefault();

		if (!form.email || !form.email.includes('@')) {
			setState((s) => ({ ...s, error: 'Please provide a valid business email address.' }));
			return;
		}

		setState({ loading: true, error: '', ok: false, lastSubmitted: null });

		try {
			const payload = {
				name: form.name.trim(),
				email: form.email.trim(),
				phone: form.phone.trim(),
				company: form.company.trim(),
				projectType: form.projectType || (project ? 'Custom Solution' : 'General Inquiry'),
				budget: form.budget || 'Custom',
				timeline: form.timeline || 'Flexible',
				message: form.message.trim()
			};

			await api.post(project ? '/project-inquiries' : '/contact', payload);
			const submittedCopy = { ...payload };
			setState({
				loading: false,
				error: '',
				ok: true,
				lastSubmitted: submittedCopy
			});
			setForm({
				name: '',
				email: '',
				phone: '',
				company: '',
				projectType: '',
				budget: '',
				timeline: '2–4 weeks',
				message: ''
			});
		} catch (err) {
			setState({
				loading: false,
				error: err.response?.data?.message || 'Something went wrong while submitting your request. Please try again.',
				ok: false,
				lastSubmitted: null
			});
		}
	};

	const getWhatsAppLink = () => {
		const s = state.lastSubmitted || form;
		const msg = project
			? `Hello TechRizers, I just submitted an inquiry for ${s.projectType || 'a project'} (Name: ${s.name || 'Client'}). I would like to discuss my requirements.`
			: `Hello TechRizers, I just sent an inquiry from your website. My name is ${s.name || 'Client'}.`;
		return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
	};

	if (state.ok) {
		return (
			<div className="card form-success-card animate-fade-in" style={{ padding: '36px', textAlign: 'center' }}>
				<div className="success-icon-badge" style={{ margin: '0 auto 16px' }}>✓</div>
				<h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
					{project ? 'Thank you. Your project inquiry has been received.' : 'Message received successfully.'}
				</h2>
				<p style={{ color: 'var(--secondary-text)', maxWidth: '480px', margin: '0 auto 24px' }}>
					Our team will review your specifications and get back to you within 24 hours. For direct consultation, connect immediately on WhatsApp.
				</p>
				<div className="success-actions" style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
					<a
						href={getWhatsAppLink()}
						target="_blank"
						rel="noopener noreferrer"
						className="btn"
						style={{ background: '#25D366', color: '#070B14', fontWeight: 700 }}
					>
						💬 WhatsApp Us
					</a>
					<Link to="/" className="btn outline">
						Back to Website
					</Link>
				</div>
			</div>
		);
	}

	return (
		<form className="form card animate-fade-in" onSubmit={submit}>
			<div className="formgrid">
				<label>
					Full Name *
					<input required name="name" value={form.name} onChange={change} placeholder="e.g. Rahul Verma" />
				</label>
				<label>
					Business Email *
					<input required type="email" name="email" value={form.email} onChange={change} placeholder="e.g. rahul@company.com" />
				</label>
				<label>
					Phone Number
					<input name="phone" value={form.phone} onChange={change} placeholder="+91 98765 43210" />
				</label>
				<label>
					Company
					<input name="company" value={form.company} onChange={change} placeholder="Company or project name" />
				</label>
				<label>
					Service Required *
					<select required name="projectType" value={form.projectType} onChange={change}>
						<option value="">Select Service</option>
						{SERVICE_OPTIONS.map((s) => (
							<option key={s} value={s}>{s}</option>
						))}
					</select>
				</label>
				<label>
					Estimated Budget
					<select name="budget" value={form.budget} onChange={change}>
						<option value="">Select Budget Tier</option>
						{BUDGET_OPTIONS.map((b) => (
							<option key={b} value={b}>{b}</option>
						))}
					</select>
				</label>
			</div>

			{project && (
				<div className="formgrid full-width" style={{ marginTop: '12px' }}>
					<label>
						Target Timeline
						<select name="timeline" value={form.timeline} onChange={change}>
							{TIMELINE_OPTIONS.map((t) => (
								<option key={t} value={t}>{t}</option>
							))}
						</select>
					</label>
				</div>
			)}

			<label style={{ marginTop: '12px' }}>
				{project ? 'Project Description *' : 'Project Overview & Message *'}
				<textarea
					required
					name="message"
					rows={5}
					value={form.message}
					onChange={change}
					placeholder="Share your business goals, target audience, core features, and any technical preferences..."
				/>
			</label>

			{state.error && <div className="alert error">{state.error}</div>}

			<div style={{ marginTop: '18px' }}>
				<button disabled={state.loading} className="btn primary" style={{ width: '100%' }}>
					{state.loading ? 'Sending Inquiry…' : project ? 'Start My Project →' : 'Send Project Inquiry →'}
				</button>
			</div>
		</form>
	);
}
