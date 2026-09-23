import { Router } from 'express';
import Service from '../models/Service.js';
import CaseStudy from '../models/CaseStudy.js';
import Testimonial from '../models/Testimonial.js';
import { auth, roles } from '../middleware/auth.js';
import { isMongo, memory } from '../services/store.js';
import { ok, fail } from '../utils/response.js';

const r = Router();
const models = {
	services: [Service, 'services'],
	'case-studies': [CaseStudy, 'cases'],
	testimonials: [Testimonial, 'testimonials']
};

r.get('/:type', async (req, res) => {
	const m = models[req.params.type];
	if (!m) return fail(res, 'Unknown resource', 404);

	const data = isMongo()
		? await m[0].find({ status: { $ne: 'archived' } }).sort({ order: 1, createdAt: -1 })
		: memory[m[1]].filter((x) => x.status !== 'archived');
	ok(res, data);
});

r.post('/:type', auth, roles('admin', 'editor'), async (req, res) => {
	const m = models[req.params.type];
	if (!m) return fail(res, 'Unknown resource', 404);

	if (isMongo()) {
		const data = await m[0].create(req.body);
		return ok(res, data, 'Created', 201);
	}

	const newId = crypto.randomUUID();
	const item = { ...req.body, _id: newId, id: newId, createdAt: new Date() };
	memory[m[1]].push(item);
	ok(res, item, 'Created', 201);
});

r.put('/:type/:id', auth, roles('admin', 'editor'), async (req, res) => {
	const m = models[req.params.type];
	if (!m) return fail(res, 'Unknown resource', 404);

	if (isMongo()) {
		const d = await m[0].findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!d) return fail(res, 'Not found', 404);
		return ok(res, d, 'Updated');
	}

	const d = memory[m[1]].find((x) => String(x._id || x.id) === req.params.id);
	if (!d) return fail(res, 'Not found', 404);
	Object.assign(d, req.body);
	ok(res, d, 'Updated');
});

r.delete('/:type/:id', auth, roles('admin'), async (req, res) => {
	const m = models[req.params.type];
	if (!m) return fail(res, 'Unknown resource', 404);

	if (isMongo()) {
		const updated = await m[0].findByIdAndUpdate(req.params.id, { status: 'archived' });
		if (!updated) return fail(res, 'Not found', 404);
		return ok(res, null, 'Deleted');
	}

	const i = memory[m[1]].findIndex((x) => String(x._id || x.id) === req.params.id);
	if (i < 0) return fail(res, 'Not found', 404);
	memory[m[1]].splice(i, 1);
	ok(res, null, 'Deleted');
});

export default r;
