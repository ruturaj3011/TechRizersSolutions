import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { useEffect, useState } from 'react';

function Guard({ children }) {
	const { user, loading } = useAuth();
	if (loading) return <div className="container empty">Loading…</div>;
	if (!user || !['admin', 'editor'].includes(user.role))
		return (
			<div className="container empty">
				<h1>Admin access required</h1>
				<Link to="/login">Login</Link>
			</div>
		);
	return children;
}

function Dashboard() {
	const [stats, setStats] = useState(null);
	useEffect(() => {
		api
			.get('/admin/stats')
			.then((r) => setStats(r.data.data))
			.catch(() => {});
	}, []);

	return (
		<section className="section">
			<div className="container">
				<div className="dashhead">
					<div>
						<span className="kicker">ADMIN</span>
						<h1>Dashboard</h1>
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Link className="btn outline small" to="/admin/case-studies/builder">
							+ Case Study Builder
						</Link>
						<Link className="btn primary small" to="/admin/inquiries">
							View Inquiries
						</Link>
					</div>
				</div>
				<div className="grid four">
					{[
						['Users', 'users'],
						['Project Inquiries', 'projectInquiries'],
						['Contact Messages', 'contactMessages'],
						['Payments', 'payments']
					].map(([label, key]) => (
						<div className="card" key={key}>
							<h3>{label}</h3>
							<strong className="bigstat">{stats?.[key] ?? '—'}</strong>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function Inquiries() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		api
			.get('/project-inquiries')
			.then((r) => setItems(r.data.data || []))
			.catch(() => {});
	}, []);

	return (
		<section className="section">
			<div className="container">
				<div className="dashhead">
					<h1>Project Inquiries</h1>
					<Link to="/admin/dashboard">Dashboard</Link>
				</div>
				<div className="tablewrap">
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Service</th>
								<th>Budget</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{items.map((i) => (
								<tr key={i._id || i.id}>
									<td>{i.name}</td>
									<td>{i.email}</td>
									<td>{i.projectType || '—'}</td>
									<td>{i.budget || '—'}</td>
									<td>{i.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

import CaseStudyBuilder from './CaseStudyBuilder';

export default function Admin() {
	return (
		<Guard>
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="inquiries" element={<Inquiries />} />
				<Route path="case-studies/builder" element={<CaseStudyBuilder />} />
				<Route path="builder" element={<CaseStudyBuilder />} />
				<Route path="*" element={<Dashboard />} />
			</Routes>
		</Guard>
	);
}
