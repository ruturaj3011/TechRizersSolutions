import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../app.js';
import { memory } from '../services/store.js';
import bcrypt from 'bcryptjs';

let server;
let baseUrl;

before(async () => {
	// Seed an admin user in memory for admin testing
	const adminPasswordHash = await bcrypt.hash('AdminSecret123!', 10);
	memory.users.push({
		_id: 'test-admin-id',
		id: 'test-admin-id',
		name: 'Test Admin',
		email: 'test-admin@techrizers.com',
		passwordHash: adminPasswordHash,
		role: 'admin'
	});

	await new Promise((resolve) => {
		server = http.createServer(app);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			baseUrl = `http://127.0.0.1:${address.port}`;
			resolve();
		});
	});
});

after(async () => {
	await new Promise((resolve) => {
		if (server) {
			server.close(resolve);
		} else {
			resolve();
		}
	});
});

describe('TechRizers API Suite', () => {
	it('GET / serves the unified React frontend index.html', async () => {
		const res = await fetch(`${baseUrl}/`);
		assert.equal(res.status, 200);
		const html = await res.text();
		assert.ok(html.includes('<div id="root"></div>'));
		assert.match(html, /<title>TechRizers/i);
	});

	it('GET /api/health returns 200 and healthy status', async () => {
		const res = await fetch(`${baseUrl}/api/health`);
		assert.equal(res.status, 200);
		const body = await res.json();
		assert.equal(body.success, true);
		assert.match(body.message, /healthy/i);
	});

	it('GET /api/services returns seeded catalog in memory mode', async () => {
		const res = await fetch(`${baseUrl}/api/services`);
		assert.equal(res.status, 200);
		const body = await res.json();
		assert.equal(body.success, true);
		assert.ok(Array.isArray(body.data));
		assert.ok(body.data.length >= 6);
		const webService = body.data.find((s) => s.slug === 'web-saas');
		assert.ok(webService);
		assert.equal(webService.name, 'Web & SaaS Development');
	});

	it('GET /api/case-studies returns seeded cases in memory mode', async () => {
		const res = await fetch(`${baseUrl}/api/case-studies`);
		assert.equal(res.status, 200);
		const body = await res.json();
		assert.equal(body.success, true);
		assert.ok(Array.isArray(body.data));
		assert.ok(body.data.length >= 3);
		assert.ok(body.data.some((c) => c.slug === 'carepath-portal'));
	});

	describe('Authentication Endpoints', () => {
		let testUserToken = '';

		it('POST /api/auth/register creates a new user account', async () => {
			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'Jane Developer',
					email: 'jane@example.com',
					password: 'SecurePassword123!'
				})
			});
			assert.equal(res.status, 201);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.ok(body.data.token);
			assert.equal(body.data.user.email, 'jane@example.com');
			assert.equal(body.data.user.role, 'user');
		});

		it('POST /api/auth/register prevents duplicate email', async () => {
			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'Duplicate User',
					email: 'jane@example.com',
					password: 'SecurePassword123!'
				})
			});
			assert.equal(res.status, 409);
			const body = await res.json();
			assert.equal(body.success, false);
		});

		it('POST /api/auth/login succeeds with valid credentials', async () => {
			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: 'jane@example.com',
					password: 'SecurePassword123!'
				})
			});
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.ok(body.data.token);
			testUserToken = body.data.token;
		});

		it('POST /api/auth/login rejects invalid password', async () => {
			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: 'jane@example.com',
					password: 'WrongPassword999'
				})
			});
			assert.equal(res.status, 401);
			const body = await res.json();
			assert.equal(body.success, false);
		});

		it('GET /api/auth/me returns current user profile when authorized', async () => {
			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: `Bearer ${testUserToken}` }
			});
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.equal(body.data.email, 'jane@example.com');
		});

		it('GET /api/auth/me returns 401 when token is missing', async () => {
			const res = await fetch(`${baseUrl}/api/auth/me`);
			assert.equal(res.status, 401);
		});
	});

	describe('Forms & Inquiries', () => {
		it('POST /api/contact receives valid inquiry', async () => {
			const res = await fetch(`${baseUrl}/api/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'Alex Smith',
					email: 'alex@company.org',
					message: 'We are interested in discussing an AI automation workflow.'
				})
			});
			assert.equal(res.status, 201);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.equal(body.data.name, 'Alex Smith');
		});

		it('POST /api/contact rejects invalid email format with 422', async () => {
			const res = await fetch(`${baseUrl}/api/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'Bad Email',
					email: 'not-an-email',
					message: 'Test message here.'
				})
			});
			assert.equal(res.status, 422);
			const body = await res.json();
			assert.equal(body.success, false);
		});

		it('POST /api/project-inquiries creates new project record', async () => {
			const res = await fetch(`${baseUrl}/api/project-inquiries`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: 'Priya Sharma',
					email: 'priya@startup.co',
					phone: '+919876543210',
					company: 'NextGen SaaS',
					projectType: 'Web & SaaS',
					budget: '₹3L+',
					timeline: '8-12 weeks',
					message: 'Need an MVP for a B2B collaboration platform.'
				})
			});
			assert.equal(res.status, 201);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.equal(body.data.projectType, 'Web & SaaS');
			assert.ok(body.data._id || body.data.id);
		});
	});

	describe('Payments Endpoint', () => {
		it('POST /api/payments/create generates safe demo payment reference', async () => {
			const res = await fetch(`${baseUrl}/api/payments/create`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: 25000,
					description: 'Initial deposit for Web & SaaS development'
				})
			});
			assert.equal(res.status, 201);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.equal(body.data.status, 'demo');
			assert.match(body.data.reference, /^TR-/);
		});

		it('GET /api/payments/verify returns demo verification details', async () => {
			const res = await fetch(`${baseUrl}/api/payments/verify`);
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.data.status, 'demo');
		});
	});

	describe('Admin Dashboard & Protected Routes', () => {
		let adminToken = '';

		before(async () => {
			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: 'test-admin@techrizers.com',
					password: 'AdminSecret123!'
				})
			});
			const body = await res.json();
			adminToken = body.data.token;
		});

		it('GET /api/admin/stats returns statistics when authenticated as admin', async () => {
			const res = await fetch(`${baseUrl}/api/admin/stats`, {
				headers: { Authorization: `Bearer ${adminToken}` }
			});
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.ok(typeof body.data.users === 'number');
			assert.ok(typeof body.data.projectInquiries === 'number');
			assert.ok(typeof body.data.contactMessages === 'number');
			assert.ok(typeof body.data.payments === 'number');
		});

		it('GET /api/project-inquiries returns inquiry list for admin', async () => {
			const res = await fetch(`${baseUrl}/api/project-inquiries`, {
				headers: { Authorization: `Bearer ${adminToken}` }
			});
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.ok(Array.isArray(body.data));
			assert.ok(body.data.length >= 1);
		});

		it('GET /api/admin/stats blocks regular non-admin user with 403', async () => {
			const userRes = await fetch(`${baseUrl}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: 'jane@example.com',
					password: 'SecurePassword123!'
				})
			});
			const userBody = await userRes.json();
			const userToken = userBody.data.token;

			const res = await fetch(`${baseUrl}/api/admin/stats`, {
				headers: { Authorization: `Bearer ${userToken}` }
			});
			assert.equal(res.status, 403);
		});
	});

	describe('WhatsApp Integration', () => {
		it('GET /api/whatsapp/config returns configured business number', async () => {
			const res = await fetch(`${baseUrl}/api/whatsapp/config`);
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.equal(body.data.phoneNumber, '918308367073');
			assert.ok(body.data.defaultGreeting);
		});

		it('POST /api/whatsapp/link returns formatted click-to-chat URL for project inquiry', async () => {
			const res = await fetch(`${baseUrl}/api/whatsapp/link`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: 'project',
					data: {
						name: 'Karan Patel',
						company: 'Karan Tech',
						projectType: 'Web & SaaS',
						budget: '₹3L+'
					}
				})
			});
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.match(body.data.link, /^https:\/\/wa\.me\/918308367073/);
			assert.match(body.data.link, /Karan%20Patel/);
		});
	});

	describe('GitHub Repository Integration', () => {
		it('GET /api/github/repos returns 400 when username query is missing', async () => {
			const res = await fetch(`${baseUrl}/api/github/repos`);
			assert.equal(res.status, 400);
			const body = await res.json();
			assert.equal(body.success, false);
		});

		it('GET /api/github/repos returns 200 and public repositories for a valid user or org', async () => {
			const res = await fetch(`${baseUrl}/api/github/repos?username=github`);
			assert.equal(res.status, 200);
			const body = await res.json();
			assert.equal(body.success, true);
			assert.ok(Array.isArray(body.data));
			assert.ok(body.data.length > 0);
			const first = body.data[0];
			assert.ok(typeof first.name === 'string');
			assert.ok(typeof first.url === 'string');
			assert.ok(typeof first.stars === 'number');
		});
	});
});

