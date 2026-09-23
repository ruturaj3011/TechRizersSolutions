import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function CaseStudyBuilder() {
	const navigate = useNavigate();
	const [githubQuery, setGithubQuery] = useState('');
	const [repos, setRepos] = useState([]);
	const [loadingRepos, setLoadingRepos] = useState(false);
	const [repoError, setRepoError] = useState('');

	const [form, setForm] = useState({
		title: '',
		company: '',
		industry: '',
		category: 'WEB & SAAS DEVELOPMENT',
		description: '',
		overview: '',
		challenge: '',
		solution: '',
		features: '',
		tech: '',
		architecture: '',
		challenges: '',
		process: '',
		outcome: 'Project outcome available on request.',
		githubUrl: '',
		liveDemoUrl: '',
		screenshots: ''
	});

	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState('');
	const [saveSuccess, setSaveSuccess] = useState(false);

	const fetchRepos = async (e) => {
		e.preventDefault();
		if (!githubQuery.trim()) return;

		setLoadingRepos(true);
		setRepoError('');
		setRepos([]);

		try {
			const res = await api.get(`/github/repos?username=${encodeURIComponent(githubQuery.trim())}`);
			setRepos(res.data.data || []);
			setLoadingRepos(false);
		} catch (err) {
			setRepoError(err.response?.data?.message || 'Unable to load repositories right now. Please try again.');
			setLoadingRepos(false);
		}
	};

	const selectRepo = (r) => {
		const formattedTitle = r.name
			.replace(/[-_]/g, ' ')
			.replace(/\b\w/g, (l) => l.toUpperCase());

		setForm((prev) => ({
			...prev,
			title: formattedTitle,
			description: r.description || `Full-stack implementation of ${formattedTitle}.`,
			overview: r.description || `An enterprise solution built with ${r.language || 'modern technology'}.`,
			tech: r.language ? `${r.language}, JavaScript, REST APIs` : 'JavaScript, Node.js',
			githubUrl: r.url,
			liveDemoUrl: r.homepage || '',
			features: r.topics?.length ? r.topics.join(', ') : 'High Performance, Scalable Architecture, API Integration'
		}));

		const formEl = document.getElementById('case-builder-form');
		if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
	};

	const handlePublish = async (e) => {
		e.preventDefault();
		setSaving(true);
		setSaveError('');

		try {
			const slug = form.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');

			const payload = {
				slug,
				title: form.title,
				company: form.company || 'Enterprise Partner',
				industry: form.industry || 'Technology Solutions',
				category: form.category || 'WEB & SAAS DEVELOPMENT',
				description: form.description,
				overview: form.overview,
				challenge: form.challenge || 'Client required a modern, highly scalable architecture to eliminate operational bottlenecks.',
				solution: form.solution || 'TechRizers engineered a high-performance system with automated workflows and enterprise security.',
				features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
				tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
				architecture: form.architecture || 'Microservices-based cloud architecture with automated CI/CD pipelines.',
				process: form.process.split(',').map((p) => p.trim()).filter(Boolean),
				outcome: form.outcome || 'Project outcome available on request.',
				github: form.githubUrl,
				demo: form.liveDemoUrl,
				screenshots: form.screenshots.split(',').map((s) => s.trim()).filter(Boolean),
				status: 'published'
			};

			await api.post('/case-studies', payload);
			setSaving(false);
			setSaveSuccess(true);
			setTimeout(() => {
				navigate('/case-studies');
			}, 1800);
		} catch (err) {
			setSaveError(err.response?.data?.message || 'Failed to publish case study. Please try again.');
			setSaving(false);
		}
	};

	return (
		<section className="section">
			<div className="container">
				<div className="dashhead" style={{ marginBottom: '24px' }}>
					<div>
						<span className="kicker">ADMIN CASE STUDY BUILDER</span>
						<h1>Create & Publish Case Study</h1>
						<p style={{ color: 'var(--secondary-text)' }}>
							Fetch live public repositories directly from GitHub, pre-fill project architecture, and publish verified client case studies.
						</p>
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Link to="/admin/dashboard" className="btn outline small">
							← Dashboard
						</Link>
					</div>
				</div>

				{/* Step 1: GitHub Fetcher */}
				<div className="card" style={{ marginBottom: '36px' }}>
					<span className="kicker">STEP 1 · GITHUB REPOSITORY SYNC</span>
					<h3 style={{ margin: '8px 0 16px' }}>Fetch Public GitHub Repositories</h3>
					<form onSubmit={fetchRepos} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
						<input
							type="text"
							style={{ flex: '1', minWidth: '280px' }}
							placeholder="Enter GitHub Username, Organization (e.g. facebook, vercel, techrizers) or Repo URL"
							value={githubQuery}
							onChange={(e) => setGithubQuery(e.target.value)}
							required
						/>
						<button type="submit" disabled={loadingRepos} className="btn primary">
							{loadingRepos ? 'Fetching Repositories…' : 'Fetch Repositories ↗'}
						</button>
					</form>

					{repoError && <div className="alert error" style={{ marginTop: '16px' }}>{repoError}</div>}

					{repos.length > 0 && (
						<div style={{ marginTop: '24px' }}>
							<h4 style={{ marginBottom: '12px' }}>
								Public Repositories Found ({repos.length}):
							</h4>
							<div className="grid three" style={{ maxHeight: '420px', overflowY: 'auto', padding: '4px' }}>
								{repos.map((r) => (
									<div key={r.name} className="card repo-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
											<h4 style={{ margin: 0, fontSize: '15px' }}>{r.name}</h4>
											<span className="team-role-tag" style={{ fontSize: '10px' }}>{r.language}</span>
										</div>
										<p style={{ fontSize: '12px', color: 'var(--secondary-text)', flex: 1, margin: '8px 0' }}>
											{r.description || 'No description provided.'}
										</p>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--muted-text)', marginTop: '8px' }}>
											<span>⭐ {r.stars} · 🍴 {r.forks}</span>
											<button
												type="button"
												className="btn primary small"
												style={{ padding: '4px 10px', fontSize: '11px' }}
												onClick={() => selectRepo(r)}
											>
												Use for Case Study →
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Step 2: Case Study Editor Form */}
				<form id="case-builder-form" onSubmit={handlePublish} className="card form">
					<span className="kicker">STEP 2 · CASE STUDY SPECIFICATION</span>
					<h3 style={{ margin: '8px 0 20px' }}>Project Information & Deliverables</h3>

					<div className="formgrid">
						<label>
							Project Name *
							<input
								required
								value={form.title}
								onChange={(e) => setForm({ ...form, title: e.target.value })}
								placeholder="e.g. CarePath Clinical Portal"
							/>
						</label>
						<label>
							Client Company
							<input
								value={form.company}
								onChange={(e) => setForm({ ...form, company: e.target.value })}
								placeholder="e.g. Northstar Health Group"
							/>
						</label>
						<label>
							Industry
							<input
								value={form.industry}
								onChange={(e) => setForm({ ...form, industry: e.target.value })}
								placeholder="e.g. Healthcare & Telemedicine"
							/>
						</label>
						<label>
							Project Category
							<select
								value={form.category}
								onChange={(e) => setForm({ ...form, category: e.target.value })}
							>
								<option>WEB & SAAS DEVELOPMENT</option>
								<option>MOBILE APP DEVELOPMENT</option>
								<option>AI SOLUTIONS & CHATBOTS</option>
								<option>CUSTOM SOFTWARE DEVELOPMENT</option>
								<option>UI/UX DESIGN</option>
								<option>AUTOMATION & SYSTEMS</option>
							</select>
						</label>
					</div>

					<label style={{ marginTop: '12px' }}>
						Short Description (Card Summary) *
						<input
							required
							value={form.description}
							onChange={(e) => setForm({ ...form, description: e.target.value })}
							placeholder="e.g. Unified patient appointments, records and reminders into one accessible web platform."
						/>
					</label>

					<label style={{ marginTop: '12px' }}>
						Detailed Project Overview *
						<textarea
							required
							rows={3}
							value={form.overview}
							onChange={(e) => setForm({ ...form, overview: e.target.value })}
							placeholder="Comprehensive explanation of the application architecture and client purpose..."
						/>
					</label>

					<div className="formgrid" style={{ marginTop: '12px' }}>
						<label>
							Business Challenge / Problem
							<textarea
								rows={3}
								value={form.challenge}
								onChange={(e) => setForm({ ...form, challenge: e.target.value })}
								placeholder="What business problem or inefficiency did the client face?"
							/>
						</label>
						<label>
							Engineered Solution
							<textarea
								rows={3}
								value={form.solution}
								onChange={(e) => setForm({ ...form, solution: e.target.value })}
								placeholder="How did TechRizers solve the problem with software & architecture?"
							/>
						</label>
					</div>

					<div className="formgrid" style={{ marginTop: '12px' }}>
						<label>
							Technology Stack (Comma separated) *
							<input
								required
								value={form.tech}
								onChange={(e) => setForm({ ...form, tech: e.target.value })}
								placeholder="e.g. React, Node.js, PostgreSQL, Docker, AWS"
							/>
						</label>
						<label>
							Key Features (Comma separated)
							<input
								value={form.features}
								onChange={(e) => setForm({ ...form, features: e.target.value })}
								placeholder="e.g. Real-Time Sync, RBAC Security, Automated Billing"
							/>
						</label>
					</div>

					<div className="formgrid" style={{ marginTop: '12px' }}>
						<label>
							GitHub Repository URL
							<input
								type="url"
								value={form.githubUrl}
								onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
								placeholder="https://github.com/org/repo"
							/>
						</label>
						<label>
							Live Demo URL
							<input
								type="url"
								value={form.liveDemoUrl}
								onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })}
								placeholder="https://demo.techrizers.com"
							/>
						</label>
					</div>

					<label style={{ marginTop: '12px' }}>
						Architecture & Technical Design
						<input
							value={form.architecture}
							onChange={(e) => setForm({ ...form, architecture: e.target.value })}
							placeholder="e.g. Microservices-based event-driven cloud architecture with encrypted PostgreSQL persistence."
						/>
					</label>

					<label style={{ marginTop: '12px' }}>
						Project Outcome (Strict rule: No fake percentages) *
						<input
							required
							value={form.outcome}
							onChange={(e) => setForm({ ...form, outcome: e.target.value })}
							placeholder="e.g. Project outcome available on request."
						/>
					</label>

					{saveError && <div className="alert error" style={{ marginTop: '14px' }}>{saveError}</div>}
					{saveSuccess && (
						<div className="alert success" style={{ marginTop: '14px' }}>
							✓ Case study published successfully! Redirecting to Selected Work...
						</div>
					)}

					<div style={{ marginTop: '24px', display: 'flex', gap: '14px' }}>
						<button type="submit" disabled={saving} className="btn primary">
							{saving ? 'Publishing Case Study…' : 'Publish Case Study →'}
						</button>
						<Link to="/admin/dashboard" className="btn ghost">
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}