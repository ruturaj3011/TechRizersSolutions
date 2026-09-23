import ContactMessage from '../models/ContactMessage.js';
import ProjectInquiry from '../models/ProjectInquiry.js';
import { memory, isMongo } from '../services/store.js';
import { ok } from '../utils/response.js';

export async function contact(req, res) {
	const newId = crypto.randomUUID();
	const data = {
		...req.body,
		_id: newId,
		id: newId,
		status: 'unread',
		createdAt: new Date()
	};

	const saved = isMongo() ? await ContactMessage.create(req.body) : (memory.contacts.push(data), data);
	ok(res, saved, 'Message received', 201);
}

export async function project(req, res) {
	const newId = crypto.randomUUID();
	const data = {
		...req.body,
		_id: newId,
		id: newId,
		status: 'new',
		createdAt: new Date()
	};

	const saved = isMongo() ? await ProjectInquiry.create(req.body) : (memory.projects.push(data), data);
	ok(res, saved, 'Project inquiry received', 201);
}

export async function listProjects(req, res) {
	const items = isMongo()
		? await ProjectInquiry.find().sort({ createdAt: -1 }).limit(100)
		: memory.projects.slice().reverse();
	ok(res, items);
}
